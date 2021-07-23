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


function getClick(){
  process.stdin.setRawMode(true);
  process.stdin.resume();
  keypress.enableMouse(process.stdout);
  process.stdin.on('mousepress', function (info) {
  console.log(info)
  console.log('got "mousepress" event at %d x %d', info.x, info.y);
  });
  process.on('exit', function () {
  keypress.disableMouse(process.stdout);
  }
  );
}

function getChar(variable){
  process.stdin.resume();
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {process.stdin.pause();}
    if (key){process.stdin.pause();console.log(key);variable = key.name; return}
  });
}

async function getStr(){
  let char = await getChar(char);
  console.log(char);
}

// let p = new Promise((resolve, reject) => {
//   let str = []
//   process.stdin.resume();
//   process.stdin.on('keypress', function (ch, key) {
//     if (key && key.ctrl && key.name == 'c') {
//       reject("canceled");
//       process.stdin.pause();
//     }
//     else if (key){
//       process.stdin.pause();
//       str.push(key.name)
//       console.log(key);
//       variable = key.name;
//       resolve(str)
//     }
//   });
// })
// let ans;
// p.then((str) => {str.pop();str = str.join("");ans = str;}).catch((failed) => {console.log(failed)})
  // let check = true
  // while (check){
  //   if (ans){check = false}

  // }
  keyCheck()
  getClick(true)
module.exports = {keyCheck, getClick};
