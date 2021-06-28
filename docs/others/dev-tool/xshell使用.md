# linux 命令行入门

## 认识终端

```bash
[root@lab ~]# 
```
`root` 表示用户，`@` 读`at`，表示在，`lab` 是主机名，`~` 是当前工作目录，`#` 是身份识别符，`#`-- root 用户，`$` 表示普通用户。

```bash
[jack@lab root]$ 
```

## vmware 备份

两种备份方式：

1. 快照

快照又称还原点，保存拍快照时的系统状态，后期可选择特定的快照恢复，短期备份，虚拟机开启。

vmware 的 tab 菜单 → 快照 → 拍摄快照 → 添加名字和描述，方便恢复系统时做出选择。

还原系统：
vmware 的 tab 菜单 → 快照 → 恢复到快照 或者 快照管理器。

2. 克隆

复制一份系统，长期备份，

备份：选择虚拟机 → 管理 → 克隆 → 创建完整克隆 → 保存到宿主机硬盘中。

克隆完成后，vmware 会增加一个系统，账号和密码和原来的系统一样。

## Linux 文件

在 Linux 中一切都是文件。

1. Linux 系统是基于文件的系统。

2. 使用时，绝大部分时间都在操作文件。

对文件的操作有哪些？

新建、编辑、保存、关闭、重命名、移动、删除、恢复、解压、压缩。

Linux 为每个用户都有一个 home，用户可在该目录下进行操作。

重要目录
`bin` : binary，放置二进制文件，可执行文件。
`dev` : 外接设备，比如磁盘、光盘等。不能直接使用的外接设备，需要挂载。
`etc` : 保存配置文件。
`home`: 普通用户的家目录，类似 window 的 user 目录。
`proc`: process，保存进程的目录。
`root`: root 用户的目录。
`sbin`: 超级管理可执行的二进制目录。
`tmp` : 系统运行产生的临时文件目录，类似 window 的 temp 目录。
`usr` : 用户安装的软件，类似 window 的 program files。
`var` : 日志目录。
`mnt` : 外接设备的挂载目录。

## 指令组成

```ls
ls -a /dir # 指令 选项 操作对象
```

`指令` `选项` `操作对象`

有些命令选项和操作对象可选，可传递多个选项和操作对象。

**指令的执行结果**：

Linux 的命令行成功返回，失败才返回。

失败信息组成

`` `错误信息`

## 基础指令


> 输出当前日期

```bash
date
```

> 查看日历

```bash
cal # calendar
cal -h # 显示帮助信息
```

路径：

相对路径：相对于当前路径的路径，以 `./` 开头，不写 / 默认相对路径，`../` 上级目录。
绝对路径：以 `/` 开头的路径。

> 查看当前路径

```bash
pwd # print work directory
```
> 改变目录 

```bash
cd <dir> # 跳转到 dir 目录  change directory
cd ../ # 上级目录
cd - # 回到上次的目录
cd ~ # 去到 home 目录
```

> 创建目录 mkdir (make directory)

```bash
mkdir dir-name
mkdir -p dir-name1/dir-name2 # 创建多层目录
mkdir dir-name1 dir-name2 # 创建多个目录
```
> 创建文件 touch 

```bash
touch file-name
touch dir/file-name
touch dir/file-name file-name2
```
> 列出目录内容

> ls

```bash
ls # 列出当前目录的内容

ls dir # 操作 dir 目录
ls ./ # 当前目录
ls ./home # 当前目录的子目录 home

# 常见的选项
ls -l # long 以长格式显示
ls -a # --all 显示所有
ls -h # 以人类可读的形式显示
ls 
```

以长格式输出的结果解读：

```bash
-rwxr-xr-x.  1 root root     60K 8月  31 2017 xmlsec1
```

> 复制文件


