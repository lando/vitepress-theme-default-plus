#!/bin/sh

set -e

pwd

env

cat .git/config

git fetch --unshallow || true

git status
git --no-pager branch

git checkout multi-version-build

git fetch origin --tags --no-filter
git rev-parse --abbrev-ref --symbolic-full-name @{u}

npx mvb --debug
