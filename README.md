# lx-cmt  

### 库的介绍
git commit信息生成工具

### 库的使用
全局安装：npm install git-cmt -g   
使用举例：   
执行git add 后，执行git-cmt  

项目安装：npm install lx-cmt --save-dev,在package.json的scripts中增加配置："cmt": "git-cmt"  
使用举例：  
npm run cmt 或 yarn cmt
  
### 库的配置  
默认commit时询问选项配置为全部。  
全局安装下：  
执行命令 git-cmt config set simple true可设置为简单模式，  
git-cmt config set simple false为全部模式。  
读取配置为：git-cmt config get simple.  
项目安装下：  
执行命令 npm run cmt config set simple true可设置为简单模式，  
npm run cmt config set simple false为全部模式。  
读取配置为：npm run cmt config get simple.  