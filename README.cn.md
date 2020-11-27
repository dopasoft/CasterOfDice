# Caster Of Dice

Caster of Dice 是一个全栈式的在线TRPG工具网站。

## 语言
中文版的文档可能会落后几个版本，最新版的文档会是[README](README.md)。

## 前言
在开始之前，我建议您阅读该应用程序的基本构建块：
* MEAN.js - 虽然该项目与原始的MEAN.js项目相比进行了很大的修改，基本框架仍基于该项目。 如果您有任何基于COD的计划开发，请通读MEAN.js的基本信息以更好地了解该项目的结构。

## 前置程序
确保在开发计算机上安装了以下所有前置软件：
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX和Linux机器通常已经安装了此功能。
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) 以及npm的包管理工具。如果安装过程遇到了任何问题，您也可以使用[GitHub Gist](https://gist.github.com/isaacs/579814)来安装 Node.js。
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), 并确保它在默认端口上运行(27017)。

### 自行运行此网站
推荐的获取COD的方法是使用git直接克隆COD：

```bash
$ git clone https://github.com/dopasoft/CasterOfDice.git
```

## 快速安装

要安装依赖项，请从命令行在应用程序文件夹中运行此命令：

```bash
$ npm install
```

使用npm运行：

```bash
$ npm start
```

您的网站应在 *development* 环境配置下的端口3000上运行，因此在浏览器中，只需转到[http://localhost:3000](http://localhost:3000)就可以看到此网站。

### 在生产模式下运行
执行以下命令以在 *production* 环境配置中运行此网站:

```bash
$ npm run start:prod
```

请浏览 `config/env/production.js` 已获取生产环境配置的更多信息。

### 运行并生产种子用户
要在运行时设置默认帐户，请执行以下操作：

开发模式中:
```bash
MONGO_SEED=true npm start
```
它将尝试为用户'user'和'admin'生成默认的账号和密码。 如果其中一个用户已经存在，它将在控制台上显示错误消息。 只需从控制台获取密码即可。

生产模式:
```bash
MONGO_SEED=true npm start:prod
```
如果管理员用户尚不存在，则将生成管理员账号和密码。 请从控制台复制密码并保存。

## 使用Gulp运行您的网站

该COD项目集成了Gulp作为构建工具和任务自动化工具。

我使用npm脚本包装了Gulp任务，因此该如何运行该构建工具的以构建项目，对您都是透明的。
要直接使用Gulp，您需要先在全局安装它：

```bash
$ npm install gulp -g
```

然后使用以下命令启动开发环境：

```bash
$ gulp
```

要在 *production* 环境配置下运行您的网站，请按如下所示执行gulp：

```bash
$ gulp prod
```

也可以使用npm的run命令运行所有Gulp任务，从而使用本地安装的gulp，例如：`npm run gulp eslint`

## License
[The MIT License](LICENSE.md)