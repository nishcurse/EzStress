import React from "react";
import Curr from "../store/Curr";

const Button = ({ title, isActive, onClick }) => {

  const buttonClasses = `
    px-4 py-2 rounded-lg transition-colors duration-200
    ${
      isActive
        ? // Active state: A vibrant blue background with white text and a shadow.
          "bg-neutral-900 text-white shadow-md"
        : // Inactive state: A darker gray background with light text, and a hover effect.
          "bg-neutral-700 text-gray-200 hover:bg-gray-600"
    }
  `;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {title}
    </button>
  );
};


const Tabbar = () => {

  const {ActiveTab, setActiveTab} = Curr((state)=>state);


  const handleTabClick = (tabTitle) => {
    console.log(tabTitle);
    setActiveTab(tabTitle);
    console.log(tabTitle, ActiveTab);
  };

  const tabs = ["generate.cpp", "optimal.cpp", "brute.cpp"];

  return (

    <div className="flex flex-row justify-items-start space-x-4 mt-2 px-4 py-2 rounded-lg ring-blue-50 ring-1 -xl shadow-lg bg">
      {tabs.map((tab) => (

        <Button
          key={tab} 
          title={tab}
          isActive={ActiveTab === tab}
          onClick={() => handleTabClick(tab)}
        />
      ))}
    </div>
  );
};

export default Tabbar;