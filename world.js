// const {Character, Player} = require("./player")
// const {ParentItem, Food, CombatItem, Weapon, Armor} = require('./items')
class WorldCell{
    constructor(name, length, width, height, portals = [], characters = [], containers = []){
        this.name = name,
        this.length = length,
        this.width = width,
        this.height = height,
        this.portals = portals,
        this.containers = containers,
        this.characters = characters
        this.northBoundary = (this.length / 2)
        this.southBoundary = -(this.length / 2)
        this.eastBoundary = (this.width / 2)
        this.westBoundary = -(this.width / 2)
    }

    addCharacters(...character){
        character.forEach((char) => {
            this.characters.push(char)
            char.x = 0;
            char.y = -20;
            char.z = 0;
            character.locationOf = this.name;
        })
    }

    removeCharacter(character){
        for (let i = 0; i < this.characters.length; i++){
            if (this.characters[i] === character) {
                this.characters.splice(i, 1)
            }
        }
    }
    addPortal(...portals){
        portals.forEach((portal) => {this.portals.push(portal)})
    }
    boundaries(){
        console.log("north", this.northBoundary);
        console.log("south", this.southBoundary);
        console.log("east", this.eastBoundary);
        console.log("west", this.westBoundary);

    }
}





// const ben = new Player("Ben", 100, 100, sword, [helmet, breastPlate, leggings, boots] );
// ben.init()
// let room1 = new World("Merchant bobs store", 25, 25, 9, [], []);
// room1.addCharacter(ben)
// ben.walkNorth(5);
// ben.walkEast(17)
// console.log(room1)


module.exports = {WorldCell}
