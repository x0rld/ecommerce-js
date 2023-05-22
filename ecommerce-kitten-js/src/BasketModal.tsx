import {BasketElement, BasketElementParams} from "./BasketElement.tsx";
import {IBasketService} from "./BasketService.ts";

//modalRef: React.MutableRefObject<HTMLDialogElement>
export const BasketModal = (basketService: IBasketService) => {
    const handleClose = () => {
       /*  const ref = modalRef.current;
         ref.close(); */
    }
    const handleClearBasket = () => {
        basketService.removeCat("5c60e26f-943f-4078-ad03-d2b8d17eb3c9")
    }
    const elements =[
        {
            quantity :1,
            breed:"toto",
            price:1,
            currency : navigator.language === "fr-FR" ? "€":"$",
            id : "5c60e26f-943f-4078-ad03-d2b8d17eb3c9"
        }
    ] as Array<BasketElementParams>
    let totalprice = 0;
    for (const element of elements) {
        totalprice +=element.price
    }
    return (
        // ref={modalRef}
        <dialog id="show-basket">
            <header className="text-xl">Panier</header>
            <div className="modal-body">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">nombre</th>
                        <th scope="col">race</th>
                        <th scope="col">prix</th>
                        <th scope="col">plus</th>
                        <th scope="col">moins</th>
                    </tr>
                    </thead>
                    <tbody id="modal-data">
                    {
                        elements.map((value) =>
                            <BasketElement {...value} key={value.id} />
                        )
                    }
                    </tbody>
                    <caption id="caption">prix total: {totalprice}{elements[0].currency}
                    </caption>
                </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Fermer
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleClearBasket}
                        id="reset">Tout supprimer
                </button>
            </div>
        </dialog>
    )
}