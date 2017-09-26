# Git 快速开始

#### git init

#### git config user.name 'hcxowe'

#### git config user.email 'hcxowe@126.com'

#### git add index.html

#### git status

#### git commit -m 'add index.html'

#### cat index.html

#### git commit index.html

> 这步会进入vim编辑器模式，按下字母键c进入编辑模式，Esc退出编辑模式，连续按两次大写字母Z，退出viw编辑器

#### git log

#### git show 识别码

> 查看commit的详情

#### git show-branch --more=10

> 显示当前分支简洁的commit信息

#### git diff 识别码 识别码

> 比较版本的差异

#### git rm index.html

> 删除

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