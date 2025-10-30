// Small animated selection card used in Login page (admin/customer)
import React from "react"; // Import React

const AnimatedCard = ({ title, subtitle, onClick }) => { // Props for title, subtitle and click handler
  return (
    <div
      onClick={onClick} // Handle click to select card
      className="cursor-pointer w-64 h-44 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div> {/* Title area */}
        <h4 className="text-lg font-bold text-blue-800">{title}</h4> {/* Card title */}
        <p className="text-sm text-gray-500">{subtitle}</p> {/* Card subtitle */}
      </div>
      <div className="self-end"> {/* Action hint */}
        <span className="text-sm text-blue-600 font-semibold">Select →</span> {/* Visual hint */}
      </div>
    </div>
  );
};

export default AnimatedCard; // Export AnimatedCard component
