const {Food, Weapon, Armor} = require("./items");
const {Player, Merchant} = require('./player');
const {WorldCell} = require('./world');

//players
const player1 = new Player("Ben", 100, 100);
const player2 = new Player("Bob", 100, 100);
const player3 = new Player("Bill", 100, 100);
const player4 = new Player("Bucky", 100, 100);

//merchants
const Merchant1 = new Merchant("Jack", 100, 100);
const Merchant2 = new Merchant("John", 100, 100);
const Merchant3 = new Merchant("Jill", 100, 100);

//areas
const area1 = new WorldCell("starting Area", 50, 50, 15);
const area2 = new WorldCell("Weapons Shop", 50, 50, 15);
const area3 = new WorldCell("Armor Shop", 50, 50, 15);
const area4 = new WorldCell("Food shop", 50, 50, 15);

//armor
const helmet = new Armor("Iron Helmet", 25, "h01" ,75, true, 30, "helmet");
const breastPlate = new Armor("Iron Breast Plate", 35, "bp01", 75, true, 55, "breastPlate");
const leggings = new Armor("Iron Leggings", 30, "l01" ,75, true, 40, "leggings");
const boots = new Armor("Iron Boots", 25, "b01", 75, true, 20, "boots");

//weapons
const sword = new Weapon("Iron Sword", 80, "s01", 75, true, 10, "close");
const dagger = new Weapon("Iron Dagger", 15, "d01", 75, true, 5, "both");
const fists = new Weapon("Just Regular punching fists", NaN, "fists", Infinity, true, 2, "close" );
const bow = new Weapon("Long Bow", 75, "lb01", 75, true, 5, "range");

//food
const apple = new Food("Red Apple", 2, "apple01", 1, 2);
const sandwich = new Food("BLT", 3.5, "sandwich01", 2, 4);

//init the play area
area1.addPortal(area2, area3, area4);
area2.addPortal(area1);
area3.addPortal(area1);
area4.addPortal(area1);

area1.addCharacters(player1, player2, player3, player4);
area2.addCharacters(Merchant1);
area3.addCharacters(Merchant2);
area4.addCharacters(Merchant3);

console.log(area1)
