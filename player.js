const {ParentItem, Food, CombatItem, Weapon, Armor, helmet, breastPlate, leggings, boots, sword, dagger, apple, sandwich} = require("./items")

class Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped, weaponSelected){
        this.name = name,
        this.health = health,
        this.hunger = hunger;
        this.weaponEquipped = weaponEquipped,
        this.weaponSelected= weaponSelected,
        this.armorEquipped = armorEquipped
    }

    giveDamage(amount, player){player.takeDamage(amount)}
    takeDamage(amount){this.health -= amount}
    eat(food){
        if (food instanceof Food) {
            if (this.inventory.includes(food)){
                this.heal(food.hungerPoints, this.hunger);
                this.heal(food.healthPoints, this.health)
                // for (let i = 0; i <= food.hungerPoints && this.hunger < 100; i++){this.hunger++}
                // for (let i = 0; i <= food.healthPoints && this.health < 100; i++){this.health++}
                this.dropItem(food.id)
            }else {
                console.log(`You can only eat food that you have picked up.`)
            }
        }else {
            console.log(`${food.name} is not food.`)
        }
    }
    heal = (amount, type) => {for(let i = 0; i <= amount && type < 100; i++){type++;}}

    equipWeapon(weapon){
        if (!weapon) {weapon = this.weaponSelected}
        if (weapon instanceof Weapon) {
            if (this.inventory.includes(weapon)){
                this.weaponSelected = weapon;this.weaponEquipped = weapon;
            }else {console.log(`${weapon.name} is not in your inventory`)}
        }else {console.log(`${weapon.name} is not a weapon`)}
    }
    unequipWeapon(){this.weaponSelected = this.weaponEquipped; this.weaponEquipped = undefined}

    pickUpItem(item){this.inventory.push(item)}
    dropItem(itemId){this.inventory.forEach((ele, i) => {if (ele.id === itemId){this.inventory.splice(i,1)}})}


}


class Player extends Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped = [undefined, undefined, undefined, undefined], inventory = [], weaponSelected){
        super(name, health, hunger, weaponEquipped, armorEquipped, weaponSelected);
        this.inventory = inventory;
    }
}



const ben = new Player("Ben", 100, 100);
const bob = new Player("Bob", 100, 100);
console.log(ben.health)
bob.giveDamage(20, ben);
ben.pickUpItem(apple)
// ben.pickUpItem(sword)
console.log(ben.health)
ben.eat(apple)
// ben.eat(sword)
// ben.equipWeapon(sword)
console.log(ben.health)
// ben.unequipWeapon();
// console.log("pause")
// ben.dropItem("apple01")
// ben.heal(25)
// console.log(ben.inventory)
// console.log(ben)
