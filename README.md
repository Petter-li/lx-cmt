# lx-cmt  

### 库的介绍
git commit信息生成工具及快速切换分支，更新当前分支，推送当前分支

### 库的安装及使用 【推荐全局安装，配置及使用更方便】
#### 全局安装：npm install lx-cmt -g   
使用举例：   
执行git add 后，执行git-cmt

#### 项目安装：npm install lx-cmt --save-dev
在package.json的scripts中增加配置：
"cmt": "git-cmt",
"pushc": "git-pushc",
"pullc": "git-pullc",
"checkout": "git-checkout"
使用举例：  
npm run cmt 或 yarn cmt

### 命令详解
#### git-cmt (用于快速格式化生成commit信息)
使用举例：
全局安装模式下：执行git add 后，执行git-cmt
项目安装模式下：执行npm run cmt 或 yarn cmt

#### git-pullc (用于快速pull当前分支)
使用举例：
全局安装模式下：假如当前在test分支，执行 git-pullc ，等于执行 git pull origin test
项目安装模式下：假如当前在test分支，执行 npm run pullc 或 yarn pullc

#### git-pushc (用于快速push当前分支)
使用举例：
全局安装模式下：假如当前在test分支，执行 git-pushc，等于执行 git push origin test
项目安装模式下：假如当前在test分支，执行 npm run pushc 或 yarn pushc

#### git-checkout (用于快速切换分支)
使用举例：
全局安装模式下：假如当前在test分支，执行 git-checkout master，等于执行 git checkout master
项目安装模式下：假如当前在test分支，执行 npm run checkout master 或 yarn checkout master



### 库的配置  
默认commit信息时询问选项配置为全部。  
全局安装下：  
执行命令 git-cmt config set simple true可设置为简单模式，  
git-cmt config set simple false为全部模式。  
读取配置为：git-cmt config get simple.  
项目安装下：  
执行命令 npm run cmt config set simple true可设置为简单模式，  
npm run cmt config set simple false为全部模式。  
读取配置为：npm run cmt config get simple.  