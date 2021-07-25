

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

module.exports = {ParentItem, Food, CombatItem, Weapon, Armor}
