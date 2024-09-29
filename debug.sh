#!/bin/sh

set -e

pwd

env

cat .git/config

git fetch origin --tags --no-filter

exit 1
