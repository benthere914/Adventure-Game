const {helmet, breastPlate, leggings, boots, sword, dagger, apple, sandwich} = require("./items")

class Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped){
        this.name = name, 
        this.health = health, 
        this.hunger
        this.weaponEquipped = weaponEquipped, 
        this.armorEquipped = armorEquipped
    }
    giveDamage(amount, player){player.takeDamage(amount)}
    takeDamage(amount){this.health -= amount}
    heal(amount){for(let i = 0; i <= amount && this.health < 100; i++){this.health++;}}
    equipWeapon(weapon){this.weaponEquipped = weapon;}
    unequipWeapon(){this.weaponEquipped = undefined}
    pickUpItem(item){this.inventory.push(item)}
    eat(food){if (food instanceof Food) {}}
}


class Player extends Character{
    constructor(name, health, inventory = []){
        super(name, health)
        this.inventory = inventory;
    }
}



const ben = new Player("Ben", 100);
const bob = new Player("Bob", 100)
console.log(ben)
bob.giveDamage(20, ben);
ben.pickUpItem(apple)
ben.pickUpItem(sword)
ben.heal(25)
console.log(ben.inventory)

