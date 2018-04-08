/*! (c) Andrea Giammarchi - ISC License */
function lightdown(s) {

  var
    a = [],
    re = function () {
      // note that *_asd*_ would work as strong
      // this cleans up automatically malformed marks
      // a new regexp is returned each time
      // to avoid messing up with nested parsing
      // while outer parsing is not complete
      return /([*~_"]+)(?!\s)([\S\s]*?\S)\1/g;
    },
    place = function ($0, $1, $2) {
      $2 = $2.replace(re(), place);
      switch ($1.charAt(0)) {
        case '*': $1 = ($1.length === 1 ? 'em>' : 'strong>'); break;
        case '~': $1 = 'strike>'; break;
        case '_': $1 = 'u>'; break;
        case '"': return '\u201C' + $2 + '\u201D';
      }
      return '<' + $1 + $2 + '</' + $1;
    }
  ;

  return s
    // drop evil chars
    .replace(/\x01/g, '')
    // replace multi line code with evil char
    .replace(
      /(`{2,})([\S\s]+?)\1/g,
      function ($0, $1, $2) {
        // look for the programming language
        var pl = (/^([a-z]+)[\r\n]/i.exec($2) || ['',''])[1];
        // lower case it and remove it from the code
        if (pl) {
          pl = pl.toLowerCase();
          $2 = $2.slice(pl.length);
        }
        // trim the code to avoid undesired lines
        $2 = $2.replace(/^\s+|\s+$/g, '');
        a.push('<pre><code class="' + pl + '">' + $2 + '</code></pre>');
        return '\x01';
      }
    )
    // replace single line code with evil char
    .replace(
      /(`)(?!\s)([\S\s]*?\S)\1/g,
      function ($0, $1, $2) {
        a.push('<code>' + $2 + '</code>');
        return '\x01';
      }
    )
    // replace URLs with evil char
    .replace(
      /(^|\s)([a-z]{2,}:\/\/[^\s/$.?#-]+\.\S+)/g,
      function ($0, $1, $2) {
        a.push($1 + '<a href="' + $2.replace(/"/g, '&quot;') + '">' + $2 + '</a>');
        return '\x01';
      }
    )
    // replace strong, strike, u, em, quotes
    .replace(re(), place)
    // put back URLs and code through evil chars
    .replace(
      /\x01/g,
      function () {
        return a.shift();
      }
    );

}