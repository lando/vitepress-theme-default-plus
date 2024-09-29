#!/bin/sh

set -e

pwd

env

git rev-parse --is-shallow-repository
git fetch origin --tags

git checkout v1.0.2
git status
git reset v1.0.2 --hard
git status
git reset HEAD --hard

cd /tmp
ls -lsa ./

git clone /opt/build/repo repo
cd repo

git checkout v1.0.2
git status
git reset v1.0.2 --hard
git status

exit 1
