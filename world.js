// const {Character, Player} = require("./player")

const { Door } = require("./container")

// const {ParentItem, Food, CombatItem, Weapon, Armor} = require('./items')
class WorldCell{
    constructor(name, length, width, top, bottom = 0, doors = [], characters = [], items = []){
        this.name = name,
        this.length = length,
        this.width = width,
        this.doors = doors,
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

    addCharacters(x,y,z,...character){
        character.forEach((char) => {
            this.characters.push(char)
            char.x = x;
            char.y = y;
            char.z = z;
            char.locationOf = this;
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
        this.doors.push(new Door(width, height, x, y, z, this, boundLocation))
    }

    addContainer(container){
        this.containers.push(container)
    }
    
    addItem(item, player){
        if (player){
            item.init(player.locationOf,player.x, player.y, player.z)
        }
        this.items.push(item);
        console.log(`${item.name} has been added to ${this.name}`);
    }

    removeItem(item){
        this.items.forEach((ele, i) => {
            if (ele === item){
                this.items.splice(i, 1); 
                console.log(`${item.name} has been removed from ${this.name}`)
            }
        });
    }
    
    displayContainer(container){
        this.containers.forEach((ele) => {
            if (container === ele){
                console.log(ele)
            }
        })
    }

    displayItems(){
        console.log(`${this.name} currently has`, this.items)
    }

    displayBoundaries(){
        console.log("north", this.northBoundary);
        console.log("south", this.southBoundary);
        console.log("east", this.eastBoundary);
        console.log("west", this.westBoundary);

    }

}

module.exports = {WorldCell}
