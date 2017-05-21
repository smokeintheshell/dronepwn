/* this node app is used to read stdin and print the utf8 character code for any keys used. typically for special keys, ie fn home end arrows, you need to use the full \u code, standard alphanumeric can
be used with string comparison to their value ie if 'r' == 'r'
*/
var stdin = process.stdin; 
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function(key){
	    console.log(toUnicode(key)); //Gives you the unicode of the pressed key
	    if (key == '\u0003') { process.exit(); }    // ctrl-c
});

function toUnicode(theString) {
	  var unicodeString = '';
	  for (var i=0; i < theString.length; i++) {
		      var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
		      while (theUnicode.length < 4) {
			            theUnicode = '0' + theUnicode;
			          }
		      theUnicode = '\\u' + theUnicode;
		      unicodeString += theUnicode;
		    }
	  return unicodeString;
}
