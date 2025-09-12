import React from "react";
import Curr from "../store/Curr";
import TabButton from "./TabButton";

const Tabbar = () => {
  const { ActiveTab, setActiveTab } = Curr((state) => state);

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  const tabs = ["generate.cpp", "optimal.cpp", "brute.cpp"];

  return (
    <div className="inline-flex items-center gap-1.5 p-1.5 rounded-xl bg-neutral-900/60 border border-neutral-700/40 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300">
      {tabs.map((tab) => (
        <TabButton
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