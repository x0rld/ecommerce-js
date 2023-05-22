Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

const cart = new Map(localStorage.getObj('cart')) ?? new Map()
const kittyList = []
init()

function displayKitties(filter) {
    document.querySelector('#kitty-container').innerHTML = ""
    let money
    if (navigator.language === "fr-FR")
        money = "€"
    else
        money = "$"
    synchronizeStock()
    for (const kitty of kittyList) {
        if (filter !== undefined && kitty.gender !== filter)
            continue
        console.log(kitty.name + ": " + kitty.quantity);
        if (kitty.quantity === 0)
            continue
        const kittyCard =
            `<div class="card m-3 col-md-4" style="width: 400px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${kitty.src}" class="img-fluid rounded-start kitty" alt="this is a cat">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Nom: ${kitty.name}</h5>
                <p class="card-text">Race: ${kitty.breed}</p>
                <p class="card-text">Prix: ${kitty.price}${money}</p>
                <p class="card-text">Quantité: ${kitty.quantity}</p>
                <p class="card-text">Genre: <i class="bi ${kitty.gender}"></i></p>
                    <button class="btn btn-primary buy" data-id="${kitty.id}">Ajouter au panier</button>
            </div>
        </div>
    </div>
</div>`
        document.querySelector('#kitty-container').innerHTML += kittyCard
    }
    for (const button of document.getElementsByClassName('buy')) {
        button.removeEventListener('click',addToBasket)
        button.addEventListener('click', addToBasket)
    }
}

function init() {
    kittyList.push({
        name: "Mew",
        breed: "Bengal",
        price: 1000,
        gender: "bi-gender-male",
        id: "7c4f2b75-f5f5-4810-ada1-a11e85460e52",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Olive",
        breed: "American Curl",
        price: 500,
        gender: "bi-gender-male",
        id: "aaa079d2-acd7-4aa7-96d1-84e543db4ce2",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "liana",
        breed: "American Bobtail",
        price: 400,
        gender: "bi-gender-male",
        id: "e0c1e50a-0ec6-4241-9e55-064b0ef1e8e1",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Licorice",
        breed: "Abyssinian Cat",
        price: 352,
        gender: "bi-gender-male",
        id: "a5a5d541-953d-43c6-a226-f2487b218b36",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Licorne",
        breed: "Balinese-Javanese",
        price: 156,
        gender: "bi-gender-male",
        id: "806d2c64-69ac-447d-a062-9433a2961c07",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Tic Tac",
        breed: "American Wirehair",
        price: 485,
        gender: "bi-gender-female",
        id: "e4da3468-0661-4556-85cc-cf2526eeb39c",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Toc",
        breed: "American Shorthair ",
        price: 489,
        gender: "bi-gender-female",
        id: 'b08aa170-34f5-4368-a5be-eaa7ca9f97b3',
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Freya",
        breed: "Chartreux",
        price: 565,
        gender: "bi-gender-female",
        id: "f485ea35-3634-4a35-ae3a-fdaa975152cf",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    kittyList.push({
        name: "Princess",
        breed: "Birman",
        price: 152,
        gender: "bi-gender-female",
        id: "bef10360-1d85-4097-9fa1-becf22613668",
        quantity: 2,
        src: "https://placekitten.com/g/200/300"
    })
    displayKitties()
}

function addToBasket(element) {
    for (const kitty of kittyList) {
        if (kitty.id === element.target.dataset['id']) {
            if (!cart.has(kitty.id)) {
                console.log("il n'est pas dans la liste")
                kitty.quantity--
                console.log(kitty)
                cart.set(kitty.id, 1)
                console.log(cart.get(kitty.id))
            } else if (kitty.quantity > 0) {
                kitty.quantity--
                console.log(kitty)
                cart.set(kitty.id, cart.get(kitty.id) + 1)
                console.log(cart.get(kitty.id))
                console.log("OK");
            }
        }
    }
    console.log(cart)
    localStorage.setObj('cart', Array.from(cart))
    displayKitties()
}

function removeOneItem(element) {
    for (const kitty of kittyList) {
        if (kitty.id === element.target.dataset['id']) {
            if (kitty.quantity < 2) {
                kitty.quantity++
                cart.set(kitty.id, cart.get(kitty.id) - 1)
                if (cart.get(kitty.id) === 0)
                    cart.delete(kitty.id)
                if (Array.from(cart.keys()).length === 0) {
                    localStorage.removeItem('cart')
                    return
                }
                localStorage.setObj('cart', Array.from(cart))
                displayKitties()
                break
            }
        }
    }
}

function displayCart() {
    let money
    if (navigator.language === "fr-FR")
        money = "€"
    else
        money = "$"
    const priceElement = document.getElementById('caption')
    const body = document.getElementById('modal-data')
    body.innerHTML = ""
    let totalPrice = 0
    for (const [item, quantity] of cart) {
        console.log(`vous avez dans votre panier ${quantity} chats ${getKittyFromId(item).breed}`)
        body.innerHTML +=
            `  <tr>
                    <th scope="row">${quantity}</th>
                    <td>${getKittyFromId(item).breed}</td>
                    <td>${getKittyFromId(item).price}${money}</td>
                    <td><button class="btn cart border border-success" data-id="${getKittyFromId(item).id}">+</button></td>
                    <td><button class="btn cart border-danger" data-id="${getKittyFromId(item).id}">-</button></td>
               </tr>
            `
        totalPrice += quantity * getKittyFromId(item).price
    }
    eventCartButtons()
    priceElement.textContent = `prix total: ${totalPrice}${money}`
}

function eventCartButtons() {
    for (const el of document.getElementsByClassName("cart")) {
        el.addEventListener('click',
            (e) => {
                if (el.textContent === "+") {
                    addToBasket(e)
                    console.log(e)
                    console.log("plus")
                    displayCart()
                    return
                }
                console.log(e)
                console.log("moins")
                removeOneItem(e)
                displayCart()
            }
        )
    }
}

document.getElementById('reset').addEventListener('click',
    () => {
    console.log("help")
        for (const kitty of kittyList) {
            if (Array.from(cart.keys()).includes(kitty.id)) {
     //           console.log(kitty.id)
                kitty.quantity = cart.get(kitty.id)
            }
        }
        cart.clear()
        localStorage.removeItem('cart')
        displayKitties()
    })
document.getElementById('show-modal').addEventListener("click", displayCart)

for (const sortButton of document.getElementsByClassName('bi-filter')) {
    sortButton.addEventListener('click',
        (e) => {
            if (e.target.textContent === "femelle")
                displayKitties("bi-gender-female")
            else if (e.target.textContent === "réinitialiser")
                displayKitties()
            else
            displayKitties("bi-gender-male")
        })
}

function synchronizeStock() {
    console.log(cart)
    for (const kitty of kittyList) {
        if (Array.from(cart.keys()).includes(kitty.id)) {
            kitty.quantity = 2 - cart.get(kitty.id)
        }
    }
}

function getKittyFromId(id) {
    for (const kitty of kittyList) {
        if (kitty.id === id) {
            return kitty
        }
    }
}