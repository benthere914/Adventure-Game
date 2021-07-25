// const {Character, Player} = require("./player")

const { Door } = require("./container")

// const {ParentItem, Food, CombatItem, Weapon, Armor} = require('./items')
class WorldCell{
    constructor(name, length, width, top, bottom = 0, doors = [], portals = [], characters = [], items = []){
        this.name = name,
        this.length = length,
        this.width = width,
        this.doors = doors,
        this.portals = portals,
        this.characters = characters,
        this.items = items,
        this.containers = [],
        this.northBoundary = (this.length / 2)
        this.southBoundary = -(this.length / 2)
        this.eastBoundary = (this.width / 2)
        this.westBoundary = -(this.width / 2)
        this.topBoundary = top,
        this.bottomBoundary = bottom
    }

    addCharacters(...character){
        character.forEach((char) => {
            this.characters.push(char)
            char.x = 0;
            char.y = -20;
            char.z = 0;
            char.locationOf = this
        })
    }

    removeCharacter(character){
        for (let i = 0; i < this.characters.length; i++){
            if (this.characters[i] === character) {
                this.characters.splice(i, 1)
            }
        }
    }

    addDoor(width, height, x, y, z, boundLocation){
        this.doors.push(new Door(width, height, x, y, z, boundLocation))
    }

    addPortal(...portals){portals.forEach((portal) => {this.portals.push(portal)})}
    displayBoundaries(){
        console.log("north", this.northBoundary);
        console.log("south", this.southBoundary);
        console.log("east", this.eastBoundary);
        console.log("west", this.westBoundary);

    }

    addContainer(container){this.containers.push(container)}
    addItem(item){this.items.push(item)}
    displayContainer(container){
        this.containers.forEach((ele) => {if (container === ele){console.log(ele)}})
    }
    displayItems(){
        console.log(this.items)
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
