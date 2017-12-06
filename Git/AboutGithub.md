### 如何上次本地库到github？

1. 建立本地的git仓库
> $ git init

2. 添加项目所有文件到仓库
> $ git add .

3. 提交文件到仓库
> $ git commit -m 'comments'

4. 在github上创建repository
> + => new repository => 填写远程仓库名称 => 创建完成 => 拷贝SSH/HTTPS地址待用

5. 将本地仓库关联到远程仓库
> $ git remote add origin git@github.com:hcxowe/react-native-tutorials.git

6. 如果远程仓库不是空的，可以先拉取，拉取之后如果有文件冲突需要先解决冲突
> $ git pull origin master

7. 上传代码到远程仓库
> $ git push -u origin master