/*! (c) Andrea Giammarchi - ISC License */
function lightdown(e){var r=[],c=function(e,r,a){switch(a=a.replace(/([*~_"]+)(?!\s)([\S\s]*?\S)\1/g,c),r.charAt(0)){case"*":r=1===r.length?"em>":"strong>";break;case"~":r="strike>";break;case"_":r="u>";break;case'"':return"“"+a+"”"}return"<"+r+a+"</"+r};return e.replace(/\x01/g,"").replace(/(`{2,})([\S\s]+?)\1/g,function(e,c,a){var n=(/^([a-z]+)[\r\n]/i.exec(a)||["",""])[1];return n&&(n=n.toLowerCase(),a=a.slice(n.length)),a=a.replace(/^\s+|\s+$/g,""),r.push('<pre><code class="'+n+'">'+a+"</code></pre>"),""}).replace(/(`)(?!\s)([\S\s]*?\S)\1/g,function(e,c,a){return r.push("<code>"+a+"</code>"),""}).replace(/(^|\s)([a-z]{2,}:\/\/[^\s/$.?#-]+\.\S+)/g,function(e,c,a){return c=c+'<a href="'+a.replace(/"/g,"&quot;")+'">',a=a.replace(/^[a-z]{2,}:\/\/(www\.)?(.{0,36})(.+)$/,function(e,r,c,a){return c+(a.length<2?a:"…")}),r.push(c+a+"</a>"),""}).replace(/([*~_"]+)(?!\s)([\S\s]*?\S)\1/g,c).replace(/^(\s+)\*(\s+)/gm,"$1•$2").replace(/\x01/g,function(){return r.shift()})}