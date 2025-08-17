import React from "react";
import newsletterBg from "../assets/news.jpg"

const NewsletterSection = () => {
  return (
    <section className="rounded-2xl md:mt-32"  >
      <div className="bg-cover py-16 px-6  relative  " style={{
        backgroundImage: `url(${newsletterBg})`,
      
      }}>

      
         {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white/90 mb-8 text-lg md:text-xl drop-shadow-md">
          Get fresh updates, seasonal recipes, and exclusive offers straight to
          your inbox.
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-4 bg-white/20 backdrop-blur-md rounded-xl p-4 sm:p-2 shadow-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-white/80 text-white bg-white/10 transition duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-my-primary hover:bg-white/50 text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
