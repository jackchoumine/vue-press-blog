# 使用命令下载网站视频

## youtube-dl 的使用

YouTube-dl 是一个视频网站下载工具，支持 B 站、YouTube 、YouKu 等。

```bash
brew install youtube-dl # mac 通过 homebrew 安装
youtube-dl --version # 查看版本
sudo youtube-dl -U #  升级
youtube-dl --proxy http://127.0.0.1:2086 # 使用代理下载 科学上网必备
youtube-dl -cit youtube-list # 批量下载视频
youtube-dl -cit https://www.youtube.com/playlist\?list\=PLbhC27Bf6WlmpDh_66g7Fpn8uCYG7jUn8 # list 是列表id
youtube-dl video-url # 单个视频
```

## you-get 使用

类似 youtube-dl

```bash
you-get -i url # 查看了视频信息 格式 质量 大小等
you-get --playlist url # 批量下载
you-get --format=dash-flv url # 指定格式下载
you-get --playlist --format=dash-flv url # 指定格式批量下载
```
