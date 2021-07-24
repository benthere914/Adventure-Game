const {Character, Player} = require("./player")
const {ParentItem, Food, CombatItem, Weapon, Armor} = require('./items')
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

const helmet = new Armor("Iron Helmet", 25, "h01" ,75, true, 30, "helmet");

const breastPlate = new Armor("Iron Breast Plate", 35, "bp01", 75, true, 55, "breastPlate");
const leggings = new Armor("Iron Leggings", 30, "l01" ,75, true, 40, "leggings");
const boots = new Armor("Iron Boots", 25, "b01", 75, true, 20, "boots");

const sword = new Weapon("Iron Sword", 80, "s01", 75, true, 10, "sword");
const dagger = new Weapon("Iron Dagger", 15, "d01", 75, true, 5, "dagger");
const fists = new Weapon("Just Regular punching fists", NaN, "fists", Infinity, true, 2, "fists" )

const apple = new Food("Red Apple", 2, "apple01", 1, 2);
const sandwich = new Food("BLT", 3.5, "sandwich01", 2, 4)


const ben = new Player("Ben", 100, 100, sword, [helmet, breastPlate, leggings, boots] );
ben.init()
let room1 = new World("Merchant bobs store", 25, 25, 9, [], []);
room1.addCharacter(ben)
ben.walkNorth(5);
ben.walkEast(17)
console.log(room1)


module.exports = {World}
