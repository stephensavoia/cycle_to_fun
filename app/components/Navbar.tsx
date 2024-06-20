import { Form, Link, useLocation, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SearchInputProps } from "~/root";

import React from "react";

const Navbar: React.FC<SearchInputProps> = ({
  mobileSearchInput,
  desktopSearchInput,
  drawerMenu,
}) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [searchParams] = useSearchParams();
  const searchInputValue = searchParams.get("q") || "";
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("/search")) {
      if (mobileSearchInput.current) {
        mobileSearchInput.current.value = "";
      }
      if (desktopSearchInput.current) {
        desktopSearchInput.current.value = "";
      }
    }
  }, [location.pathname]);

  const handleMobileInputChange = () => {
    if (desktopSearchInput.current) {
      desktopSearchInput.current.value = mobileSearchInput.current?.value || "";
    }
  };

  const handleDesktopInputChange = () => {
    if (mobileSearchInput.current) {
      mobileSearchInput.current.value = desktopSearchInput.current?.value || "";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const navbar = document.querySelector(".scroll-up");
      if (st > lastScrollTop) {
        if (navbar) {
          navbar.classList.remove("translate-y-0");
          navbar.classList.add("-translate-y-full");
        }
      } else {
        if (navbar) {
          navbar.classList.remove("-translate-y-full");
          navbar.classList.add("translate-y-0");
        }
      }
      setLastScrollTop(st <= 0 ? 0 : st); // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  function closeDrawer() {
    if (drawerMenu.current) {
      drawerMenu.current.click();
    }
  }

  return (
    <div
      className="drawer sticky scroll-up top-0"
      style={{ transition: "transform 0.3s" }}
    >
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerMenu}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div
          className="w-full max-w-6xl mx-auto navbar bg-base-100 grid grid-cols-3 items-center"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          <div className="hidden lg:block text-left">
            <ul className="menu menu-horizontal items-center">
              <li>
                <Form method="get" action="/search">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      ref={desktopSearchInput}
                      type="text"
                      name="q"
                      className="grow"
                      placeholder="Search"
                      defaultValue={searchInputValue}
                      onChange={handleDesktopInputChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </Form>
              </li>
            </ul>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="text-center">
            <Link to="/">
              <img
                className="logo"
                src="/img/logo.png"
                alt="Cycle TO Fun logo"
              />
            </Link>
          </div>
          <div className="hidden lg:block text-right">
            <ul className="menu menu-horizontal items-center">
              <li>
                <Link to="/random">RANDOM RIDE</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li>
                <Link to="/signup">SIGN UP</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li className="flex-row justify-end">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="btn btn-circle shadow-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </li>
          <li>
            <Form method="get" action="/search" onSubmit={closeDrawer}>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  ref={mobileSearchInput}
                  type="text"
                  name="q"
                  className="grow"
                  placeholder="Search"
                  defaultValue={searchInputValue}
                  onChange={handleMobileInputChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </Form>
          </li>
          <li>
            <Link to="/random" onClick={closeDrawer}>
              RANDOM RIDE
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeDrawer}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/signup" onClick={closeDrawer}>
              SIGN UP
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
