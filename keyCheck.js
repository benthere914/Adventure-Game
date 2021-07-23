let keypress = require("keypress")

keypress(process.stdin);

function keyCheck(character, output = false){
process.stdin.on('keypress', function (ch, key) {
  if (output){
  console.log('got "keypress"', key);
  }
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  if (key && key.name === character){
      return true
  }
});}

process.stdin.setRawMode(true);
process.stdin.resume();

module.exports = {keyCheck};