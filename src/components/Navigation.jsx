import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

const Navigation = () => {
  const { changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    changeLanguage(newLanguage);
  };

  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
      <nav>
        <ul>
          <li>
            <Link to="/header">Header</Link>
          </li>
          <li>
            <Link to="/tires">Tires</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
