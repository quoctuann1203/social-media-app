/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/AuthContext";
import { sidebarLinks } from "../../constants";
import { INavLink } from "../../types";
import { useSignOutAccount } from "../../lib/react-query/queriesAndMutations";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex gap-11 flex-col">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src="/public/assets/images/logo.svg"
            alt="Logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user?.id}`} className="flex gap-3 items-center">
          <img
            src={
              user?.imageUrl || "/public/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-light-3">@{user?.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks?.map((link: INavLink) => {
            const isActive = pathname === link?.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  className={"flex gap-4 items-center p-4"}
                  to={link?.route}>
                  <img
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    src={link?.imgURL}
                    alt={link?.label}
                  />
                  {link?.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => signOut()}>
        <img src="/public/assets/icons/logout.svg" alt="logo" />
        <p className="small-meidum lg:base-medium p-2">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
