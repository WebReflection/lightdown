var lightdown = require('../cjs/index.js');

[
  [
    'hello *world*',
    'hello <em>world</em>'
  ],
  [
    'this "sentence" _has_ *em* and **strong** and a ~strike~ __too__',
    'this “sentence” <em>has</em> <em>em</em> and <strong>strong</strong> and a <strike>strike</strike> <u>too</u>'
  ],
  [
    'this text contains `var code = 123`.',
    'this text contains <code>var code = 123</code>.'
  ],
  [
    'this text contains ```\nmulti line code```.',
    'this text contains <pre><code class="">multi line code</code></pre>.'
  ],
  [
    'this text contains ```js\nmulti line code```.',
    'this text contains <pre><code class="js">multi line code</code></pre>.'
  ],
  [
    'this text contains ```js\nmulti line code```\nand more',
    'this text contains <pre><code class="js">multi line code</code></pre>and more'
  ],
  [
    '`` ` `` tick in ticks',
    '<pre><code class="">`</code></pre> tick in ticks'
  ],
  [
    'this is a link: http://google.com',
    'this is a link: <a href="http://google.com">google.com</a>'
  ],
  [
    'this is a weird link: http://google.com?a="&b=2 .',
    'this is a weird link: <a href="http://google.com?a=&quot;&b=2">google.com?a="&b=2</a> .'
  ],
  [
    'a very long link http://www.spotterguides.com/portfolio/18_ipc/?very-long',
    'a very long link <a href="http://www.spotterguides.com/portfolio/18_ipc/?very-long">spotterguides.com/portfolio/18_ipc/?…</a>'
  ],
  [
    ' * one bullet\n * two bullets',
    ' • one bullet\n • two bullets'
  ],
  [
    '> block quote\nout',
    '<blockquote>block quote</blockquote>out'
  ]
].forEach(function(test) {
  console.assert(
    lightdown(test[0]) === test[1],
    '\n\n' + test[1] + '\n\n' + lightdown(test[0]) + '\n'
  );
});