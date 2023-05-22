import {IKitty} from "./Kitten.ts";
import {useRef} from "react";
import {addCat} from "./BasketService.ts";

export const KittyCard = (kitty: IKitty) => {
    const catRef = useRef<HTMLButtonElement>(null)
    const addHandler = (event: any) => {
        addCat(event.target.dataset.id)
    }
    let currency
    if (navigator.language === "fr-FR")
        currency = "€"
    else
        currency = "$"
    return <>
        <div className=" lg:h-full p-3 lg:w-11/12 rounded sm:flex md:flex lg:flex border-2">
            <div>
                <img src={kitty.src} alt="this is a cat" className="h-56"/>
            </div>
            <div className="mx-4">
                <div>
                    <h5 className="text-xl font-semibold my-2">Nom: {kitty.name}</h5>
                    <ul>
                        <li className="my-2">Race: {kitty.breed}</li>
                        <li className="my-2">Prix: {kitty.price}{currency}</li>
                        <li className="my-2">Quantité: {kitty.quantity}</li>
                        <li className="my-2">Genre: <i className={kitty.gender}></i></li>
                    </ul>
                    <button className="h-10 bg-sky-500 px-2 rounded my-5 buy" data-id={kitty.id} ref={catRef}
                            onClick={addHandler}>Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    </>
}