import type { Route } from "./+types/home";
import ReservasPage from "../reservas/ReservasView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cine HolaQueHace - Reservas" },
    { name: "description", content: "Administración de reservas" },
  ];
}
export default function Reservas() {
    return <ReservasPage />;
}