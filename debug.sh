#!/bin/sh

set -e

pwd

env

git config --get remote.origin.url

npx mvb --debug
