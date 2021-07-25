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

    isCloseTo(obj){
        return ((this.locationOf.name === obj.locationOf.name) && (Math.abs(this.x - obj.x) <= 3) && (Math.abs(this.y - obj.y) <= 3) && (Math.abs(this.z - obj.z) <= 3))
    }

    displayCoord(){
        console.log(`x: ${this.x}`);
        console.log(`y: ${this.y}`);
        console.log(`z: ${this.z}`);
        console.log(`Location: ${this.locationOf.name}`)

    }
    setLocation(x,y,z, msg, location = this.locationOf){
        //alters the location of player
        {for (let i = 0; i < x && this.x < location.eastBoundary; i++){this.x++;}};
        {for (let i = 0; i < -x && this.x > location.westBoundary; i++){this.x--;}}
        {for (let i = 0; i < y && this.y < location.northBoundary; i++){this.y++;}}
        {for (let i = 0; i < -y && this.y > location.southBoundary ;i++){this.y--;}}
        {for (let i = 0; i < z && this.z > location.bottomBoundary && this.z < location.topBoundary; i++){this.z++;}}
        this.locationOf = location;
        console.log(msg)
        this.displayCoord();
    }
    position(){
        return [this.x, this.y, this.z]
    }
    //different ways that player can move
    walkNorth(y){this.setLocation(0, y, 0, `${this.name} has walked north`)}
    walkSouth(y){this.setLocation(0, -y, 0, `${this.name} has walked south`)}
    walkEast(x){this.setLocation(x, 0, 0, `${this.name} has walked east`)}
    walkWest(x){this.setLocation(-x, 0, 0, `${this.name} has walked west`)}
    jump(){this.setLocation(0, 0, 1); this.setLocation(0, 0, 1);}
    //enters a room if I am within three units to a door
    enterRoom(x = 0, y = 0, z = 0){
        let index;
        if (this.locationOf.doors.reduce((bool, ele, i) => {
            if (this.isCloseTo(ele)){
                index = i; 
                return true
            }
            else {
                return bool
            }
            }, false)
            ){  console.log(`Entered ${this.locationOf.doors[index].boundLocation.name}`)
                console.log(`${this.name} new coordinates: `)
                this.locationOf.doors[index].boundLocation.addCharacters(x, y, z, this);
                this.displayCoord()
            }
        }

    //picks up item and places in inventory
    pickUpItem(item, location = this.locationOf) {
        if(location.items.includes(item)){
            location.removeItem(item);
            this.inventory.push(item);
            console.log(`${item.name} added to ${this.name}'s inventory`)
        }
    }
    // removes item from inventory
    dropItem(item, location = this.locationOf) {
        if (this.inventory.includes(item)){
            this.inventory.forEach((ele, i) => {
                if (item === ele){
                    this.inventory.splice(i, 1)
                }
            })
            console.log(`${item.name} has been removed from ${this.name}'s inventory`)
            location.addItem(item);
        }
        if (this.weaponEquipped[0] === item) {this.weaponEquipped[0] = null}
    }

    displayItems(){
        console.log(`${this.name} currently has`, this.inventory)
    }
    //basic combat
    giveDamage(amount, player) {
        if (this.locationOf.name === player.locationOf.name){
            console.log(this.locationOf.name, player.locationOf.name)
            player.takeDamage(amount)
        }else {
            console.log(`${player.name} is not able to be attacked right now`)
        }
    }
          
    takeDamage(amount) {
        this.health -= amount
    }

    eat(food) {
        if (food instanceof Food) {
            if (this.inventory.includes(food)) {
                this.restoreHealth(food.healthPoints);
                this.restoreHunger(food.hungerPoints);
                this.dropItem(food.id);
            }
            else {console.log(`You can only eat food that you have picked up.`)
            }
        }else {
            console.log(`${food.name} is not food.`)
        }
    }
    restoreHealth(amount) { 
        for (let i = 0; i <= amount && this.health < 100; i++) { 
            this.health++; 
        } 
    }
    restoreHunger(amount) { 
        for (let i = 0; i <= amount && this.hunger < 100; i++) { 
            this.hunger++; 
        } 
    }

    equipWeapon(weapon) { 
        if (this.inventory.includes(weapon)) { 
            this.weaponEquipped[0] = weapon; 
        } 
    }
    unequipWeapon() { 
        this.weaponEquipped[0] = null 
    }

    equipArmor(armorPiece, index) {
        if (this.inventory.includes(armorPiece)){
            this.armorEquipped[index] = armorPiece;
            this.damageResistance += armorPiece.protection;
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
    constructor(name, health, hunger, inventory, x,y,z, locationOf){
        super(name, health, hunger, inventory, x, y, z, locationOf)

    }
}


module.exports = {Character, Player, Merchant}
