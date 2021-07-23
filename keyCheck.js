let keypress = require("keypress")

keypress(process.stdin);

function keyCheck(character, output = false){
  process.stdin.setRawMode(true);

  process.stdin.resume();
process.stdin.on('keypress', function (ch, key) {
  if (output){
  console.log('got "keypress"', key);
  }
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  if (key && key.name === character){
      process.stdin.pause();
      return true
  }
});}


function getClick(showCoord){
  process.stdin.setRawMode(true);
  process.stdin.resume();
  keypress.enableMouse(process.stdout);
  process.stdin.on('mousepress', function (info) {
    if (showCoord){console.log(`x: ${info.x}, y: ${info.y}`)}
    process.stdin.pause();
    // console.log(info)
    if (info.button){return info.button}
    if (info.scroll){return info.scroll}
  // console.log('got "mousepress" event at %d x %d', info.x, info.y);
  });
  // if (true){
  process.on('exit', function () {
  // disable mouse on exit, so that the state
  // is back to normal for the terminal
  keypress.disableMouse(process.stdout);
  });
}
getClick(true)
keyCheck("up")
module.exports = {keyCheck, getClick};