# Git 快速开始

#### git init

#### git config user.name 'hcxowe'

#### git config user.email 'hcxowe@126.com'

#### git add index.html

> 暂存一个文件

#### git ls-files --stage

> 查看暂存文件的SHA1值

#### git hash-object start.html

> 计算和输出start.html的SHA1值

#### git status

#### git commit -m 'add index.html'

> git commit -all 暂存所有变化并提交

#### cat index.html

#### git commit index.html

> 这步会进入vim编辑器模式，按下字母键c进入编辑模式，Esc退出编辑模式，连续按两次大写字母Z，退出viw编辑器

#### git log

`git log --pretty=short --abbrev-commit master~5..master~2`  
显示master~5 到 master~5之间的提交

`git log --graph --pretty=oneline --abbrev-commit`
显示提交图查看工具来查看提交日志

`git log --merge --left-right -p`
显示冲突文件的所有历史提交，也可以指定特定冲突文件查看

#### git show 识别码

> 查看commit的详情

#### git show-branch --more=10

> 显示当前分支简洁的commit信息

#### git rev-parse master~3

> 将简写、相对名转化为散列ID

#### git diff 识别码 识别码

> 比较版本的差异

#### git rm index.html

> 删除一个已经暂存的文件，如果文件未暂存则会报错

`git rm index.html --cached` 将index.html修改为未暂存状态

`git rm index.html -f` 强制删除一个已经暂存的文件，如果文件未暂存则不会进行删除操作

#### git mv index.html start.html

> 重命名index.html为start.html

#### git clone getStart cloneGetStart

> 克隆版本库副本 

#### git config -l

> 查看配置

#### git config --unset --global user.name

> 全局配置项移除user.name的设置

#### git config --global alias.show-graph 'log --graph --abbrev-commit --pertty=oneline'

> 配置别名

#### gitk

> 画出版本库的DAG（有向无环图）

#### git branch branch-name [start-commit]

> 从`start-commit`提交创建分支`barnch-name`

#### git branch

> 显示所有分支

#### git show-branch [branchs]

> 展示分支详情

#### git checkout branch

> 切换分支

#### git checkout -b branch

> 创建并切换到分支

#### git branch -d branck

> 删除分支

#### git diff

> 工作目录与暂存区的差别

#### git diff commitCode

> 工作目录与指定提交版本的差别

#### git diff --cached commitCode

> 暂存区与指定提交版本的差别

#### git diff commitCode1 commitCode2

> 任意两个提交版本的差别

`git diff` 的参数 `--M`查找重命名文件 `-w`忽略空白符 `--stat`显示差异的统计数据 `--color`输出颜色

#### git reset --hard 提交版本号

> 将HEAD指向给定提交版本，暂存区与工作目录跟着改变

#### git reset --soft 提交版本号

> 将HEAD指向给定提交版本，暂存区与工作目录不变

#### git reset --mixed 提交版本号

> 将HEAD指向给定提交版本，暂存区改变，工作目录不变

#### git cherry-pick

> 通常用于将版本库中一个分支的特定提交引入一个不同的分支中

#### git revert

> git cherry-pick 的逆过程，引入一个提交来解决指定提交对版本的影响

#### git commit --amend

> 一般用于小修改又不想增加新的提交，可以使用这个命令了，将本次提交合入上一次提交

#### git 编辑器操作 

> i 进入编辑模式  esc 退出编辑模式  :wq 退出并保存

#### git rebase 分支

> 向前移植，将当前分支的基移动到最新的提交，用于特性分支同步主分支的提交

#### git rebase --continue

> 移植大多会出现冲突，解决一个冲突之后执行该命令继续下一个冲突的解决

#### git rebase --skip

> 跳过当前冲突

#### git rebase --abort

> 中止移植，版本库恢复到 git rebase 命令之前


