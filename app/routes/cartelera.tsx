import type { Route } from "./+types/cartelera";
import CarteleraPage  from '../cartelera/cartelera';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Cine HolaQueHace - Cartelera" },
        { name: "description", content: "Cartelera de películas" },
    ];
}

export default function Cartelera() {
    return <CarteleraPage />
}