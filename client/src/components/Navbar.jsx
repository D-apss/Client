import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function doLogout() {
    localStorage.clear();
    navigate("login");
  }

  return (
    <section>
      <nav className="px-4 sm:px-10 py-1 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="w-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-auto mr-14">
                <Link to="/">
                  <img src="acros-assets/logo/logo-acros-white.svg" alt="" />
                </Link>
              </div>
              <div className="w-auto hidden lg:block">
                <ul className="flex items-center">
                  <li className="font-heading mr-12 text-white hover:text-gray-200">
                    <Link to="#">ewe</Link>
                  </li>
                  <li className="font-heading mr-12 text-white hover:text-gray-200">
                    <Link to="#">Bebas</Link>
                  </li>
                  <li className="font-heading mr-12 text-white hover:text-gray-200">
                    <Link to="#">isi apa aja</Link>
                  </li>
                  <li className="font-heading mr-12 text-white hover:text-gray-200">
                    <Link to="#">Isi terserah</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-auto hidden lg:flex items-center">
            <a
              className="inline-block mr-12 font-heading font-medium text-base text-white hover:text-gray-200"
              href="#"
            >
              Log in
            </a>
            <button
              onClick={doLogout}
              className="inline-block py-4 px-8 font-heading font-medium text-base text-white bg-green-500 hover:bg-green-600 border border-green-500 hover:border-green-600 rounded-sm transition duration-200"
            >
              Logout
            </button>
          </div>
          <div className="w-auto lg:hidden">
            <a
              className="navbar-burger inline-flex w-14 h-14 justify-center items-center bg-gray-500 hover:bg-gray-600 rounded-full"
              href="#"
            >
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9H1M19 1H1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
}
