let inventory = []
let dataBase
let inventorySize = 9

class ItemSlot {
    constructor(id, quantity){
        this.id = id
        this.quantity = quantity
    }
}

jsonReader('database.json')

function inventoryInitializer (size) {
    let count = 0
    while(count < size){
        let id = parseInt(Math.random() * dataBase.length)
        let quantity = parseInt(Math.random() * dataBase[id].maxQuantity)
        quantity = quantity == 0 ? 1 : quantity
        inventory.push(new ItemSlot(id, quantity))
        count++
    }
    inventoryRender()
}

function jsonReader (jsonFile) {
    var oXHR = new XMLHttpRequest();

    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET", jsonFile, true);
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4)
        {
            dataBase = JSON.parse(this.responseText);
            inventoryInitializer(inventorySize)
        }
    }
}

function inventoryRender () {
    for(let i = 0; i < inventory.length; i++){
        let slot = document.querySelector(`#slot-${i}`)
        let img = slot.querySelector('.icon')
        img.src = `media/${dataBase[inventory[i].id].iconSrc}.svg`
        let qnt = slot.querySelector('.quantity')
        qnt.innerText = inventory[i].quantity
    }
}