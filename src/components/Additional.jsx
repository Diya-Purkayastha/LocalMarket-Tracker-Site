import React from "react";

const Additional = () => {
  return (
    <section>
     {/* Service Section */}
{/* Service Section */}
<section className=" md:container mx-auto md:mt-28">
  <div className="flex justify-center">
    <h2 className="text-center  font-extrabold text-4xl md:text-5xl  relative inline-block text-my-primary">
    Services
    <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#caf89e] via-[#c8f1b1] to-[#89c74a] rounded-full -translate-x-1/2"></span>
  </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8 px-4">
    {/* Service Card 1 */}
    <div className="group bg-gradient-to-b from-[#caf89e] via-[#c8f1b1] to-white text-center h-80 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
      <figure className="flex justify-center items-center bg-gradient-to-r from-[#caf89e] to-[#89c74a] w-28 h-28 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500">
        <img
          className="p-4 w-full rounded-full"
          src="https://i.ibb.co.com/fVvc24jv/Service-24-7.gif"
          alt="24/7 Services"
        />
      </figure>
      <h4 className="font-semibold text-2xl relative mt-4 text-gray-800">24/7 Services
        <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#aae276] via-[#b4ff88] to-[#89c74a] rounded-full -translate-x-1/2"></span>
      </h4>

      <p className="text-gray-600 text-sm md:text-base mt-2">
        "There is no substitute for hard work, <br /> 23 or 24 hours a day"
      </p>
    </div>

    {/* Service Card 2 */}
    <div className="group bg-gradient-to-b from-[#caf89e] via-[#c8f1b1] to-white text-center h-80 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
      <figure className="flex justify-center items-center bg-gradient-to-r from-[#caf89e] to-[#89c74a] w-28 h-28 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500">
        <img
          className="p-4 w-full rounded-full"
          src="https://i.ibb.co.com/wFCRWp7H/Messenger.gif "
          alt="Fast Delivery"
        />
      </figure>
      <h4 className="font-semibold text-2xl mt-4 relative text-gray-800">Fast Delivery
        <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#aae276] via-[#b4ff88] to-[#89c74a] rounded-full -translate-x-1/2"></span>
      </h4>
      <p className="text-gray-600 text-sm md:text-base mt-2">
        "Your Parcel, Our Priority <br /> Delivering Excellence, One Package at a Time"
      </p>
    </div>

    {/* Service Card 3 */}
    <div className="group bg-gradient-to-b from-[#caf89e] via-[#c8f1b1] to-white text-center h-80 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
      <figure className="flex justify-center items-center bg-gradient-to-r from-[#caf89e] to-[#89c74a] w-28 h-28 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform duration-500">
        <img
          className="p-4 w-full rounded-full"
          src="https://i.ibb.co.com/8nGfymKf/Healthy-lifestyle.gif"
          alt="Healthy Products"
        />
      </figure>
      <h4 className="font-semibold text-2xl relative mt-4 text-gray-800">Healthy Products
        <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#aae276] via-[#b4ff88] to-[#89c74a] rounded-full -translate-x-1/2"></span>
      </h4>
      <p className="text-gray-600 text-sm md:text-base mt-2">
        "Let food be thy medicine, <br /> thy medicine shall be thy food"
      </p>
    </div>
  </div>
</section>



    

    </section>
  );
};

export default Additional;
