import React from "react";
import { FaUserPlus, FaSearch, FaShoppingCart } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus className="text-white text-3xl" />,
    title: "Register or Login",
    description:
      "Create an account or login to access full features effortlessly.",
  },
  {
    id: 2,
    icon: <FaSearch className="text-white text-3xl" />,
    title: "Browse Products",
    description:
      "Explore fresh market prices updated daily by verified vendors.",
  },
  {
    id: 3,
    icon: <FaShoppingCart className="text-white text-3xl" />,
    title: "Track & Buy",
    description:
      "Add to watchlist, compare prices, and make secure purchases.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#caf89e] via-[#c8f1b1] to-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative group">
          <div className="bg-white rounded-3xl shadow-2xl p-6 transform transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
            <img
              src="https://i.ibb.co/Nn7sf8ZD/Sign-up-bro.png"
              alt="How it works illustration"
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-[#caf89e] to-[#ccffae] rounded-full opacity-70 blur-3xl animate-pulse"></div>
<div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-tr from-[#cffea3] to-[#d2fdb0] rounded-full opacity-70 blur-3xl animate-pulse"></div>

        </div>

        {/* Right Steps */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-my-primary mb-12 tracking-wide">
            How It Works
          </h2>
          <div className="space-y-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-[#89c74a] flex items-center justify-center shadow-md text-white text-2xl">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
