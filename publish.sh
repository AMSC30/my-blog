#!/usr/bin/env bash
set -e

npm run build

cd .vuepress/dist

git init
git add .
git commit -m 'publish'



git push -f git@github.com:AMSC30/my-blog.git master:page

cd -

git add .
git commit -m 'update'
git push