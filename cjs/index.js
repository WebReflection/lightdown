/*! (c) Andrea Giammarchi - ISC License */
function lightdown(s) {

  var
    a = [[],[],[]],
    re = function () {
      // note that *_asd*_ would work as strong
      // this cleans up automatically malformed marks
      // a new regexp is returned each time
      // to avoid messing up with nested parsing
      // while outer parsing is not complete
      return /([*_~"]+)(?!\s)([\S\s]*?\S)\1/g;
    },
    place = function ($0, $1, $2) {
      $2 = $2.replace(re(), place);
      switch ($1.charAt(0)) {
        case '*': $1 = ($1.length === 1 ? 'em>' : 'strong>'); break;
        case '_': $1 = ($1.length === 1 ? 'em>' : 'u>'); break;
        case '~': $1 = 'strike>'; break;
        case '"': return '\u201C' + $2 + '\u201D';
      }
      return '<' + $1 + $2 + '</' + $1;
    }
  ;

  return s
    // drop evil chars
    .replace(/[\x01-\x03]/g, '')
    // replace multi line code with evil char
    .replace(
      /(`{2,})([\S\s]+?)\1(\r\n|\n|\r)?/g,
      function ($0, $1, $2) {
        // look for the programming language
        var pl = '', match = /^( )?([a-z]+)[\r\n]/i.exec($2);
        // lower case it and remove it from the code
        if (match) {
          pl = match[2].toLowerCase();
          $2 = $2.slice((match[1] || '').length + pl.length);
        }
        // trim the code to avoid undesired lines
        $2 = $2.replace(/^\s+|\s+$/g, '');
        a[0].push('<pre><code class="' + pl + '">' + $2 + '</code></pre>');
        return '\x01';
      }
    )
    // replace single line code with evil char
    .replace(
      /(`)(?!\s)([\S\s]*?\S)\1/g,
      function ($0, $1, $2) {
        a[1].push('<code>' + $2 + '</code>');
        return '\x02';
      }
    )
    // replace URLs with evil char
    .replace(
      /(^|\s)([a-z]{2,}:\/\/[^\s/$.?#-]+\.\S+)/g,
      function ($0, $1, $2) {
        $1 = $1 + '<a href="' + $2.replace(/"/g, '&quot;') + '">';
        $2 = $2.replace(
          /^[a-z]{2,}:\/\/(www\.)?(.{0,36})(.+)$/,
          function ($0, $1, $2, $3) {
            return $2 + ($3.length < 2 ? $3 : '\u2026');
          }
        );
        a[2].push($1 + $2 + '</a>');
        return '\x03';
      }
    )
    // replace strong, strike, u, em, quotes
    .replace(re(), place)
    // replace bullets list
    .replace(/^( *)\*( +)/gm, '$1\u2022$2')
    // replace block quotes
    .replace(/^> (\S.*)(\r\n|\n|\r)?/gm, '<blockquote>$1</blockquote>')
    // aggregate block quotes
    .replace(/<\/blockquote><blockquote>/gm, '<br/>')
    // put back URLs and code through evil chars
    .replace(
      /[\x01-\x03]/g,
      function (c) {
        return a[c.charCodeAt(0) - 1].shift();
      }
    );

}
module.exports = lightdown;
