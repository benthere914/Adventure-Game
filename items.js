

class ParentItem{
    constructor(name, value, id){
        this.name = name;
        this.value = value;
        this.id = id;
    }

}

class Food extends ParentItem{
    constructor(name, value, id, healthPoints, hungerPoints){
        super(name, value, id)
        this.healthPoints = healthPoints;
        this.hungerPoints = hungerPoints;
    }
}

class CombatItem extends ParentItem{
    constructor(name, value, id, durability, useable, type){
        super(name, value, id);
        this.durability = durability;
        this.useable = useable;
        this.type = type;
    }
    loseDurabilty(amount){
        for(let i = 0; i <= amount && this.durability > 0; i++){this.durability--;}
        if(this.durability === 0) this.break()
    }
    break(){
        this.useable = false;
    }
    restore(){this.useable = true;}
}

class Weapon extends CombatItem{
    constructor(name, value, id, durability, useable, damage, type){
        super(name, value, id, durability, useable, type);
        this.damage = damage;
    }

}

class Armor extends CombatItem{
    constructor(name, value, id, durability, useable, protection, type){
        super(name, value, id, durability, useable, type)
        this.protection = protection;
    }
}

const helmet = new Armor("Iron Helmet", 25, "h01" ,75, true, "helmet", 30);
const breastPlate = new Armor("Iron Breast Plate", 35, "bp01", 75, true, "breastPlate", 55);
const leggings = new Armor("Iron Leggings", 30, "l01" ,75, true, "leggings", 40);
const boots = new Armor("Iron Boots", 25, "b01", 75, true, "boots", 20);

const sword = new Weapon("Iron Sword", 80, "s01", 75, true, 10, "sword");
const dagger = new Weapon("Iron Dagger", 15, "d01", 75, true, 5, "dagger");

const apple = new Food("Red Apple", 2, "apple01", 1, 2);
const sandwich = new Food("BLT", 3.5, "sandwich01", 2, 4)

module.exports = {ParentItem, Food, CombatItem, Weapon, Armor, helmet, breastPlate, leggings, boots, sword, dagger, apple, sandwich }
