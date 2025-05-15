import { NavLink } from "react-router";

export default function Menu(props: any) {
    return (
        <nav className="bg-white rounded-xl overflow-hidden">
            <ul className="flex flex-wrap justify-center divide-x divide-gray-200">
                <li className="hover:bg-gray-50 transition duration-200">
                    <NavLink to="/" className="flex flex-col items-center p-5 min-w-[120px]">
                        <span className="font-medium text-gray-900">Butacas</span>
                    </NavLink>
                </li>

                <li className="hover:bg-gray-50 transition duration-200">
                    <NavLink to="/cartelera" className="flex flex-col items-center p-5 min-w-[120px]">
                        <span className="font-medium text-gray-900">Cartelera</span>
                    </NavLink>
                </li>

                <li className="hover:bg-gray-50 transition duration-200">
                    <NavLink to="/reservas" className="flex flex-col items-center p-5 min-w-[120px]">
                        <span className="font-medium text-gray-900">Reservas</span>
                    </NavLink>
                </li>

                {/*<li className="hover:bg-gray-50 transition duration-200">
                    <Link to="#" className="flex flex-col items-center p-5 min-w-[120px]">
                        <span className="font-medium text-gray-900">Otros</span>
                    </Link>
                </li>*/}
            </ul>
        </nav>
    );
}