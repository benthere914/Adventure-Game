let keypress = require("keypress")
keypress(process.stdin);
keypress.enableMouse(process.stdout);

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
                    process.stdout.write(key.name);
                }
            }
            if (key.name === 'return' || key.name === 'enter') {
                output = output.join("");
                console.log("");
                console.log(`you typed ${output}`);
                process.stdin.pause();
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
// async function test(variable) {
//     variable = await keyCheck()
//     variable = await getClick()
//     return variable
// }
// async function testb(params) {
//     await console.log(test())
// }
// testb()

async function getStr(...rest) {
    const str = await keyCheck(1)
}

getStr()
