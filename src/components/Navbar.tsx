import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

const Nav = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  const location = useLocation();

  const links = [
    { text: "Menu", to: "/menu" },
    { text: "Pembelian", to: "/transaksi" },
  ];

  const activeClass = "text-white bg-blue-700";
  const inactiveClass = "text-white hover:text-white hover:bg-blue-700";

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0 text-white font-bold flex gap-4">
              <div>
                <Link to="/menu">Los Polos Hermanos</Link>
                {isLoggedIn &&
                  links.map((link) => (
                    <Link
                    key={link.text}
                    to={link.to}
                    className={`px-3 py-2 rounded-md text-sm font-medium ml-4 ${
                      location.pathname === link.to
                      ? activeClass
                      : inactiveClass
                    } `}
                    >
                      {link.text}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-6">
                {isLoggedIn ? (
                  <>
                    <div>
                      <button
                        className="text-white max-w-xs hover:text-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <a href="/cart">
                    <img
                      src="/cart.svg"
                      alt="Cart"
                      className="w-6 hover:scale-105"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
