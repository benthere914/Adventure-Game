// const { ParentItem, Food, CombatItem, Weapon, Armor, helmet, breastPlate, leggings, boots, sword, dagger, fists, apple, sandwich } = require("./items")

const { Container } = require("./container");
const { WorldCell } = require("./world");

class Character {
    constructor(name, health, hunger, weaponEquipped = null, armorEquipped = [null, null, null, null], damageResistance = 0, inventory = [], x, y, z, locationOf) {
        this.name = name,
        this.health = health,
        this.hunger = hunger;
        this.weaponEquipped = weaponEquipped,
        this.armorEquipped = armorEquipped
        this.damageResistance = damageResistance,
        this.inventory = inventory,
        this.x = x,
        this.y = y,
        this.z = z,
        this.locationOf = locationOf
    }

    init(){
        //inits the damage resistance
        this.damageResistance = this.armorEquipped.reduce((resistance, ele) => {return resistance + ele.protection}, 0)
        //inits the inventory to contain armor equipped
        for (let i = 0; i  < 4; i++){if (!this.inventory.includes(this.armorEquipped[i])){this.pickUpItem(this.armorEquipped[i])}}
        //inits the inventory to contain weapon equipped
        if (!this.inventory.includes(this.weaponEquipped)){if (!this.weaponEquipped === fists){this.pickUpItem(this.weaponEquipped)}}
    }

    displayCoord(){
        console.log(`x: ${this.x}`);
        console.log(`y: ${this.y}`);
        console.log(`z: ${this.z}`);

    }
    setLocation(x,y,z,location = this.locationOf){
        //alters the location of player
        if (x >= location.westBoundary && x <= location.eastBoundary){this.x += x;}
        if (y >= location.southBoundary && x <= location.northBoundary){this.y += y;}
        if (z >= location.bottomBoundary && z <= location.topBoundary) {this.z += z;}
        this.locationOf = location;
    }
    position(){
        return [this.x, this.y, this.z]
    }
    //different ways that player can move
    walkNorth(y){this.setLocation(0, y, 0)}
    walkSouth(y){this.setLocation(0, -y, 0)}
    walkEast(x){this.setLocation(x, 0, 0)}
    walkWest(x){this.setLocation(-x, 0, 0)}
    jump(){this.setLocation(0, 0, 1); this.setLocation(0, 0, 1);}
    enterRoom(room){
        // console.log(this.locationOf)
        if (this.locationOf.doors.reduce((bool, ele, i) => {
            if (bool) {return true}
            else {
                if ((ele.x - this.x <= 3) && (ele.y - this.y <= 3) && (ele.z - this.z <= 3)){
                   return true 
                }
            }
        }, false)){
            console.log(123)
            this.locationOf = room;
            room.addCharacters(this);
        }else {console.log("There is no door nearby")}
    
        
        
        
        }
    //picks up item and places in inventory
    pickUpItem(item, location) {
        if(location.items.includes(item)){
            this.inventory.push(item);
            location.items.forEach((ele, i) => {
                if (ele === item){
                    location.items.splice(i, 1)
                }
            });
        }
    }
    // removes item from inventory
    dropItem(item, location) {
        if (this.inventory.includes(item)){
            this.inventory.forEach((ele, i) => {
                if (item === ele){
                    this.inventory.splice(i, 1)
                }
            })
            // addItem.call(location, item);
            location.addItem(item);

        }
        
        if (this.weaponEquipped[0] === item) {this.weaponEquipped[0] = null}
    }
    //basic combat
    giveDamage(amount, player) {player.takeDamage(amount)}
    takeDamage(amount) {this.health -= amount}



    eat(food) {
        if (food instanceof Food) {
            if (this.inventory.includes(food)) {
                this.restoreHealth(food.healthPoints);
                this.restoreHunger(food.hungerPoints);
                this.dropItem(food.id);
            }
            else {console.log(`You can only eat food that you have picked up.`)
            }
        }else {console.log(`${food.name} is not food.`)}
    }
    restoreHealth(amount) { for (let i = 0; i <= amount && this.health < 100; i++) { this.health++; } }
    restoreHunger(amount) { for (let i = 0; i <= amount && this.hunger < 100; i++) { this.hunger++; } }

    equipWeapon(weapon) { if (this.inventory.includes(weapon)) { this.weaponEquipped[0] = weapon; } }
    unequipWeapon() { this.weaponEquipped[0] = null }

    equipArmor(armorPiece, index) {
        if (this.inventory.includes(armorPiece)){
            this.armorEquipped[index] = armorPiece;
            this.damageResistance += armorPiece.protection
        }
        else {
            console.log(`The ${armorPiece.name} is not in your inventory`)
        }
    }
    unequipArmor(armorPiece, index) {
        this.damageResistance -= armorPiece.protection;
        this.armorEquipped[index] = undefined;
    }
    //this is the method that is called on either a weapon or piece of armor
    equip(item) {
        if (item instanceof Weapon) {
            if (this.weaponEquipped === item) {
                this.unequipWeapon()
            } else {
                this.unequipWeapon()
                this.equipWeapon(item)
            }
        }
        else if (item instanceof Armor) {
            if (this.armorEquipped.includes(item)) {
                if (item.type === "helmet") { console.log("yes"); this.unequipArmor(item, 0) }
                if (item.type === "breastPlate") { this.unequipArmor(item, 1) }
                if (item.type === "leggings") { this.unequipArmor(item, 2) }
                if (item.type === "boots") { this.unequipArmor(item, 3) }
            } else {
                if (item.type === "helmet") { this.equipArmor(item, 0) }
                if (item.type === "breastPlate") { this.equipArmor(item, 1) }
                if (item.type === "leggings") { this.equipArmor(item, 2) }
                if (item.type === "boots") { this.equipArmor(item, 3) }
            }
        }
    }
}


class Player extends Character {
    constructor(name, health, hunger, weaponEquipped = [], armorEquipped, inventory, damageResistance, x,y,z, locationOf) {
        super(name, health, hunger, weaponEquipped, armorEquipped, damageResistance, inventory, x,y,z,locationOf);
    }
}


class Merchant extends Character{
    constructor(name, health, hunger, inventory, x,y,z,locationOf){
        super(name, health, hunger, inventory, x, y, z, locationOf)

    }
}







// const ben = new Player("Ben", 100, 100, sword, [helmet, breastPlate, leggings, boots] );

module.exports = {Character, Player, Merchant}


// const bob = new Player("Bob", 100, 100);
// for (let i = 0; i < 10; i++){
// ben.giveDamage(ben.weaponEquipped.damage, bob)
// console.log(bob.health)
// }
// ben.init()
// console.log(ben)
// bob.giveDamage(20, ben);
// ben.pickUpItem(helmet)
// ben.pickUpItem(breastPlate)
// ben.pickUpItem(leggings)
// ben.pickUpItem(boots)

// ben.pickUpItem(sword)
// console.log(bob.inventory);
// ben.equip(helmet);
// console.log(ben)
// bob.dropItem(helmet)
// ben.equip(helmet);
// console.log(bob.inventory)

// console.log(helmet instanceof Armor)
// ben.equip(breastPlate);
// ben.equip(leggings);
// ben.equip(boots);

// console.log(ben);
// ben.equip(sword);
// console.log(ben);
// console.log(ben.health)
// ben.eat(apple)
// ben.eat(sword)
// ben.equipWeapon(sword)
// console.log(ben.health)
// ben.unequipWeapon();
// console.log("pause")
// ben.dropItem("apple01")
// ben.heal(25)
// console.log(ben.inventory)
// console.log(ben)
