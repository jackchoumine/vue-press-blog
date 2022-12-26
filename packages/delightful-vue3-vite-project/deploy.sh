#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm -rf dist

# 生成静态文件
npm run docs:build

mv docs/.vitepress/dist dist
# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# git remote add origin git@github.com:jackchoumine/blog.git

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# git push -f https://github.com/jackchoumine/
git push -f git@github.com:jackchoumine/jackchoumine.github.io master
git push -f git@gitee.com:jackzhoumine/jackchoumine.git master
# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push -f git@github.com:jackchoumine/blog.git master:gh-pages
cd -
