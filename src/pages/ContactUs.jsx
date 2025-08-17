import React from "react";

import Additional from "../components/Additional";

const ContactUs = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 ">
      <div className="max-w-5xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-[#89c74a] to-[#6aa637] p-10 text-center">
            <h2 className="text-4xl font-bold text-white">Contact Us</h2>
            <p className="text-white/90 mt-2">
              Have questions? We’d love to hear from you.
            </p>
             
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <form className="space-y-6">
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#89c74a] shadow-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#89c74a] shadow-sm"
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#89c74a] shadow-sm"
              />

              {/* Message */}
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#89c74a] shadow-sm"
              ></textarea>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#89c74a] to-[#6aa637] text-white font-semibold text-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
     <Additional></Additional>
      {/* Arrivals & Offers Section */}
      <section className="md:container mx-auto my-28 ">
   <h2 className="text-[#89c74a] font-bold text-4xl md:text-5xl text-center mb-12">
    Arrivals & Offers
  </h2>

  <div className="flex flex-col lg:flex-row gap-8 p-4">
    {/* 20% off Dawat */}
    <div className="flex lg:basis-3/5 bg-gradient-to-r from-[#caf89e] via-[#a4db70] to-[#6aa637] rounded-2xl p-8 justify-between items-center shadow-lg hover:scale-105 transition">
      <div className="space-y-6">
        {/* <img src="./c2-assets/dawat-logo.png" alt="Dawat Logo" /> */}
        <p className="italic font-bold text-white">Save More, Shop Smarter – Exclusive Deals Updated Daily!</p>
        <a href="/all-products">
        <button className="px-9 py-3 bg-white text-[#6aa637] font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Grab Fresh Items
        </button>
        </a>
        <h2 className="text-4xl text-white font-light">
          UP to <span className="font-bold">20% OFF</span>
        </h2>
      </div>
      <div>
        <img className="w-full h-[300px]" src="https://i.ibb.co.com/0RLyRjh5/fruit-basket-rafiki.png" alt="Dawat Mock-up" />
      </div>
    </div>

    {/* 20% off */}
    <div className="lg:basis-2/5 flex bg-gradient-to-r from-[#5ad68a] via-[#3ab860] to-[#10611c] rounded-2xl p-8 justify-between items-center shadow-lg hover:scale-105 transition">
      <div className="space-y-6">
        {/* <img src="./c2-assets/india-gate-logo.png" alt="" /> */}
                <p className="italic font-bold text-white">Fresh Essentials, Fresh Discounts – Your Wallet Will Thank You.</p>
       <a href="/all-products">
          <button  className="px-9 py-3 bg-white text-[#10613c] font-semibold rounded-lg shadow-md hover:bg-gray-100">
          Grab Fresh Items
        </button> </a>
       
        <h2 className="text-4xl text-white font-light">
          UP to <span className="font-bold">20% OFF</span>
        </h2>
      </div>
      <div>
        <img
        className="w-full h-[250px]"
          src="https://i.ibb.co.com/C52F3Wt7/Discount-amico.png"
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
                src="https://i.ibb.co.com/0ptkNrV2/vegetable-busket.png"
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
    </section>
  );
};

export default ContactUs;
