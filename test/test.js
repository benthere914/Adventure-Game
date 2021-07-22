const { expect } = require('chai');
const { sword } = require('../items');

const {Character, Player, World} = require('../main')

describe ("Basic Character Functionality", function () {
    beforeEach(() => {
        ben = new Player("ben", 100, 100);

    })
    it("players inventory should have a sword after picked up",
    function () {
        ben.pickUpItem(sword)
        expect(ben.inventory).to.deep.include(sword)
    });

    it ("Players inventory should not have a sword after it is dropped",
    function () {
        ben.pickUpItem(sword)
        ben.dropItem(sword);
        expect(ben.inventory).to.not.deep.include(sword)
    });
    it ("player should have sword equipped after invoking the method to equip the sword",
    function () {
        ben.pickUpItem(sword);
        ben.equip(sword);
        expect(ben.weaponEquipped).to.deep.equal(sword)
    }
    );
    it ("player should not have weapon if you drop the weapon that was equipped",
    function () {
        ben.pickUpItem(sword);
        ben.equip(sword);
        ben.dropItem(sword);
        expect(ben.inventory).to.not.include(sword);
        expect(ben.weaponEquipped).to.not.deep.equal(sword);
    });


    








})
