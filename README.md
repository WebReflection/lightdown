# lightdown

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) [![Build Status](https://travis-ci.org/WebReflection/lightdown.svg?branch=master)](https://travis-ci.org/WebReflection/lightdown) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/lightdown/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/lightdown?branch=master)

A minimalistic, safe, and chat oriented, markdown-ish utility.

  * less than 0.6K
  * compatible with ES3+ (every engine, every browser)
  * code is always 100% preserved
  * links are preserved but shown with a maximum length



### Different from Markdown

The main, and most important, difference from [markdown](https://daringfireball.net/projects/markdown/syntax)
is that the single biggest source of inspiration for lightdown's syntax is the format of chat messages, tweets, or even SMS.

The reason is a less empowering layout, without images, or hidden links, with full expressiveness preserved, including bullet lists created one line per time.



### Lightdown VS HTML

While produced output include safe HTML, bear in mind lightdown does not do any extra input sanitization: what goes in, goes out.

If you want to be sure your text is 100% HTML safe, consider using [html-escaper](https://github.com/WebReflection/html-escaper#html-escaper--) or any other escaper.

```js
const lightdown = require('lightdown');
const {escape} = require('html-escaper');

// safely inject the result
element.innerHTML = lightdown(escape(text));
```


### Lightdown: Syntax

  * single `*` for emphasis, more `**` for strong
  * one or more `~` for striking through
  * one or more `_` for underscore
  * double `"quotes"` for proper `“quotes”`
  * single tick `` ` `` for inline code
  * multiple ticks for multi line code. If there is a programming language name right after ticks it will be used as code class.
  * start a line with ` * ` to convert that `*` into a bullet `•`
  * all links are shown inline with a max length, still fully preserving their original URL

