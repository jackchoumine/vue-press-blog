# git 提交规范

> 意义及现状

在开发过程中，Git 每次提交代码，都需要写 Commit message（提交说明），规范的 Commit message 有很多好处：

- 方便快速浏览查找，回溯之前的工作内容
- 可以直接从 commit 生成 Change log(发布时用于说明版本差异)

目前我们并没有对 commit message 进行规范，造成以下麻烦：

- 每个人风格不同，格式凌乱，查看很不方便
- 部分 commit 没有填写 message，事后难以得知对应修改的作用

`规范Commit message不仅能解决上述问题，而且基本没有副作用和学习成本，应该尽早加上。`

> 规范方式

为了实现规范，我们使用 `commitlint` 和 `husky` 来进行提交检查，当执行 git commit 时会在对应的 git 钩子上做校验，只有符合格式的 Commit message 才能提交成功。

为了方便使用，增加了 commitizen 支持，使用 cz-customizable 进行配置。支持使用 git cz 替代 git commit。

> 本地检查依然可以绕过。

> Commit message 格式

```bash
<type>(<scope>): <subject>
// NOTE  注意冒号 : 后有空格
// 如 feat(miniprogram): 增加了小程序模板消息相关功能
```

`公司内部项目，避免了过于复杂的规定，格式较为简单且不限制中英文，否则可能降低开发效率。`

type `必填`表示提交类型，值有以下几种：

```bash
feat - 新功能 feature
fix - 修复 bug
merge - 合并分支
docs - 文档注释
style - 代码格式(不影响代码运行的变动)
refactor - 重构、优化(既不增加新功能，也不是修复 bug)
perf - 性能优化
test - 增加测试
chore - 构建过程或辅助工具的变动
revert - 回退
build - 打包
```

scope 选填表示 commit 的作用范围，如数据层、视图层，也可以是目录名称。

subject `必填`用于对 commit 进行简短的描述。

> 如何在项目中限制提交格式？

1. 添加验证规则

安装依赖：

```bash
npm i @commitlint/cli @commitlint/config-conventional -D
```

项目根目录添加规则 `commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2, // 2 表示必须
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'merge', // 合并分支
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
}
```

2. 检查是否符合规则

在 git hook 中检查提交信息是否符合规则

安装依赖

```bash
npm i husky --save-dev
```

> husky 5 版本和 6 版本可能不生效。安装版本 4 , 比如 `^4.3.8`

执行检查命令：

在 `package.json` 文件中增加相关配置

```js
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

或者 `.huskyrc.js`

```js
module.exports = {
  hooks: {
    // git commit 前的钩子
    'pre-commit': 'lint-staged',
    // 检查 git 提交信息
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}
```

完成以上两步，就可检查提交信息是否符合规范了，希望以交互式地选择提交信息，可进行 第三步操作。

3. `git cz` 代替 `git commit` 进行交互式选择提交信息

安装依赖：

```bash
npm install commitizen -g # 需要执行 commitizen 和 使用 git cz 代替 git commit，需要全局安装
npm install commitizen -D # 本地安装
```

执行 commitizen 命令

```bash
commitizen init cz-customizable
```

会在 package.json 中添加如下选项：

```bash
"config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
```
添加了依赖：
```bash
"cz-customizable": "^6.3.0",
```

添加交互提示配置文件，希望使用中文进行交互：

`.cz-config.js`

```js
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'merge', name: 'merge:    合并分支' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'build', name: 'build:    打包' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
  ],
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    // scope: '请输入文件修改范围(可选):',
    // used if allowCustomScopes is true
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    // breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
  },
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  // limit subject length, commitlint默认是72
  subjectLimit: 72,
}
```

执行 `git cz`，显示如下交互信息，上下键选择，回车进入下一个交互。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gqko4rup1pj30up0fwq3z.jpg 'git cz 交互式提交')

> ctrl + c 可退出

最后输入 `y` 在此确认。

> 参考

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

[超详细的 Git 提交规范引入指南](https://juejin.cn/post/6844903793033756680)

[cz-customizable README](https://github.com/leoforfree/cz-customizable)

## 自动生成变更日志

规范了 Commit 格式之后，发布新版本时，使用 Conventional Changelog 就能够自动生成 Change log，生成的文档包括以下 3 个部分：

1. New features
2. Bug fixes
3. Breaking changes(不向上兼容的部分，我们的规范不要求 footer，所以这一项不会出现)

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

> 如何加入项目

安装依赖：

```bash
npm i conventional-changelog-cli -D
```

添加脚本，在 package.json 中加入配置方便使用

```js
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  },
```

执行`npm run changelog` 就生成变更日志了。

## 以上配置完成后其他团队成员如何使用

1. 测试配无误，提交代码到主分支。
2. 其他人拉取代码，合并进入开发分支
3. `npm i` 安装新的依赖，全局安装 `npm i commitizen -g`
4. 使用`g cz` 提交一次使用可用
5. 添加日志依赖，一般不加日志

## 在新项目里添加约束：

1. 添加依赖

```bash
npm i -D @commitlint/cli @commitlint/config-conventional commitizen husky@^4.3.8
npm i -g commitizen # 全局安装
commitizen init cz-customizable # 执行
```

2. 添加 git hook

package.json

```bash
 "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" # 添加这个
    }
  }
```

> 没有 husky，需要安装: n i -D husky@^4.3.8

3. 复制 `.cz-config.js` 和 `commitlint.config.js` 到新项目

4. 执行 `git cz` 验证是否成功。

依赖以及`package.json`配置:


```js
  "devDependencies": {
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "husky": "^4.3.8",
    "lint-staged": "^11.0.1" // 不适应 lint-staged 可不安装
    "commitizen": "^4.2.4",
    "cz-customizable": "^6.3.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx,css,scss}": [
      "prettier --write"
    ]
  },
```
