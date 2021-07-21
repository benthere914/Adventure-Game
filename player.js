const {ParentItem, Food, CombatItem, Weapon, Armor, helmet, breastPlate, leggings, boots, sword, dagger, apple, sandwich} = require("./items")

class Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped){
        this.name = name,
        this.health = health,
        this.hunger = hunger;
        this.weaponEquipped = weaponEquipped,
        this.armorEquipped = armorEquipped
    }
    giveDamage(amount, player){player.takeDamage(amount)}
    takeDamage(amount){this.health -= amount}
    heal(amount){for(let i = 0; i <= amount && this.health < 100; i++){this.health++;}}
    equipWeapon(weapon){this.weaponEquipped = weapon;}
    unequipWeapon(){this.weaponEquipped = undefined}
    pickUpItem(item){this.inventory.push(item)}
    dropItem(itemId){this.inventory.forEach((ele, i) => {if (ele.id === itemId){this.inventory.splice(i,1)}})}
    eat(food){
        if (food instanceof Food) {
            if (this.inventory.includes(food)){
                for (let i = 0; i <= food.hungerPoints && this.hunger < 100; i++){this.hunger++}
                for (let i = 0; i <= food.healthPoints && this.health < 100; i++){this.health++}
                this.dropItem(food.id)
            }else {
                console.log(`You can only eat food that you have picked up.`)
            }
        }else {
            console.log(`${food.name} is not food.`)
        }
    }
}


class Player extends Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped, inventory = []){
        super(name, health, hunger, weaponEquipped, armorEquipped)
        this.inventory = inventory;
    }
}



const ben = new Player("Ben", 100, 100);
const bob = new Player("Bob", 100, 100);
console.log(ben)
bob.giveDamage(20, ben);
ben.pickUpItem(apple)
console.log(ben)
ben.pickUpItem(sword)
ben.eat(apple)
ben.eat(sword)

// console.log(ben)
// console.log("pause")
// ben.dropItem("apple01")
// ben.heal(25)
console.log(ben.inventory)
console.log(ben)
