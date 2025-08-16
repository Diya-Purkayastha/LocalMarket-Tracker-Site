import React from "react";
import carrot from "../assets/pple.jpg";
import lemon from "../assets/orng.jpg";

const VeggiesFruitSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      {/* Card 1 - Carrot */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${carrot})` }}
        ></div>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/20"></div> */}

        {/* Text Shape */}
        <div className="relative z-10 flex justify-end h-full">
          <div className="bg-[#f2fd18bd] flex flex-col justify-center items-center text-center backdrop-blur-sm rounded-l-full p-6 max-w-xs transition-all duration-300 group-hover:scale-105">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Fresh Apple</h2>
            <p className="text-gray-700">
              Crunchy, sweet, and packed with nutrients. Perfect for salads and snacks.
            </p>
           
          </div>
        </div>
      </div>

      {/* Card 2 - Lemon */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${lemon})` }}
        ></div>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/20"></div> */}

        {/* Text Shape */}
        <div className="relative z-10 flex text-center justify-end h-full">
          <div className="bg-[#f99100d6] flex flex-col justify-center items-center backdrop-blur-sm rounded-l-full p-6 max-w-xs transition-all duration-300 group-hover:scale-105">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Zesty Orange</h2>
            <p className="text-gray-700">
              Fresh and tangy lemons to add zest to your dishes and drinks.
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeggiesFruitSection;
