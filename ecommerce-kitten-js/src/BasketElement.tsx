import { SyntheticEvent, useRef} from "react";
import {addCat, removeCat} from "./BasketService.ts";

export interface BasketElementParams {
    quantity: number;
    breed: string;
    price:number
    currency: string;
    id:string;
}

export const BasketElement = (element: BasketElementParams) => {
    const catRef = useRef<HTMLButtonElement>(null)
    const addHandler = (event:SyntheticEvent) => {
        const target = event.target as HTMLButtonElement;
        addCat(target.dataset.id ?? "")
    }
    const removeHandler = (event:SyntheticEvent) => {
        const target = event.target as HTMLButtonElement;
        removeCat(target.dataset.id ?? "")
    }
    return(
      <tr>
          <th scope="row">{element.quantity}</th>
          <td>{element.breed}</td>
          <td>{element.price}{element.currency}</td>
          <td>
              <button className="btn cart border border-success" ref={catRef}
                      onClick={addHandler} data-id={element.id}>+</button>
          </td>
          <td>
              <button className="btn cart border-danger" ref={catRef}
                      onClick={removeHandler} data-id={element.id}>-</button>
          </td>
      </tr>
  )
}