const {ParentItem, Food, CombatItem, Weapon, Armor, helmet, breastPlate, leggings, boots, sword, dagger, apple, sandwich} = require("./items")

class Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped, damageResistance){
        this.name = name,
        this.health = health,
        this.hunger = hunger;
        this.weaponEquipped = weaponEquipped,
        this.armorEquipped = armorEquipped,
        this.damageResistance = damageResistance
    }

    allDamageResistance = () => armorEquipped.reduce((totalDamageResistance, armorPiece) => {return totalDamageResistance + armorPiece.protection}, 0)

    giveDamage(amount, player){player.takeDamage(amount)}
    takeDamage(amount){this.health -= amount}
    eat(food){
        if (food instanceof Food) {
            if (this.inventory.includes(food)){
                this.restoreHealth(food.healthPoints);
                this.restoreHunger(food.hungerPoints);
                this.dropItem(food.id);
            }else {
                console.log(`You can only eat food that you have picked up.`)
            }
        }else {
            console.log(`${food.name} is not food.`)
        }
    }
    restoreHealth(amount){for(let i = 0; i <= amount && this.health < 100; i++){this.health++;}}
    restoreHunger(amount){for(let i = 0; i <= amount && this.hunger < 100; i++){this.hunger++;}}

    equipWeapon(weapon){if (this.inventory.includes(weapon)){this.weaponEquipped = weapon;}}
    unequipWeapon(){this.weaponEquipped = undefined}
    equipArmor(armorPiece, index){
        if(this.inventory.includes(armorPiece)){
            this.armorEquipped[index] = armorPiece;}
        else {
            console.log(`The ${armorPiece.name} is not in your inventory`)}}
    unequipArmor(index){this.armorEquipped[index] = undefined;}
    equip(item){
        if (item instanceof Weapon){
            if(this.weaponEquipped === item){
                this.unequipWeapon()
            }else {
                this.unequipWeapon()
                this.equipWeapon(item)
            }
        }
        else if (item instanceof Armor){
            if(this.weaponEquipped === item){
                if (item.type === "helmet"){this.unequipArmor(0)}
                if (item.type === "breastPlate"){this.unequipArmor(1)}
                if (item.type === "leggings"){this.unequipArmor(2)}
                if (item.type === "boots"){this.unequipArmor(3)}
            }else {
                if (item.type === "helmet"){this.equipArmor(item, 0)}
                if (item.type === "breastPlate"){this.equipArmor(item, 1)}
                if (item.type === "leggings"){this.equipArmor(item, 2)}
                if (item.type === "boots"){this.equipArmor(item, 3)}
            }
        }
    }
}


class Player extends Character{
    constructor(name, health, hunger, weaponEquipped, armorEquipped = [undefined, undefined, undefined, undefined], inventory = [], damageResistance){
        super(name, health, hunger, weaponEquipped, armorEquipped, damageResistance);
        this.inventory = inventory;
    }
    pickUpItem(item){this.inventory.push(item)}
    dropItem(itemId){this.inventory.forEach((ele, i) => {if (ele.id === itemId){this.inventory.splice(i,1)}})}
}



const ben = new Player("Ben", 100, 100, [helmet, breastPlate, leggings, boots], [], this.allDamageResistance);
const bob = new Player("Bob", 100, 100);
// console.log()
console.log(ben)
// bob.giveDamage(20, ben);
// ben.pickUpItem(helmet)
// ben.pickUpItem(breastPlate)
// ben.pickUpItem(leggings)
// ben.pickUpItem(boots)

// ben.pickUpItem(sword)
// console.log(ben);
// ben.equip(helmet);
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
