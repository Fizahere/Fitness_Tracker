import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";
import ICONS from "../assets/constants/icons";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import { AuthServices } from "../services/authServices";
import Features from "../pages/Features";
import { UserServices } from "../services/userServices";
import { useQuery } from "react-query";
import { getUserIdFromToken } from "../services/authServices";
import FeedbackForm from "../pages/Feedback";
import FAQPage from "../pages/Faq";

const loggedInUserId = getUserIdFromToken(localStorage.getItem('token'));

const MainLayout = ({ setIsAuthenticated }) => {
  const token = localStorage.getItem('token')
  const location = useLocation();
  const matchProfile = useMatch('/visit-profile/:id');
  const matchSettings = useMatch('/explore');
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState(null);

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
  const { data: searchedUsers, isLoading: searchLoading, isError: searchError, refetch } = useQuery(
    ['searched-users-data', searchQuery],
    () => UserServices.searchUser(searchQuery),
    {
      onSuccess: () => { setIsSearch(true) },
      onError: (err) => {
        setIsSearch(true)
        if (err.message === 'Request failed with status code 404') {
          setError(`no results for '${searchQuery}'`)
        }
      },
      enabled: false,
    }
  );
  console.log(searchedUsers, 'searched users')
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearch(false)
      return;
    }
    refetch();
  };

  return (
    <div>
      <nav className={`flex justify-between bg-white text-black py-4 fixed top-0 left-0 w-full z-10`}>
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex items-center ml-4 text-3xl">
            <i><ICONS.LOGO /></i>
            <ScrollLink to="home" smooth={true} duration={500}>
              <p className="ml-2 mt-1 text-md cursor-pointer font-serif text-black">
                <Link to="/">
                  Fitness Tracker
                </Link>
              </p>
            </ScrollLink>
          </div>
          <div className="flex md:hidden">
            <ICONS.HAMBURGER
              className={`text-xl cursor-pointer mr-4 mt-1 ml-2 ${isOpen ? "hidden" : "block"}`}
              onClick={toggleDrawer}
            />
            <div className="flex items-center mt-1 ml-2 text-xl">
              <i><ICONS.LOGO /></i>
              <ScrollLink to="home" smooth={true} duration={500}>
                <p className="ml-2 mt-1 text-md cursor-pointer font-serif text-black">
                  <Link to="/">
                    Fitness Tracker
                  </Link>
                </p>
              </ScrollLink>
            </div>
          </div>
          <div className="relative ml-14 my-4 md:my-0">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search friends..."
                className='border-2 border-black p-2 rounded-full w-72 md:mr-4'
              />
              <button type="submit" className='absolute right-6 text-lg top-3'>
                {searchLoading ? <ICONS.LOADING className='animate-spin' /> : <ICONS.SEARCH />}
              </button>
            </form>
          </div>
        </div>
        <ul className="hidden md:flex">
          <ScrollLink to="home" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                Home
              </Link>
            </li>
          </ScrollLink>
          <ScrollLink to="features" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                Features
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
          <ScrollLink to="services" smooth={true} duration={500}>
            <li className="mr-6 mt-1 text-lg cursor-pointer">
              <Link to="/">
                Services
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
        className={`fixed z-20 inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleDrawer}
      >
        <div
          className={`fixed shadow-2xl shadow-black top-0 p-5 left-0 h-full w-64 bg-white text-black transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between md:hidden">
            <div className="flex items-center text-xl">
              <i><ICONS.LOGO /></i>
              <ScrollLink to="home" smooth={true} duration={500}>
                <p className="ml-2 mt-1 text-md cursor-pointer font-serif text-black">
                  <Link to="/">
                    Fitness Tracker
                  </Link>
                </p>
              </ScrollLink>
            </div>
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
            <ScrollLink onClick={toggleDrawer} to="features" smooth={true} duration={500}>
              <li className="mr-6 mt-1 text-lg cursor-pointer">
                <Link to="/">
                  Features
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

      {isSearch ?
        <div className="mt-28 min-h-screen">
          <h3 className="text-2xl font-bold ml-4">Searched Results</h3>
          {searchedUsers ? searchedUsers.map((singleData, index) => (
            <div
              key={index}
              className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center">
                  <img
                    src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData?.profileImage}`}
                    className="rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
                    alt="profile image"
                  />
                  <p className="font-bold text-black ml-2 text-sm">{singleData?.username}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <button className="border-2 border-black bg-lime-300 w-24 text-sm py-1 rounded-lg"
                  onClick={() => {
                    if ((singleData?.followers || []).includes(loggedInUserId)) {
                      unfollowUserHandler(singleData?._id);
                    } else {
                      followUserHandler(singleData?._id);
                    }
                  }}
                >
                  {singleData?._id === loggedInUserId
                    ? 'Edit Profile'
                    : (singleData?.followers || []).includes(loggedInUserId)
                      ? 'UnFollow'
                      : 'Follow'
                  }
                </button>
              </div>
            </div>
          ))
            : searchLoading ? (
              <i className="flex justify-center">
                <ICONS.LOADING className="animate-spin text-2xl my-56" />
              </i>
            ) : (
              <div className="flex items-center justify-center text-xl w-screen">
                {error && <p>{error || error.message}</p>}
              </div>
            )}
        </div>
        :
        <div className="mt-16">

          {(matchProfile || matchSettings) && <Outlet />}
          <div className={`${(location.pathname === '/explore' || location.pathname.startsWith('/visit-profile/')) ? 'hidden' : 'block'}`}>
            <Element name="home" id="home">
              <Home />
            </Element>
            <Element name="features" id="features">
              <Features />
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
            <Element name="faq" id="faq">
              <FAQPage />
            </Element>
            <Element name="feedback" id="feedback">
              <FeedbackForm />
            </Element>
          </div>
        </div>
      }

      <div className="lg:px-40 px-4 py-20 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <div className="flex items-center text-xl">
              <i><ICONS.LOGO fontSize={25} /></i>
              <ScrollLink to="home" smooth={true} duration={500}>
                <p className="ml-2 mt-1 text-md cursor-pointer font-serif text-black">
                  <Link to="/">
                    Fitness Tracker
                  </Link>
                </p>
              </ScrollLink>            </div>
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
              <ScrollLink to="faq" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                    FAQ
                  </Link>
                </li>
              </ScrollLink>
              <ScrollLink to="feedback" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                  Feedback
                  </Link>
                </li>
              </ScrollLink>
              <ScrollLink to="features" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                  Contact
                  </Link>
                </li>
              </ScrollLink>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-lg mb-4">Pages</li>
              <ScrollLink to="home" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                    Home
                  </Link>
                </li>
              </ScrollLink>
              <ScrollLink to="features" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                    Features
                  </Link>
                </li>
              </ScrollLink>
              <ScrollLink to="about" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                    About
                  </Link>
                </li>
              </ScrollLink>
              <ScrollLink to="services" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                    Services
                  </Link>
                </li>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <li className="text-zinc-600 mr-6 mt-1 text-md cursor-pointer">
                  <Link to="/">
                    Contact
                  </Link>
                </li>
              </ScrollLink>
            </ul>
          </div>
          <div>
              <Link to="/explore">
            <button className="bg-black rounded-full text-white w-full py-3">
                Explore
            </button>
              </Link>
            <div className="flex justify-evenly mt-4">
              <i className="text-2xl bg-lime-300 rounded-full p-4"><ICONS.MEAL /></i>
              <i className="text-2xl bg-lime-300 rounded-full p-4"><ICONS.CHART2 /></i>
              <i className="text-2xl bg-lime-300 rounded-full p-4"><ICONS.LOCATION /></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
