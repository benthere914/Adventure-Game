const {Character, Player}= require('./player')
const readLine = require('readline');
for (let i = 0; i < 25; i++){console.log("                                     ")}
let rl = readLine.createInterface({input: process.stdin, output: process.stdout});
rl.question("What is your name? ", (name) => {
    console.log("What class of character Do you want to play as?");
    console.log("        -Knight");
    console.log("        -Archer");
    console.log("        -Mage");
    console.log("        -Rouge");
    console.log("        -Druid");
    console.log("        -Beserker");



    rl.question('', (characterClass) => {
        rl.close()
    } )
})
//get name

//get class of character

//get weapon of choice
