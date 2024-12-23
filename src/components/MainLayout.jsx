import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";
import ICONS from "../assets/constants/icons";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import { AuthServices } from "../services/authServices";

const MainLayout = ({ setIsAuthenticated }) => {
  const token = localStorage.getItem('token')
  const location = useLocation();
  const matchProfile = useMatch('/visit-profile/:id');
  const matchSettings = useMatch('/explore');

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <nav className={`flex justify-between bg-white text-black py-4 fixed top-0 left-0 w-full z-50`}>
        <h3 className="hidden md:block ml-4 text-3xl font-serif">Fitness Tracker</h3>
        <div className="flex md:hidden">
          <ICONS.HAMBURGER
            className={`text-xl cursor-pointer mr-4 mt-1 ml-2 ${isOpen ? "hidden" : "block"}`}
            onClick={toggleDrawer}
          />
          <h3 className="text-1xl mt-1 ml-2">Fitness Tracker</h3>
        </div>
        <ul className="hidden md:flex">
          <ScrollLink to="home" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                Home
              </Link>
            </li>
          </ScrollLink>
          <ScrollLink to="contact-info" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                Contact
              </Link>
            </li>
          </ScrollLink>
          <ScrollLink to="services" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                Services
              </Link>
            </li>
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                About
              </Link>
            </li>
          </ScrollLink>
          <li className="mr-6 mt-1 text-lg cursor-pointer">
            <Link to="/explore">
              Explore
            </Link>
          </li>
        </ul>
        <div className="mr-6 ml-6 text-lg mt-1">
          {token ?
            <li
              className="flex items-center text-lg cursor-pointer"
              onClick={() => {
                AuthServices.logout({ setIsAuthenticated });
                navigate('/')
              }}
            >
              Logout
            </li>
            :
            <Link to="/login">
              Login
            </Link>
          }
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleDrawer}
      >
        <div
          className={`fixed top-0 p-5 left-0 h-full w-64 bg-white text-black transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between md:hidden">
            <h3 className="text-1xl font-serif">Fitness Tracker</h3>
            <ICONS.CLOSE
              className={`text-1xl mt-1 cursor-pointer ${isOpen ? "block" : "hidden"}`}
              onClick={toggleDrawer}
            />
          </div>
          <ul className="mt-10">
            <ScrollLink onClick={toggleDrawer} to="home" smooth={true} duration={500}>
              <li className="mr-6 mt-1 text-lg cursor-pointer">
                <Link to="/">
                  Home
                </Link>
              </li>
            </ScrollLink>
            <ScrollLink onClick={toggleDrawer} to="contact-info" smooth={true} duration={500}>
              <li className="mr-6 mt-1 text-lg cursor-pointer">
                <Link to="/">
                  Contact
                </Link>
              </li>
            </ScrollLink>
            <ScrollLink onClick={toggleDrawer} to="services" smooth={true} duration={500}>
              <li className="mr-6 mt-1 text-lg cursor-pointer">
                <Link to="/">
                  Services
                </Link>
              </li>
            </ScrollLink>
            <ScrollLink onClick={toggleDrawer} to="about" smooth={true} duration={500}>
              <li className="mr-6 mt-1 text-lg cursor-pointer">
                <Link to="/">
                  About
                </Link>
              </li>
            </ScrollLink>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link onClick={toggleDrawer} to="/explore">
                Explore
              </Link>
            </li>
          </ul>
          <div className="text-white text-center text-md rounded-full py-2 w-full mt-8 bg-[#262135]">
            {token ?
              <li
                className="flex items-center text-lg cursor-pointer"
                onClick={() => {
                  AuthServices.logout({ setIsAuthenticated });
                  navigate('/')
                }}
              >
                Logout
              </li>
              :
              <Link to="/login">
                Login
              </Link>
            }
          </div>
        </div>
      </div>

      <div className="mt-16">

        {(matchProfile || matchSettings) && <Outlet />}
        <div className={`${(location.pathname === '/explore' || location.pathname.startsWith('/visit-profile/')) ? 'hidden' : 'block'}`}>
          <Element name="home" id="home">
            <Home />
          </Element>
          <Element name="about" id="about">
            <About />
          </Element>

          <Element name="services" id="services">
            <Services />
          </Element>

          <Element name="contact-info" id="contact-info">
            <Contact />
          </Element>
        </div>
      </div>

      <div className="lg:px-40 px-4 py-20 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <h3 className="text-1xl md:text-2xl font-bold font-serif">Fitness Tracker</h3>
            <p className="text-zinc-600 mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, suscipit?</p>
          </div>
          <div>
            <ul>
              <li className="text-lg mb-4">Contacts</li>
              <li className="text-zinc-600">0312 232 2343</li>
              <li className="text-zinc-600">fitnessTracker@gmail.com</li>
              <li className="text-zinc-600">fitness-tracker.pk</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-lg mb-4">Privacy Policy</li>
              <li className="text-zinc-600">settings</li>
              <li className="text-zinc-600">about</li>
              <li className="text-zinc-600">privacy</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-lg mb-4">FAQ</li>
              <li className="text-zinc-600">home</li>
              <li className="text-zinc-600">contact</li>
              <li className="text-zinc-600">about</li>
            </ul>
          </div>
          <div>
            <button className="bg-black rounded-full text-white w-full py-3">Explore</button>
            <div className="flex justify-evenly mt-4">
              <i className="text-2xl bg-lime-300 rounded-full p-4 cursor-pointer"><ICONS.MEAL /></i>
              <i className="text-2xl bg-lime-300 rounded-full p-4 cursor-pointer"><ICONS.CHART2 /></i>
              <i className="text-2xl bg-lime-300 rounded-full p-4 cursor-pointer"><ICONS.LOCATION /></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
