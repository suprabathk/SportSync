import { Fragment, useContext, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../context/theme";
import { User } from "../types/types";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const Appbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");
  const isAuth = !!localStorage.getItem("authToken");

  const userDataString = localStorage.getItem("userData");
  const userData: User = JSON.parse(userDataString ? userDataString : "{}");

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-sky-700 text-white dark:bg-black">
        {() => (
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/" className="font-space-grotesk text-lg font-bold">
                    SportSync
                  </Link>
                </div>
              </div>
              <div className="flex ml-4 items-center md:ml-6 gap-3">
                <Switch
                  checked={enabled}
                  onChange={toggleTheme}
                  className={`${enabled ? "bg-neutral-700" : "bg-slate-400"}
              relative inline-flex h-fit w-[115px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-12" : "translate-x-0"}
                pointer-events-none select-none inline-block h-fit w-fit transform rounded-full pl-1.5 pr-2 bg-white text-black shadow-lg ring-0 transition duration-200 ease-in-out text-sm`}
                  >
                    {enabled ? (
                      <div className="flex items-center gap-1">
                        <MoonIcon className="h-3 w-3" />
                        <span>Dark</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <SunIcon className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    )}
                  </span>
                </Switch>
                {isAuth && (
                  <Link to="/preferences">
                    <Cog6ToothIcon className="h-6 w-6" />
                  </Link>
                )}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="rounded-full p-1 transition-colors">
                      <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y dark:bg-black dark:border dark:border-neutral-600 text-black dark:text-white dark:divide-neutral-600 divide-neutral-300">
                      <div className="flex flex-col items-center justify-center my-2">
                        <span className="text-xl font-semibold">
                          {userData.name ?? "Guest"}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {userData.email ?? ""}
                        </span>
                      </div>
                      {isAuth ? (
                        <>
                          <div className="text-center p-1 font-normal">
                            <Link
                              to="/auth/signout"
                              className="hover:text-red-500 transition-colors"
                            >
                              Sign out
                            </Link>
                          </div>
                          <div className="text-center p-1 font-normal">
                            <Link
                              to="/reset-password"
                              className="hover:text-sky-600 transition-colors dark:hover:text-sky-300"
                            >
                              Reset password
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center p-1 font-normal">
                            <Link
                              to="/auth/signin"
                              className="hover:text-sky-600 transition-colors dark:hover:text-sky-300"
                            >
                              Sign in
                            </Link>
                          </div>
                          <div className="text-center p-1 font-normal">
                            <Link
                              to="/auth/signup"
                              className="hover:text-sky-600 transition-colors dark:hover:text-sky-300"
                            >
                              Sign up
                            </Link>
                          </div>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
