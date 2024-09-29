#!/bin/sh

set -e

pwd

env

cat .git/config

git status
git --no-pager branch

git fetch origin --tags --no-filter

git rev-parse --abbrev-ref --symbolic-full-name @{u}

exit 1
