import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("cartelera", "routes/cartelera.tsx"),
    route("reservas", "routes/reservas.tsx"),
] satisfies RouteConfig;
