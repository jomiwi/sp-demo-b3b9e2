#!/usr/bin/env bash
# Publish ../golive-build (preview) to the gh-pages branch.
# RC4.9.4: pure-python/cp copy (rsync optional), pre-push guard aborts before
# commit/push if the staged tree is empty, has fewer than 27 files, is missing
# required index.html pages, or if _build/build.txt lacks a "Brand check:" line.
# No force-push. No --launch. No DNS/CNAME. Keeps noindex.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="${1:-$(cd "$REPO/.." && pwd)/golive-build}"
MSG="${2:-Publish v3.15 demo preview to gh-pages (Jon)}"
BRAND_TXT="$REPO/_build/build.txt"
WORK="$REPO/.gh-pages-publish-work"
BRANCH=gh-pages

guard() {
  local dir="$1"
  local label="${2:-staged output}"
  if [[ ! -d "$dir" ]]; then
    echo "GUARD FAIL ($label): not a directory: $dir" >&2
    return 1
  fi
  local count
  count="$(find "$dir" -type f ! -path '*/.git/*' | wc -l | tr -d ' ')"
  if [[ "$count" -eq 0 ]]; then
    echo "GUARD FAIL ($label): empty (0 files)" >&2
    return 1
  fi
  if [[ "$count" -lt 27 ]]; then
    echo "GUARD FAIL ($label): only $count files (need >= 27)" >&2
    return 1
  fi
  for req in index.html cafe/index.html pickleball-for-beginners/index.html; do
    if [[ ! -f "$dir/$req" ]]; then
      echo "GUARD FAIL ($label): missing $req" >&2
      return 1
    fi
  done
  # Brand check lives in the build step's _build/build.txt (written by build-golive.py).
  # Also accept a build.txt copied into the staged tree.
  local brand_file=""
  if [[ -f "$dir/build.txt" ]] && grep -q 'Brand check:' "$dir/build.txt"; then
    brand_file="$dir/build.txt"
  elif [[ -f "$BRAND_TXT" ]] && grep -q 'Brand check:' "$BRAND_TXT"; then
    brand_file="$BRAND_TXT"
  else
    echo "GUARD FAIL ($label): build.txt lacks a 'Brand check:' line (looked in $dir/build.txt and $BRAND_TXT)" >&2
    return 1
  fi
  echo "GUARD OK ($label): $count files; required indexes present; Brand check in $brand_file"
  return 0
}

# Allow: publish-ghpages.sh --guard-only <dir>
if [[ "${1:-}" == "--guard-only" ]]; then
  guard "${2:?dir required}" "guard-only"
  exit $?
fi

if [[ ! -d "$SOURCE" ]]; then
  echo "ERROR: source build dir not found: $SOURCE" >&2
  exit 1
fi

echo "== pre-copy guard on source =="
guard "$SOURCE" "source $SOURCE"

# Stage into a clean worktree of gh-pages
rm -rf "$WORK"
git -C "$REPO" fetch origin "$BRANCH" 2>/dev/null || true
git -C "$REPO" worktree add -f -B "$BRANCH" "$WORK" "origin/$BRANCH" 2>/dev/null \
  || git -C "$REPO" worktree add -f -B "$BRANCH" "$WORK" "$BRANCH"

# Wipe tracked content except .git (keep .nojekyll if we recreate it)
find "$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy without rsync: prefer rsync if present, else pure python
if command -v rsync >/dev/null 2>&1; then
  echo "== copy via rsync =="
  rsync -a --delete --exclude '.git' --exclude '.golive-build' "$SOURCE"/ "$WORK"/
else
  echo "== copy via python (rsync not installed) =="
  SOURCE="$SOURCE" WORK="$WORK" python3 - <<'PY'
import os, shutil
src = os.environ['SOURCE']
dst = os.environ['WORK']
for root, dirs, files in os.walk(src):
    rel = os.path.relpath(root, src)
    out_root = dst if rel == '.' else os.path.join(dst, rel)
    os.makedirs(out_root, exist_ok=True)
    for f in files:
        if f == '.golive-build':
            continue
        shutil.copy2(os.path.join(root, f), os.path.join(out_root, f))
open(os.path.join(dst, '.nojekyll'), 'a').close()
n = sum(1 for r, _, fs in os.walk(dst) for f in fs if '.git' not in r.split(os.sep))
print('copied', n, 'files into', dst)
PY
fi

# Ensure .nojekyll exists even with rsync path
touch "$WORK/.nojekyll"

echo "== post-copy guard on staged output =="
guard "$WORK" "staged $WORK"

cd "$WORK"
git add -A
# Abort if nothing would change
if git diff --cached --quiet; then
  echo "Nothing to publish (staged identical to gh-pages)."
  cd "$REPO"
  git worktree remove -f "$WORK" 2>/dev/null || rm -rf "$WORK"
  exit 0
fi

# Final guard after git add: recount files that will be in the tree
STAGED_COUNT="$(git ls-files | wc -l | tr -d ' ')"
if [[ "$STAGED_COUNT" -lt 27 ]]; then
  echo "GUARD FAIL (git index): only $STAGED_COUNT staged files" >&2
  exit 1
fi
for req in index.html cafe/index.html pickleball-for-beginners/index.html; do
  if ! git ls-files --error-unmatch "$req" >/dev/null 2>&1; then
    echo "GUARD FAIL (git index): missing $req" >&2
    exit 1
  fi
done
if ! grep -q 'Brand check:' "$BRAND_TXT"; then
  echo "GUARD FAIL: $BRAND_TXT lacks Brand check:" >&2
  exit 1
fi

git -c user.email="${GIT_AUTHOR_EMAIL:-github@jomiwi.com}" \
    -c user.name="${GIT_AUTHOR_NAME:-jomiwi}" \
    commit -m "$MSG"
# NO force-push
git push origin "HEAD:$BRANCH"
SHA="$(git rev-parse HEAD)"
echo "Published $SHA to origin/$BRANCH"

cd "$REPO"
git worktree remove -f "$WORK" 2>/dev/null || rm -rf "$WORK"
echo "Done."
