export interface IKitty {
    name: string
    breed: string
    price: number
    gender: string
    id: string
    quantity: number
    src: string
}

export class Kitten implements IKitty {
    breed: string;
    gender: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    src: string;

    constructor({name,breed, price,gender,id,quantity,src}: {
        breed: string,
        gender: string,
        id: string,
        name: string,
        price: number,
        quantity: number,
        src: string
    }) {
        this.breed = breed;
        this.gender = gender;
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.src = src;
    }
}
