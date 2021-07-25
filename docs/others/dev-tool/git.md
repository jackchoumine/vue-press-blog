# git 使用

## 同一台电脑上管理多 ssh 密钥

使用私钥推送代码到仓库，可免去输入密码等繁琐问题。在同一个设备上管理多个仓库的密钥很必要，比如公司的仓库是 gitlab，个人仓库是 github。

1. 创建特定密钥对

```bash
mkdir ./ssh && cd ./ssh # 在个人主目录创建一个存放密钥的目录
ssh-keygen -t rsa -C "jacksMac@163.com" -f ./gitee_id_rsa #生成名为 gitee_id_rsa 的密钥对是给码云仓库使用的
```

> 名字很重要，我们希望不同的仓库使用不同的密钥。一路回车

2. 拷贝公钥到码云个人设置

```bash
pbcopy < ./gitee_id_rsa.pub # mac 上的命令 window 上用其他
```

> 文件内容已经复制到剪切板了，到码云粘贴即可

**其他用法：**

```bash
cat file | pbcopy # 查看文件内容并复制
pbpaste > filename # 粘贴到文件
```

window 下的 cmder 的复制粘贴

```bash
clip < filename # 复制到剪切板
paste > filename # 粘贴到文件
```

3. 配置 config

> 使用 config 文件配置私钥和仓库的对应关系。不配置不会成功

config 文件没有后缀名，就叫 config，格式如下

```bash
# Host github.com  仓库域名 必需
#     HostName github.com  仓库有域名 必需
#     IdentityFile C:\\Users\\popfisher\\.ssh\\id_rsa_github # 身份认证文件，私钥路径--绝对路径 window 下路径要 \\
#     PreferredAuthentications publickey # 希望的认证方式 password publickey,keyboard-interactive等
#     User username1 # 用户名 可选
```

我的码云配置

```bash
# gitee
Host gitee.com
    HostName gitee.com
    IdentityFile xxx/xxx/.ssh/gitee_id_rsa # 使用绝对路径
    PreferredAuthentications publickey
```

4. 测试是否认证成功

```bash
ssh -T git@gitee.com
```

出现`Hi jackzhoumine! You've successfully authenticated, but GITEE.COM does not provide shell access.` 就表示成功了。

出现类似 `Host key verification failed.` 、`git@gitee.com: Permission denied (publickey).` 就是不成功。

可能会出现 `git@gitee.com: Permission denied (publickey).` 执行以下命令:

> ssh-add ~/.ssh/gitee_id_rsa

**重复以上方式，配置 github 仓库**，最后成功了！

```bash
╰─$ ssh -T git@github.com
Hi jackchoumine! You've successfully authenticated, but GitHub does not provide shell access.
```

### 可能的报错

`but GitHub does not provide shell access.`，出现这个，使用 https 设置远程的 origin，会推送失败，两种解决办法：

① 使用 ssh 协议，推荐；

② 执行`git pull origin master --allow-unrelated-histories`,再 push。

最后的 config

```bash
# github
Host github.com
    HostName github.com
    IdentityFile /Users/jack/.ssh/github_id_rsa
    PreferredAuthentications publickey
# gitee
Host gitee.com
    HostName gitee.com
    IdentityFile /Users/jack/.ssh./gitee_id_rsa
    PreferredAuthentications publickey
```

> IdentityFile 使用绝对路径

### 参考

[Windows 下 Git 多账号配置，同一电脑多个 ssh-key 的管理](https://www.cnblogs.com/popfisher/p/5731232.html)
