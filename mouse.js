let keypress = require("keypress")
keypress(process.stdin);

function keyCheck(print = false){
    let output = [];
    let notAllowed = ["space", "right" ,"left" ,"down" ,"up"]
    // process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('keypress', function (ch, key) {
        if (key){
            if (key.ctrl && key.name == 'c') {
                process.stdin.pause();
            }
            if (key.name !== 'return' && key.name !== 'enter') {
                if (print){
                    console.log('got "keypress"', key);
                }
                if (!notAllowed.includes(key.name)){
                    output.push(key.name);
                    // process.stdout.write(key.name);
                }
                if (key.name === "space"){output.push(" ")};
            }
            if (key.name === 'return' || key.name === 'enter') {
                output = output.join("");
                // console.log("");
                console.log(`you typed ${output}`);
                // process.stdin.pause();
                output = [];
                return output}
        }
  });
}


function getClick(output = false){
    process.stdin.setRawMode(true);
    process.stdin.resume();
    keypress.enableMouse(process.stdout);
    process.stdin.on('mousepress', function (info) {
        if (output){
            console.log('got "mousepress" event at %d x %d', info.x, info.y);
            console.log(info);
        }
        return info
    });
    process.on('exit', function () {keypress.disableMouse(process.stdout);});
}
function name(params) {
return keyCheck()
}



// getClick(1)

console.log("after the code above")















// let res = keyCheck();
// console.log(res)


// function playGame(){
//     let output = [];
//     let notAllowed = ["space", "right" ,"left" ,"down" ,"up"];
//     let gameState = "start";
//     getClick()
//     console.log("What is your name?");
//     process.stdin.resume();
//     process.stdin.on('keypress', function (ch, key) {
//         if (key){
//             if (key.ctrl && key.name == 'c') {
//                 process.stdin.pause();

//             }
//             else if (key.name !== 'return' && key.name !== 'enter') {
//                 if (!notAllowed.includes(key.name)){
//                     output.push(key.name);
//                     process.stdout.write(key.name);
//                 }
//                 if (key.name === "space"){output.push(" ")};
//             }
//             else if (key.name === 'return' || key.name === 'enter') {
//                 resultStr = output.join("");
//                 console.log("");
//                 // console.log(`Hi there, ${output}`);
//                 output = [];
//             }
//             function game(...params) {

//             }
//         if (gameState === "start"){}
//             if (pressed){
//                 console.log("hello, ", resultStr)
//             }
//         }


//     })
// }
// playGame()
