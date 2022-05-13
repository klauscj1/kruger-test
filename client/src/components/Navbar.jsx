import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ pageTitle }) => {
  const navigate = useNavigate();

  const onCloseSesion = () => {
    navigate("/");
  };
  return (
    <div className="bg-blue-500 px-4 flex flex-row justify-between h-12 content-center align-middle text-center items-center">
      <p className="text-white text-xl">{pageTitle}</p>
      <button className="border-white text-white" onClick={onCloseSesion}>
        Cerrar sesion
      </button>
    </div>
  );
};
