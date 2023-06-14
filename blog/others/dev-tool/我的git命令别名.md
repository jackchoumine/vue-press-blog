# 常用的 git 命令别名

```bash
[core]
	editor = /usr/bin/vim
	quotepath = false
[alias]
	cl = config --list
	cal = config --list | grep alias
	st = status
	au = add -u
	aa = add .
	cm = commit -m
	cam = commit -am
	novcm = commit --no-verify -m # 跳过验证提交
	ch = checkout
	pu = push
  pum = push -u origin master
	pl = pull
	b = branch  # 查看本地分支 新建分支 b new-branch
	ba = branch -a # 查看所有分支
	bv = branch -v # 查看所有分支的最后一次提交
	bd = branch -d # 删除已合并的分支
	bD = branch -D # 强制删除分支
	bm = branch --merged # 查看已合并的分支
	bnm = branch --no-merged # 查看已合并的分支
	mg = merge # 合并分支
	fp = fetch -p # 拉去分支并更新分支映射 fetch --prune
	fa = fetch -a # 拉取所有分支 fetch --all
	fap = fetch -a -p # 拉取所有分支 fetch --all --prune
	lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	plog = log --graph --pretty='format:%C(red)%d%C(reset) %C(yellow)%h%C(reset) %ar %C(green)%aN%C(reset) %s'
	l1 = log --oneline
  rv = remote -v
# [http "https://github.com"]
	# proxy = socks5://127.0.0.1:1086
#[https "https://github.com"]
	# proxy = socks5://127.0.0.1:1086
[http]
	postBuffer = 524288000
[init]
	defaultBranch = master
```
