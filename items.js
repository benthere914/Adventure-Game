

class ParentItem{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
    
}

class Food extends ParentItem{
    constructor(name, value, healthPoints, hungerPoints){
        super(name, value)
        this.healthPoints = healthPoints;
        this.hungerPoints = hungerPoints;
    }
}

class CombatItem extends ParentItem{
    constructor(name, value, durability, useable){
        super(name, value);
        this.durability = durability;
        this.useable = useable;
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
    constructor(name, value, durability, useable, damage){
        super(name, value, durability, useable);
        this.damage = damage;
    }
    
}

class Armor extends CombatItem{
    constructor(name, value, durability, useable, protection){
        super(name, value, durability, useable)
        this.protection = protection;
    }
}

const helmet = new Armor("Iron Helmet", 25, 75, true, 30);
const breastPlate = new Armor("Iron Breast Plate", 35, 75, true, 55);
const leggings = new Armor("Iron Leggings", 30, 75, true, 40);
const boots = new Armor("Iron Boots", 25, 75, true, 20);

const sword = new Weapon("Iron Sword", 80, 75, true, 10);
const dagger = new Weapon("Iron Dagger", 15, 75, true, 10);

const apple = new Food("Red Apple", 2, 1, 2);
const sandwich = new Food("BLT", 3.5, 2, 4)

module.exports = { helmet, breastPlate, leggings, boots, sword, dagger, apple, sandwich }