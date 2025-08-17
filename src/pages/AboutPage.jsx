import React from "react";

const AboutPage = () => {
  return (
    <main>
      {/* Hero / Stay Home Section */}
      <section className="md:container mx-auto mb-28 px-4">
  <div className="flex flex-col-reverse lg:flex-row overflow-hidden">
    
    {/* Left Text */}
    <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-[#caf89e] via-[#c8f1b1] to-[#89c74a] rounded-2xl shadow-lg ">
      <div className="p-8 lg:p-12 space-y-6 text-center lg:text-left">
        <h2 className="text-gray-900 text-3xl lg:text-5xl font-bold leading-snug">
          Stay Home & <br /> 
          Get All Your Essentials <br /> 
          From Our Market
        </h2>
        <p className="text-gray-800 opacity-90 text-lg max-w-md mx-auto lg:mx-0">
          Shop smarter and faster — download our app and enjoy seamless grocery delivery right to your door.
        </p>

       
      </div>
    </div>

    {/* Right Animation */}
    <div className="flex-1 flex items-center justify-center bg-white/20">
      <img
        className="w-3/4 h-[200px] lg:w-full object-contain drop-shadow-xl"
        src="https://i.ibb.co.com/fVvc24jv/Service-24-7.gif"
        alt="Grocery Delivery Animation"
      />
    </div>
  </div>
</section>

      {/* Arrivals & Offers Section */}
      <section className="md:container mx-auto mb-28">
   <h2 className="text-[#89c74a] font-bold text-4xl md:text-5xl text-center mb-12">
    Arrivals & Offers
  </h2>

  <div className="flex flex-col lg:flex-row gap-8 p-4">
    {/* 20% off Dawat */}
    <div className="flex lg:basis-3/5 bg-gradient-to-r from-[#caf89e] via-[#a4db70] to-[#6aa637] rounded-2xl p-8 justify-between items-center shadow-lg hover:scale-105 transition">
      <div className="space-y-6">
        <img src="./c2-assets/dawat-logo.png" alt="Dawat Logo" />
        <button className="px-9 py-3 bg-white text-[#6aa637] font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Grab Fresh Items
        </button>
        <h2 className="text-4xl text-white font-light">
          UP to <span className="font-bold">20% OFF</span>
        </h2>
      </div>
      <div>
        <img src="./c2-assets/dawat-mock-up.png" alt="Dawat Mock-up" />
      </div>
    </div>

    {/* 20% off */}
    <div className="lg:basis-2/5 flex bg-gradient-to-r from-[#5ad68a] via-[#3ab860] to-[#10611c] rounded-2xl p-8 justify-between items-center shadow-lg hover:scale-105 transition">
      <div className="space-y-6">
        <img src="./c2-assets/india-gate-logo.png" alt="" />
        <button className="px-9 py-3 bg-white text-[#10613c] font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Cook Exotic Dishes
        </button>
        <h2 className="text-4xl text-white font-light">
          UP to <span className="font-bold">20% OFF</span>
        </h2>
      </div>
      <div>
        <img
          src="./c2-assets/india-gate-mock-up.png"
          alt="India Gate Mock-up"
        />
      </div>
    </div>
  </div>
</section>


      {/* Newsletter Section */}
      <section className="mx-4">
        <div className="md:container mx-auto bg-gradient-to-r from-[#caf89e] via-[#c8f1b1] to-[#89c74a] rounded-3xl p-8 lg:p-16 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8">
            {/* Left Image */}
            <div>
              <img
                src="./c2-assets/vegetable-busket.png"
                alt="Vegetable Basket"
                className="w-56 lg:w-72"
              />
            </div>

            {/* Right Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
                Get Grocery News!
              </h2>
              <p className="text-gray-700 md:text-lg">
                Exclusive tips, tricks, product deals, and more — straight to
                your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  className="flex-1 py-4 px-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#89c74a] outline-none"
                  type="text"
                  placeholder="Enter email..."
                />
                <button className="px-8 py-4 bg-[#89c74a] hover:bg-[#6aa637] text-white font-semibold rounded-lg shadow-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
