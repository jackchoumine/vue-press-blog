# mac 下 flutter 开发环境搭建

mac 搭建 flutter 环境，需要搭建三个环境：① flutter 环境 ② iOS 环境 ③ android 环境

## flutter 环境

```bash
brew install flutter
```

检查是否安装成功：

```bash
flutter --version
```

出现类似的文字，说明安装成功。

```bash
Flutter 2.0.5 • channel stable • https://github.com/flutter/flutter.git
Framework • revision adc687823a (3 weeks ago) • 2021-04-16 09:40:20 -0700
Engine • revision b09f014e96
Tools • Dart 2.12.3
```

> 安装 flutter 时遇到错误：

```bash
curl: (56) LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 60
```

[RPC failed; curl 56 LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54](https://stackoverflow.com/questions/24952683/git-push-error-rpc-failed-result-56-http-code-200-fatal-the-remote-end-hun/36843260#36843260)

```bash
ALL_PROXY=socks5://127.0.0.1:1086 brew install flutter
```

## iOS 环境

在 app store 里安装 Xcode 即可，`10G 的容量，在网络好的时候下载`。

安装 Xcode 包管理器：

```bash
sudo gem install cocoapods
```

## android 环境

安装 android-studio

```bash
brew install android-studio
```

> 不需要通过 brew 安装 android-sdk，第一次打开 android-studio 会让你下载。

> 科学上网，否则可能下载失败。

启动 android-studio，一路下一步，根据提示配置代理即可。

![提示配置代理](https://tva1.sinaimg.cn/large/008i3skNgy1gq6mubmv3kj30l6084wf8.jpg)

接受协议：

```bash
flutter doctor --android-licenses
```

一路 y 即可。

可能遇到错误：

> [flutter-doctor-error-android-sdkmanager-tool-not-found](https://stackoverflow.com/a/60529140/6524962)

或者试试这个

> [Android sdkmanager tool not found](https://stackoverflow.com/a/60490042/6524962)

## 检查环境是否就绪

```bahs
flutter doctor
```

提示都是`绿勾`就表示环境好了。

## 参考

1. [How to install Flutter on macOS using homebrew and asdf](https://dev.to/0xdonut/how-to-install-flutter-on-macos-using-homebrew-and-asdf-3loa)

2. []()
