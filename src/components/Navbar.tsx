import { Menu, MountainSnow, User, X } from "lucide-react";
import { useState } from "react";
import { NavItems } from "../data/NavItems";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { logout } from "../store/slices/authSlices";
import Modal from "./Modal";
import AuthenticationModal from "../pages/Authentication/AuthenticationModal";
import { Link } from "react-router";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);
  const openAuthModal = () => {
    setOpenAuth(true);
    setIsNavOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 p-4  backdrop-blur-sm">
        <nav className="mx-auto max-w-7xl bg-white rounded-xl shadow-xl transition-all duration-300">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="shrink-0 flex items-center gap-2 cursor-pointer">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <MountainSnow className="w-5 h-5 text-white" />
                </div>
                <a
                  href="/"
                  className="text-2xl font-bold text-indigo-700 tracking-light"
                >
                  Nivaas<span className="text-gray-900">Hub</span>
                </a>
              </div>
              <div className="hidden lg:flex md:space-x-8 lg:space-x-10 items-center">
                {NavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out flex items-center"
                  >
                    <item.icon className="w-4 h-4 mr-2 opacity-70" />
                    {item.name}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/my-properties"
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-bold flex items-center gap-2"
                  >
                    My Properties
                  </Link>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:bg-indigo-700 transition-all">
                      <User w-7 h-7 />
                    </div>
                    <button
                      onClick={() => dispatch(logout())}
                      className="hidden lg:inline-flex items-center px-5 py-2 border border-violet-700 text-sm font-medium rounded-lg shadow-md text-violet-700 bg-gray-100 hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openAuthModal}
                    className="hidden lg:inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Log In
                  </button>
                )}

                <div className="lg:hidden">
                  <button
                    onClick={toggleNavbar}
                    type="button"
                    className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    {isNavOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isNavOpen && (
            <div className="lg:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {NavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsNavOpen(false)}
                    className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in"
                  >
                    <item.icon className="inline w-5 h-5 mr-3 text-indigo-500" />
                    {item.name}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/my-properties"
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-bold flex items-center gap-2"
                  >
                    My Properties
                  </Link>
                )}
              </div>
              <div className="flex items-center justify-center">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(logout(), setIsNavOpen(false))}
                      className="w-full mb-5 flex justify-center items-center px-4 py-3 border border-violet-700 text-base font-medium rounded-lg shadow-sm text-violet-700 bg-gray-100 hover:bg-violet-600 hover:text-white"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openAuthModal}
                    className="w-1/2 mb-5 flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gray-700 hover:bg-gray-600"
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
      <Modal isOpen={openAuth} onClose={() => setOpenAuth(false)}>
        <AuthenticationModal onClose={() => setOpenAuth(false)} />
      </Modal>
    </>
  );
};

export default Navbar;
