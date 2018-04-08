# lightdown

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) [![Build Status](https://travis-ci.org/WebReflection/lightdown.svg?branch=master)](https://travis-ci.org/WebReflection/lightdown) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/lightdown/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/lightdown?branch=master)

A minimalistic, safe, and chat oriented, markdown-ish utility.

  * around 0.6K
  * compatible with ES3+ (every engine, every browser)
  * code is always 100% preserved
  * links are preserved but shown with a maximum length

[Live Demo](https://codepen.io/WebReflection/pen/yKGBWo?editors=0100)

### Different from Markdown

The main, and most important, difference from [markdown](https://daringfireball.net/projects/markdown/syntax)
is that the single biggest source of inspiration for lightdown's syntax is the format of chat messages, tweets, or even SMS.

The reason is a less empowering layout, without images, or hidden links, with full expressiveness preserved, including bullet lists created one line per time.



### Lightdown VS HTML

While produced output contains safe HTML, bear in mind lightdown does not do any extra input sanitization: what goes in, goes out.

If you want to be sure your text is 100% HTML safe, replace `<` and `>` to avoid surprises.

```js
const lightdown = require('lightdown');

// safely inject the result
element.innerHTML = lightdown(
  text.replace(/[<>]/g, m => ({'<':'&lt;', '>':'&gt;'}[m]))
);
```


### Lightdown: Syntax

  * single `*` for emphasis, more `**` for strong
  * one or more `~` for striking through
  * one or more `_` for underscore
  * double `"quotes"` for proper `“quotes”`
  * single tick `` ` `` for inline code
  * multiple ticks for multi line code. If there is a programming language name right after ticks it will be used as code class.
  * start a line with a ` * `, surrounded by one or more spaces, to convert that `*` into a bullet `•`
  * all links are shown inline with a max length, still fully preserving their original URL

