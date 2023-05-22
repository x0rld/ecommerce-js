import {IKitty} from "./Kitten.ts";

export async function getAllKitten():Promise<Array<IKitty>> {
    return await (await fetch('http://localhost:5173/kitten.json')).json() as Array<IKitty>;
}