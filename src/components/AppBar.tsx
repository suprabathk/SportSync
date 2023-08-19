import { Fragment, useContext, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../context/theme";
import { User } from "../types/types";
import { Link } from "react-router-dom";

const Appbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");

  const userDataString = localStorage.getItem("userData");
  const userData: User = JSON.parse(userDataString ? userDataString : "");

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
      <Disclosure
        as="nav"
        className="border-b border-slate-200 dark:bg-stone-950 dark:text-white"
      >
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="font-space-grotesk text-lg font-bold">
                    SportSync
                  </span>
                </div>
              </div>
              <div className="flex ml-4 items-center md:ml-6">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="rounded-full bg-white p-1 text-gray-700 hover:text-blue-600 transition-colors dark:bg-slate-950 dark:text-white">
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2 divide-y dark:bg-stone-950 border dark:border-white">
                      <div className="flex flex-col items-center justify-center my-2">
                        <span className="text-xl font-semibold">
                          {userData.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {userData.email}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-normal text-md">Dark mode: </span>
                        <Switch
                          checked={enabled}
                          onChange={toggleTheme}
                          className={`${
                            enabled ? "bg-slate-400" : "bg-slate-700"
                          }
              relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span
                            aria-hidden="true"
                            className={`${
                              enabled ? "translate-x-5" : "translate-x-0"
                            }
                pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                      </div>
                      <div className="text-center py-2">
                        <Link
                          to="/auth/signout"
                          className="text-black hover:text-red-500 transition-colors dark:text-white dark:hover:text-red-500"
                        >
                          Sign out
                        </Link>
                      </div>
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
