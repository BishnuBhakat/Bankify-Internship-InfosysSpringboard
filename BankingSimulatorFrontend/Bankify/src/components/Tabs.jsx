import React from "react";

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex space-x-4 border-b border-gray-300 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`px-4 py-2 text-sm font-semibold ${
            activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
