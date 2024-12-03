import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";
import ICONS from "../assets/constants/icons";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

const MainLayout = () => {
  const location = useLocation();
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
      <nav className={`flex justify-between bg-zinc-900 text-white py-4 fixed top-0 left-0 w-full z-50`}>
        <h3 className="hidden md:block ml-4 text-3xl">Fitness Tracker</h3>
        <div className="flex md:hidden">
          <ICONS.HAMBURGER
            className={`text-xl cursor-pointer mr-4 mt-1 ml-2 ${isOpen ? "hidden" : "block"}`}
            onClick={toggleDrawer}
          />
          <h3 className="text-1xl mt-1 ml-2">Fitness Tracker</h3>
        </div>
        <ul className="hidden md:flex">
          <li className="mr-6 mt-1 text-lg cursor-pointer">
            <ScrollLink to="home" smooth={true} duration={500}>
              Home
            </ScrollLink>
          </li>
          <li className="mr-6 mt-1 text-lg cursor-pointer">
            <ScrollLink to="contact-info" smooth={true} duration={500}>
              Contacts
            </ScrollLink>
          </li>
          <li className="mr-6 mt-1 text-lg cursor-pointer">
            <ScrollLink to="services" smooth={true} duration={500}>
              Services
            </ScrollLink>
          </li>
          <li className="mr-6 mt-1 text-lg cursor-pointer">
            <ScrollLink to="about" smooth={true} duration={500}>
              About
            </ScrollLink>
          </li>
          <li className="mr-6 ml-6 text-lg mt-1">
            <a
              href="https://github.com/fizahere/BoilerPlate"
              target="blank"
              className="border-white border-2 rounded-full px-3 py-2"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleDrawer}
      >
        <div
          className={`fixed top-0 p-5 left-0 h-full w-64 bg-zinc-900 text-white text-black transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between md:hidden">
            <h3 className="text-1xl">Fitness Tracker</h3>
            <ICONS.CLOSE
              className={`text-1xl mt-1 cursor-pointer ${isOpen ? "block" : "hidden"}`}
              onClick={toggleDrawer}
            />
          </div>
          <ul className="mt-10">
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <ScrollLink onClick={toggleDrawer} to="home" smooth={true} duration={500}>
                Home
              </ScrollLink>
            </li>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <ScrollLink onClick={toggleDrawer} to="contact-info" smooth={true} duration={500}>
                Contacts
              </ScrollLink>
            </li>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <ScrollLink onClick={toggleDrawer} to="services" smooth={true} duration={500}>
                Services
              </ScrollLink>
            </li>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <ScrollLink onClick={toggleDrawer} to="about" smooth={true} duration={500}>
                About
              </ScrollLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <Element name="socials" id="socials">
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

      <div className="border-t-2 border-zinc-800 bg-zinc-900">
        <p> </p>
      </div>
    </div>
  );
};

export default MainLayout;
