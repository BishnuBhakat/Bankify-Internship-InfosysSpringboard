// Reusable card component to display a single service
import React from "react"; // Import React

const ServiceCard = ({ title, description }) => { // Props: title and description
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"> {/* Card container */}
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3> {/* Service title */}
      <p className="text-gray-600">{description}</p> {/* Service description */}
    </div>
  );
};

export default ServiceCard; // Export ServiceCard
