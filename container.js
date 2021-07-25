class Container{
    constructor(x, y, z, capacity = 20, items = []){
        this.x = x,
        this.y = y,
        this.z = z,
        this.capacity = capacity
        this.items = items
    }
    addItem(item){
        this.items.push(item)
    }

    hasItem(item){
        return this.items.includes(item)
    }

}

class Door{
    constructor(width, height, x, y, z, locationOf, boundLocation){
        this.width = width,
        this.height = height,
        this.x = x,
        this.y = y,
        this.z = z,
        this.locationOf = locationOf,
        this.boundLocation = boundLocation
    }


}

module.exports = {Container, Door}