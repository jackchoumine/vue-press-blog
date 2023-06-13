# docker 学习

## centOS 8 安装 docker

使用 dnf 安装。

1. 删除老版本

```bash
sudo dnf remove docker docker-latest docker-engine docker-client docker-common docker-client-latest docker-logrotate docker-latest-logrotate
```

2. 设置官方仓库

```bash
sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
```

3. 安装引擎

```bash
sudo dnf install docker-ce --nobest --allowerasing -y
```

看到"完毕"即安装完毕。

4. 守护进程下启动 docker

```bash
sudo systemctl start docker
```

开启后，看不到任何输出。

可使用 `sudo systemctl status docker` 检查是否成功。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0wh9ut402j210s0cywha.jpg)

5. 设置 docker 开机启动

```bash
sudo systemctl enable docker
```

设置完毕。

## 核心概念

镜像：一个软件服务。

容器：一个运行的镜像和其环境，是镜像运行的实体。容器可被创建、启动、停止、删除、暂停。

Docker 使用客户端 - 服务器 (C/S) 架构模式，使用远程 API 来管理和创建 Docker 容器。

Docker 容器通过 Docker 镜像来创建。

容器与镜像的关系类似于面向对象编程中的对象与类，镜像对于类，容器对于对象。

[docker hub](https://hub.docker.com/): 托管 docker 镜像的网站，可下载镜像使用，类似 npm 托管 node 包。也可以自建本地仓库。

如何查看镜像仓库地址：

`docker info`

```bash
Registry: https://index.docker.io/v1/ # 这是官方仓库
```

[配置国内镜像加速下载](https://www.runoob.com/docker/docker-mirror-acceleration.html)

## docker 命令行使用

```bash
docker [options] [command] [arguments]
docker # 查看可执行的命令
```

```bash
docker version # 版本信息
docker info # 详细信息
```

从 docker hub 运行一个镜像。

```bash
docker run hello-world
```

```bash
docker search img-name # 搜索 img-name
docker pull img-name # 下载
docker run img-name # 运行
docker images # 查看本系统的镜像
```

## 执行 docker 容器

```bash
docker run -i -t ubuntu:15.10 /bin/bash # -t 在容器内指定一个终端 -i 使用容器内的标准输入进行交互
# ubuntu:15.10 /bin/bash 在 ubuntu 的 15.10 版本中 执行 bash 程序
# root@7e46a3a1037e # 7e46a3a1037e 是容器 id
ls # 查看这个容器内的文件
exit # 退出容器
```

查看容器运行情况

```bash
docker ps
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS          PORTS     NAMES
c8ad01df195b   ubuntu:15.10   "/bin/bash"   13 seconds ago   Up 11 seconds             eager_perlman
```

`CONTAINER ID`: 容器 id

`IMAGE`: 使用的镜像

`COMMAND`: 启动容器时运行的命令

`CREATED`: 创建容器的时间

`STATUS`: 容器状态。7 种：`created`、`restarting`、`running(Up)`、`removing`、`paused`、 `exited`、`dead`。

`PORTS`: 容器的端口信息。

`NAMES`: 自动分配的容器名字。

```bash
docker logs c8ad01df195b # 查看容器的标准输出
docker stop c8ad01df195b # 停止容器
docker stop container-name #
docker ps -a # 查看所有容器
docker start container-id # 启动容器

docker run -itd --name ubuntu-1 ubuntu /bin/bash # 后台运行
docker exec # 进入容器，退出容器，不会导致容器停止
docker exec -it ubuntu-1 /bin/bash # 进入 ubuntu-1 容器
exit # 退出容器 # 不会停止

# 导出容器
docker export ubuntu-1 > ubuntu.tar

# 删除容器
docker rm -rf container-id

```

使用容器运行一个 web 应用：

```bash
# 下载镜像
docker pull training/webapp
# 后台启动
docker run -d -P training/webapp python app.py
# -d 后台运行
# -P 将容器内使用的端口号随机映射到正在使用的主机上

# 查看容器
docker ps
CONTAINER ID   IMAGE             COMMAND           CREATED              STATUS              PORTS                                         NAMES
ba24c2a74d51   training/webapp   "python app.py"   About a minute ago   Up About a minute   0.0.0.0:49153->5000/tcp, :::49153->5000/tcp   admiring_blackburn
# 可看出，服务运行的端口为 5000，映射到主机端口 49153 上

# 在主机上访问webapp
curl http://172.16.95.129:49153
Hello world!%
# 或者在浏览器里打开，会看到页面上显示 Hello world!
# 172.16.95.129 是虚拟机的 ip

# 还可指定端口
docker run -d -p 5000:5000 training/webapp python app.py

# 查看端口映射关系
docker port ba24c2a74d51
5000/tcp -> 0.0.0.0:49153 # 5000 是主机端口，49153 是容器端口
5000/tcp -> :::49153

# 查看容器内的进程
docker top container-id

# 检查 web 服务
docker inspect container-id

# 停止 web 应用容器
docker stop container-id

# 查看最后一次创建的容器
docker ps -l

# 移除容器
docker rm container-id
```

## 镜像的使用

运行容器，本地没有，会从仓库中下载。

```bash
docker images # 查看本地机器上的镜像
REPOSITORY        TAG       IMAGE ID       CREATED        SIZE
ubuntu            latest    ff0fea8310f3   2 weeks ago    72.8MB
hello-world       latest    feb5d9fea6a5   6 months ago   13.3kB
ubuntu            15.10     9b9cb95443b5   5 years ago    137MB
training/webapp   latest    6fae60ef3446   6 years ago    349MB

# REPOSITORY 仓库源
# TAG 镜像标签，标识版本，使用 仓库源:TAG 标识版本 tag 默认 latest
# CREATED 创建时间
# SIZE 大小

docker images node # 只看node 相关的镜像
docker images node -q # 只看 node 相关的镜像, 只输出 id
docker images -q

docker search # 搜索镜像
docker pull # 拉取镜像
docker pull node # 拉取node 镜像
docker run node # 使用镜像 # 为何什么都没有

# 删除镜像
docker image rm image-id
docker image rm $(docker images -q) # 删除所有
docker image rm -f $(docker images node -q) # 删除所有node相关镜像

# 如何制作镜像
```

## 使用容器

```bash
docker pull tomcat:8.0
docker run tomcat # 通过宿主机端口访问不了服务
docker run -p hostPort1:containerPort1 -p hostPort2:containerPort2 tomcat # 通过宿主机端口可访问服务

# 依赖防火墙服务，需要开启防火墙
systemctl restart firewalld
docker run -p 8080:8080 tomcat # 通过宿主机端口可访问服务了

# 后台启动服务
docker run -p 9090:8080 -d tomcat:8.0 # -d

# 启动时指定名字
docker run -d -p 9002:8080 --name tomcat9000 tomcat:8.0

# 停止容器
docker stop container-id

# 杀死容器
docker kill container-id

# 删除容器
docker rm container-id
docker rm -f container-id
docker rm -f $(docker -aq) # 删除所有容器

# 重启
docker restart container-name
# 暂停
docker pause container-id
# 恢复
docker unpause container-id

# 查看容器id
docker ps -aq

# 查看日志
docker logs
docker logs -f # 实时显示日志
docker logs -t # 携带时间

# 进入容器内部
docker exec -it container-id # 交互模式
# 退出容器
exit
# 容器和宿主机进行文件交互
docker cp container-id:path host-dest # 从容器复制到宿主机
docker cp host-file container-id:path

# 如何部署 web 应用

# 查看容器的进程
docker top
# 查看详细信息
docker inspect

# 数据卷 -- 容器和宿主机进行数据同步
data Volume # 首次启动容器设置数据卷才生效

# 绝对路径
docker run -d -p image --name container-name -v absolute-host-path:container-path -v absolute-host-path:container-path
docker run -d -p image --name container-name -v absolute-host-path:container-path:ro # 容器路径只是可读

# 别名设置数据卷
# 绝对路径 容器路径里的内容被清空，写入宿主机的内容。希望保留可使用别名
docker run -d -p --name container-name -v alias-path:container-path image
# 当别名有内容时，会覆盖容器的路径，否容器路径内容被保留
# 别名路径在
# /var/lib/docker/volumes/aa
数据卷是 docker 的核心
```

```bash
systemctl stop firewalld # 关闭防火墙
systemctl status firewalld # 查看防火墙状态
```

## 打包镜像

将软件服务打包成镜像，在部署、发布和运行时只需要操作镜像。

## 参考

[How to Install and Use Docker on CentOS 8](https://linuxhint.com/install-use-docker-centos-8/)
