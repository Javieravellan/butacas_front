import type { Route } from "./+types/home";
import { Butacas } from "../butacas/butacas";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cine HolaQueHace" },
    { name: "description", content: "Administración de butacas" },
  ];
}

export default function Home() {
  return <Butacas />;
}
