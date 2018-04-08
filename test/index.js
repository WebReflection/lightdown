var lightdown = require('../cjs/index.js');

[
  [
    'hello *world*',
    'hello <em>world</em>'
  ],
  [
    'this "sentence" _has_ *em* and **strong** and a ~strike~ too',
    'this “sentence” <u>has</u> <em>em</em> and <strong>strong</strong> and a <strike>strike</strike> too'
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
    'this is a link: http://google.com',
    'this is a link: <a href="http://google.com">http://google.com</a>'
  ],
  [
    'this is a weird link: http://google.com?a="&b=2 .',
    'this is a weird link: <a href="http://google.com?a=&quot;&b=2">http://google.com?a="&b=2</a> .'
  ]
].forEach(function(test) {
  console.assert(
    lightdown(test[0]) === test[1],
    '\n\n' + test[1] + '\n\n' + lightdown(test[0]) + '\n'
  );
});