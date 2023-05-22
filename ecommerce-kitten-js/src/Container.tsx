import {KittyCard} from "./KittyCard.tsx";
import {useEffect, useState} from "react";
import {IKitty} from "./Kitten.ts";
import {getAllKitten} from "./GetKitten.ts";

export const Container = () => {
    const [data, setData] = useState(new Array<IKitty>());
    useEffect(() => {
        (async () => {
            const kitten = await getAllKitten()
            setData(kitten)
        })();
    }, []);
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="kitty-container">
            {data.map((kitty) =>
                <KittyCard {...kitty} key={kitty.id}></KittyCard>
            )}
        </div>
    );
}