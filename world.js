const {Character, Player, ben} = require("./player")
class World{
    constructor(name, length, width, height, containers = [], characters = []){
        this.name = name,
        this.length = length,
        this.width = width,
        this.height = height,
        this.containers = containers,
        this.characters = characters
    }

    addCharacter(character){
        this.characters.push(character)
        character.x = 0;
        character.y = -20;
        character.z = 0;
        character.locationOf = this.name;
    }

    removeCharacter(character){
        for (let i = 0; i < this.characters.length; i++){
            if (this.characters[i] === character) {
                this.characters.splice(i, 1)
            }
        }
    }
}

// ben.init()
// let room1 = new World("Merchant bobs store", 25, 25, 9, [], []);
// room1.addCharacter(ben)
// ben.walkNorth(5);
// console.log(room1)


module.exports = {World}
