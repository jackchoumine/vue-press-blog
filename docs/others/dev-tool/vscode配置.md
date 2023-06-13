# vscode 配置

有些公司限制 vscode 设置同步，故把我的 vscode 设置放在这里，再复制公司电脑上。

## 全局`settings.json`

```js
{
  // 'Fira Code','JetBrains Mono',
  "editor.fontFamily": "'Fira Code','JetBrains Mono',Menlo, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 18,
  //一个制表符等于的空格数。该设置在`editor.detectIndentation`
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.fontWeight": "400",
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.matchBrackets": "always",
  "editor.highlightActiveIndentGuide": true,
  // 视区宽度内自动换行
  "editor.wordWrap": "on",
  "editor.tabCompletion": "on", // 推荐值 tab 自动完成
  // 代码建议补全
  "editor.suggestSelection": "recentlyUsedByPrefix",
  "editor.linkedEditing": true, // 修改html标签联动编辑
  // 在一定数量的等宽字符后显示垂直标尺。输入多个值，显示多个标尺。若数组为空，则不绘制标尺
  // 前端项目似乎不需要
  "editor.rulers": [],
  // 特定语言设置垂直标尺
  "[python]": {
    "editor.rulers": [79, 120]
  },
  // vscode 默认启用了根据文件类型自动设置tabSize的选项
  // "editor.detectIndentation": false,
  "editor.renderIndentGuides": true,
  "editor.renderControlCharacters": true,
  "editor.copyWithSyntaxHighlighting": false,
  "editor.formatOnPaste": true, // 粘贴时格式化
  // 智能提示配置
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  // 每次保存的时候自动格式化
  // NOTE 不开启，否则 eslint 的 vue/max-attributes-per-line 和 prettier 冲突
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  // # 每次保存的时候将代码按 eslint 格式进行修复
  "editor.codeActionsOnSave": {
    // 保存时的行为
    "source.fixAll": true,
    "source.organizeImports": false,
    "source.fixAll.eslint": true,
    "source.fixAll.tslint": true
  },
  // 自动保存时延
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.associations": {
    "*.vue": "vue",
    "*.html": "html"
  },
  "explorer.confirmDelete": true,
  // 垂直标尺的颜色设置
  "workbench.colorCustomizations": {
    "editorRuler.foreground": "#ff4081"
  },
  "vsicons.dontShowNewVersionMessage": true,
  "workbench.iconTheme": "vscode-icons",
  "git.ignoreMissingGitWarning": true,
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "gitlens.advanced.messages": {
    "suppressLineUncommittedWarning": true
  },
  // 终端设置
  // window 命令行
  "terminal.integrated.profiles.windows": {
    "PowerShell -NoProfile": {
      "source": "PowerShell",
      "args": ["-NoProfile"]
    }
  },
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.profiles.osx": {
    "zsh (x86-64)": {
      "path": "arch",
      "args": ["-x86_64", "/bin/zsh"]
    }
  },
  // "/bin/zsh",
  "terminal.explorerKind": "external",
  "terminal.external.osxExec": "iTerm.app", // mac 外部终端
  "terminal.integrated.automationShell.osx": "/bin/zsh",
  "terminal.integrated.copyOnSelection": true,
  "terminal.integrated.rightClickBehavior": "paste",
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.cursorBlinking": true,

  // 默认编码
  "files.defaultLanguage": "utf8",
  //文件自动编码
  "files.autoGuessEncoding": true,
  // 这些文件将不会显示在工作空间中
  "files.exclude": {
    "**/.classpath": true,
    "**/*.class": true,
    "**/.project": true,
    "**/.": true,
    "**/.settings": true,
    "**/.factorypath": true,
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/*.js": {
      "when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
    },
    "**/node_modules": false
  },
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/target": true,
    "**/logs": true,
    "**/dist": true
  },
  "highlightLine.borderStyle": "solid",
  "highlightLine.borderWidth": "1px",
  "highlightLine.borderColor": "#C9ABA5",
  // colorize 扩展设置
  "colorize.languages": ["javascript", "javascriptreact", "typescript", "vue", "scss", "less", "css"],
  /* 文件说明注释  */
  "fileheader.customMade": {
    "Description": "",
    // "Hash": "不是路由组件",
    "Date": "Do not edit",
    "Author": "JackChou",
    "LastEditTime": "Do not edit",
    "LastEditors": "JackChou"
  },
  "fileheader.cursorMode": {
    "param": "",
    // "return": "",
    "Author": "JackChou"
  },
  "fileheader.configObj": {
    "autoAdd": false,
    "wideSame": true, // 等宽
    "wideNum": 12, // 字段长度 默认为13
    "CheckFileChange": true, //  只有文件头改变，回滚到最新版
    // "autoAddLine": 100,
    "prohibitAutoAdd": ["json", "md", "less"], //  禁止.json .md 文件，自动添加头部注释
    "dateFormat": "YYYY-MM-DD HH:mm:ss ZZ" // 日期格式 输出：2019-05-20 15:42:07 +0800
  },

  /* todo-tree settings */
  // "todo-tree.regex.regex": "((//|#|<!--|;|/\\*|^)\\s*($TAGS):|^\\s*- \\[ \\])", // 在文件中匹配 tag 的正则
  // "todo-tree.regex.regexCaseSensitive": false,//tag  是否大小写敏感
  "todo-tree.regex.regex": "(//|#|<!--|;|/\\*|^|^\\s*(-|\\d+.))\\s*($TAGS)",
  "todo-tree.general.tags": ["TODO", "FIXME", "BUG", "NOTE", "DEL"],
  "todo-tree.highlights.defaultHighlight": {
    // 默认 tag 设置
    "background": "#f9f9fb", //"peekViewResult.background", // 使用 // "yellow", // 标记的背景色
    "foreground": "yellow", // 标记前景色 (文字颜色)
    "icon": "check", // 使用的图标
    "rulerColour": "yellow", // 在右侧快速预览的颜色
    "type": "tag", // 在文件中如何高亮  tag：只高亮标签  text：标签和后面的文字  tag-and-comment：高亮注释和标签  text-and-comment：标签 文字和注释  line：标记的一行  whole-line：
    "iconColour": "#fff" // 左侧 todo tree  图标的颜色，没有设置，使用前景色
  },
  "todo-tree.highlights.customHighlight": {
    "BUG": {
      "background": "#D01F00", // 红色
      "foreground": "#f9f9fb",
      "icon": "bug", // 显示的 icon
      "rulerColor": "#D01F00", // 预览表标尺的颜色
      "iconColour": "#D01F00", // todo  树中图标颜色
      "gutterIcon": true // 是否在行号旁显示图标
    },
    "TODO": {
      "background": "#3399CC", // 蓝色
      "foreground": "#f9f9fb",
      "iconColour": "#3399CC",
      "icon": "checklist",
      "rulerLane": "full",
      "gutterIcon": true
    },
    "FIXME": {
      "background": "#FF9900", // 黄色
      "foreground": "#f9f9fb",
      "iconColour": "#FF9900",
      "icon": "alert", // 警告
      "gutterIcon": true,
      "type": "text" // 有文字部分（代码、tab、text）, 后面的空白部分不高亮
    },
    "NOTE": {
      "background": "#f9f9fb",
      "foreground": "#000", // 黑色
      "icon": "note",
      // "type": "whole-line", // 整行高亮
      "rulerColour": "#D1BC15",
      "iconColour ": "white",
      "hideFromTree": true // 在  todo  树中隐藏
    },
    "DEL": {
      "background": "#FFC300",
      "foreground": "#000", // 黑色
      "icon": "eye",
      // "type": "whole-line", // 整行高亮
      "rulerColour": "#D1BC15",
      "iconColour ": "white"
    }
  },
  "todo-tree.tree.scanAtStartup": false,
  "todo-tree.general.statusBar": "tags", // 状态栏显示样式
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  // 默认格式化设置
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[typescript]": {
    // "editor.defaultFormatter": "vscode.typescript-language-features" // 编辑器内置的格式化功能
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },

  "typescript.format.enable": false,
  "typescript.preferences.quoteStyle": "single",
  // 模块变化后自动更新 import
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.format.enable": false,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "javascript.preferences.quoteStyle": "single",
  "javascript.format.semicolons": "remove",
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features",
    "editor.linkedEditing": true
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.formatOnSave": true,
    "editor.wordWrap": "on",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    // 快速补全
    "editor.quickSuggestions": {
      "other": true,
      "comments": true,
      "strings": true
    },
    // 显示空格
    "editor.renderWhitespace": "boundary",
    // snippet 提示优先（看个人喜欢）
    "editor.snippetSuggestions": "top",
    "editor.tabCompletion": "on",
    // 使用 enter 接受提示
    "editor.acceptSuggestionOnEnter": "on"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.linkedEditing": true // 不生效，安装 auto rename tag 代替
  },
  "[jsx]": {
    "editor.linkedEditing": true // 不生效，安装 auto rename tag 代替
  },
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "reacttypescript",
    "reactjavascript",
    "html",
    "vue"
  ],
  "eslint.migration.2_x": "on",
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  // prettier 设置
  "prettier.useEditorConfig": true,
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true,
  "prettier.embeddedLanguageFormatting": "auto",
  "prettier.printWidth": 120,
  "prettier.semi": false,
  "prettier.arrowParens": "avoid",
  "prettier.proseWrap": "always",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.scriptInitialIndent": false,
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      // "wrap_attributes": "auto", // "force-aligned",
      // "wrap_attributes": "auto", // 在超出行长度时才对属性进行换行
      // "wrap_attributes": "force", // 对除第一个属性外的其他每个属性进行换行
      // "wrap_attributes": "force-aligned", // 第一个以外的属性换行对齐
      "wrap_attributes": "force-expand-multiline", // 所有属性强制换行对齐
      // "wrap_attributes": "force-multiline" // 超出规定长度，换行对齐
      // #vue 组件中html代码格式化样式
      "wrap_line_length": 120,
      "end_with_newline": false
    },
    "prettier": {
      "singleQuote": true,
      "semi": false,
      "arrowParens": "avoid",
      "html-whitespace-sensitivity": "ignore",
      "printWidth": 120, // 超过最大值换行
      "tabWidth": 2, // 缩进字节数
      "useTabs": false, // 缩进不使用tab，使用空格
      "proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
      // "bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
      // "disableLanguages": [
      //   "vue"
      // ], // 不格式化vue文件，vue文件的格式化单独设置
      "endOfLine": "auto", // 结尾是 \n \r \n\r auto
      "eslintIntegration": true, //不让prettier使用eslint的代码格式进行校验
      "htmlWhitespaceSensitivity": "ignore",
      "ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
      // "jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
      "jsxSingleQuote": true, // 在jsx中使用单引号代替双引号
      "parser": "babylon", // 格式化的解析器，默认是babylon
      "requireConfig": false, // Require a 'prettierconfig' to format prettier
      "stylelintIntegration": true, //不让prettier使用stylelint的代码格式进行校验
      "trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
      "tslintIntegration": true // 不让prettier使用tslint的代码格式进行校验
    }
  },
  // jest 配置
  "jest.autoRun": {
    "watch": true,
    // "onStartup": [
    //   "all-tests"
    // ]
    "onSave": "test-only"
  },
  "jestrunner.jestCommand": "npm run unit",
  "code-runner.executorMap": {
    "scheme": "chez --script"
  },
  // 格式化stylus, 需安装 Manta's Stylus Supremacy 插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "pxremUnit": 100,
  "cssrem.rootFontSize": 100,
  "copyOnSelect.trimStart": true,
  "vue-helper.quotes": "single",
  "scssFormatter.singleQuote": true,
  "autoimport.useSemiColon": false,
  "diffEditor.ignoreTrimWhitespace": false,
  "tabnine.experimentalAutoImports": true,
  "screencastMode.fontSize": 60,
  "liveServer.settings.NoBrowser": true,
  "liveServer.settings.CustomBrowser": "chrome",
  "extensions.autoCheckUpdates": false,
  "extensions.autoUpdate": false,
  "update.mode": "none",
  "liveServer.settings.donotShowInfoMsg": true,
  "[dart]": {
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "dart.openDevTools": "flutter",
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "search.followSymlinks": false,
  "dart.checkForSdkUpdates": false,
  "dart.allowAnalytics": false,
  "task.problemMatchers.neverPrompt": {
    "shell": true
  },
  "security.workspace.trust.untrustedFiles": "open",
  "code-runner.defaultLanguage": "typescripts",
  "java.configuration.maven.userSettings": "D:\\0maven\\apache-maven-3.5.2\\conf\\settings.xml",
  //Java 环境配置 end
  "java.jdt.ls.vmargs": "-noverify -Xmx1G -XX:+UseG1GC -XX:+UseStringDeduplication -javaagent:\"C:\\Users\\Administrator\\.vscode\\extensions\\gabrielbb.vscode-lombok-0.9.7/server/lombok.jar\" -Xbootclasspath/a:\"C:\\Users\\Administrator\\.vscode\\extensions\\gabrielbb.vscode-lombok-0.9.7/server/lombok.jar\"",
  "[java]": {
    "editor.defaultFormatter": "mwpb.java-prettier-formatter"
  },
  /* code spell checker */
  "cSpell.enableFiletypes": [".vue", ".ts", ".js"],
  "cSpell.userWords": [
    "Backtop",
    "Clilent",
    "DONOTE",
    "Deduplication",
    "Editcolumns",
    "Liskov",
    "NOAUTH",
    "Sider",
    "Submenu",
    "Tinymce",
    "Unmount",
    "Whitespaces",
    "Xbootclasspath",
    "Zilles",
    "adoptopenjdk",
    "antd",
    "autofetch",
    "brightfuture",
    "browserslist",
    "cakebrew",
    "chunkhash",
    "classpath",
    "codelyzer",
    "codemirror",
    "commitlint",
    "console.log",
    "craco",
    "cssrem",
    "devkit",
    "devtool",
    "docstrings",
    "dont",
    "drawio",
    "echarts",
    "eofline",
    "eqeqeq",
    "eslintt",
    "factorialize",
    "factorypath",
    "fileheader",
    "fira",
    "foler",
    "forin",
    "gabrielbb",
    "ghpages",
    "gitee",
    "gitlab",
    "hackernews",
    "hediet",
    "iconify",
    "jackchou",
    "jackchoumine",
    "jackzhoumine",
    "jasminewd",
    "javaagent",
    "jszip",
    "launchrocket",
    "lightgreen",
    "maxlength",
    "michelemelluso",
    "multiline",
    "nodesource",
    "nospace",
    "noverify",
    "npmignore",
    "nprogress",
    "onespace",
    "openjdk",
    "paren",
    "pbpaste",
    "plog",
    "plusplus",
    "portfinder",
    "precache",
    "prettierconfig",
    "prettierignore",
    "publickey",
    "pxrem",
    "qrcode",
    "simplemde",
    "singleline",
    "stylefmt",
    "stylelint",
    "sweetalert",
    "tasksfile",
    "todohighlight",
    "trcc",
    "typeof",
    "untap",
    "vetur",
    "vite",
    "vitejs",
    "vmargs",
    "vnode",
    "vsicons",
    "vsintellicode",
    "vuedx",
    "vueuse",
    "vuex",
    "webpack's",
    "zhou",
    "zmformtable",
    "zmformtableset",
    "zmgitlab"
  ],
  "hediet.vscode-drawio.local-storage": "eyIuZHJhd2lvLWNvbmZpZyI6IntcImxhbmd1YWdlXCI6XCJcIixcImN1c3RvbUZvbnRzXCI6W10sXCJsaWJyYXJpZXNcIjpcImdlbmVyYWw7YmFzaWNcIixcImN1c3RvbUxpYnJhcmllc1wiOltcIkwuc2NyYXRjaHBhZFwiXSxcInBsdWdpbnNcIjpbXSxcInJlY2VudENvbG9yc1wiOltcIjk5MDAwMFwiLFwiQ0MwMDAwXCIsXCIwMDAwMDBcIixcIkZGRkZGRlwiLFwiMUExQTFBXCJdLFwiZm9ybWF0V2lkdGhcIjpcIjI0MFwiLFwiY3JlYXRlVGFyZ2V0XCI6ZmFsc2UsXCJwYWdlRm9ybWF0XCI6e1wieFwiOjAsXCJ5XCI6MCxcIndpZHRoXCI6ODI3LFwiaGVpZ2h0XCI6MTE2OX0sXCJzZWFyY2hcIjp0cnVlLFwic2hvd1N0YXJ0U2NyZWVuXCI6dHJ1ZSxcImdyaWRDb2xvclwiOlwiI2QwZDBkMFwiLFwiZGFya0dyaWRDb2xvclwiOlwiIzZlNmU2ZVwiLFwiYXV0b3NhdmVcIjp0cnVlLFwicmVzaXplSW1hZ2VzXCI6bnVsbCxcIm9wZW5Db3VudGVyXCI6MCxcInZlcnNpb25cIjoxOCxcInVuaXRcIjoxLFwiaXNSdWxlck9uXCI6ZmFsc2UsXCJ1aVwiOlwiXCJ9In0="
}
```

## 常用扩展

1. 通用的功能增强

```bash
# 代码格式
Prettier
eslint
Alphabetical Sorter # 变量排序 优化代码排版

# 编辑器基础
code spell checker # 单词拼写检查
Chinese language # 简体中文界面
vscode-icons # 美丽的icon
Material Icon Theme # 主题
Image preview # 图片预览
Highlight Line # 编辑器当前行高亮
bracket pair colorize # 高亮匹配的（） {} []
Todo Tree # todo
Easy Snippet # 快速生成代码片段，配合 https://snippet-generator.app/

koroFileHeader # 文件头自动生成
Documentation this # 快速注释
Duplicate action # 快速复制
DotENV # . 文件
Formatting Toggle # 启用关闭格式化

# git 相关
Git Graph
Git history
gitLens
gitignore

# 代码智能提示
Github Copilot
Tabnine
```

2. 语言或者框架相关

```bash
# html
Highlight Matching Tag # 高亮匹配的 tag
auto rename tag # 自动重命名结束 tag

# css
Colorize # 颜色值高亮 【推荐】
Color Highlight # 颜色值高亮

# vue
Vue Language Features (Volar) # vue 语法高亮

# ts
Paste JSON as Code # json to type
```

3. 其他
