import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Slide } from 'react-awesome-reveal';

const Slider = () => {
  return (
    <div className="w-full h-[80vh] group relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        {/* ✅ Slide 1 */}
        <SwiperSlide>
          <div
            className="relative h-[500px] md:h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557844352-761f2565b576?w=1200&auto=format&fit=crop&q=80')",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-6 text-white">
              <Slide direction="up" cascade damping={0.15} triggerOnce delay={300}>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  Fresh Vegetables <br />
                  <span className="font-bold">Direct from Farmers</span>
                </h1>

                <ul className="space-y-2 text-base mt-4">
                  <li>🌱 100% Organic & Locally Sourced</li>
                  <li>🥬 Daily Price Updates from Markets</li>
                  <li>🛒 Compare Across Different Areas</li>
                  <li>🚚 Save More, Buy Smart</li>
                </ul>

                <Slide direction="down" cascade damping={0.15} triggerOnce>
                  <button className="bg-white text-black px-6 py-3 mt-6 hover:bg-gray-200 rounded-md">
                    VIEW MARKET PRICES
                  </button>
                </Slide>
              </Slide>
            </div>
          </div>
        </SwiperSlide>

        {/* ✅ Slide 2 */}
        <SwiperSlide>
          <div
            className="relative h-[500px] md:h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1663040589382-88caf6b2bc60?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-6 text-white">
              <Slide direction="up" cascade damping={0.15} triggerOnce delay={300}>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  Seasonal Fruits <br />
                  <span className="font-bold">Best Price in Your Area</span>
                </h1>

                <ul className="space-y-2 text-base mt-4">
                  <li>🥭 Fresh Mangoes & Jackfruit Deals</li>
                  <li>🍉 Watermelon & Litchi Specials</li>
                  <li>📊 Track Price Trends in Real-time</li>
                  <li>✅ Verified Vendor Listings</li>
                </ul>

                <Slide direction="down" cascade damping={0.15} triggerOnce>
                  <button className="bg-white text-black px-6 py-3 mt-6 hover:bg-gray-200 rounded-md">
                    EXPLORE FRUITS
                  </button>
                </Slide>
              </Slide>
            </div>
          </div>
        </SwiperSlide>

        {/* ✅ Slide 3 */}
        <SwiperSlide>
          <div
            className="relative h-[500px] md:h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1686529665813-4a33ede6d080?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-6 text-white">
              <Slide direction="up" cascade damping={0.15} triggerOnce delay={300}>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  Support Local Farmers <br />
                  <span className="font-bold">Buy Directly from Source</span>
                </h1>

                <ul className="space-y-2 text-base mt-4">
                  <li>👨‍🌾 Direct Vendor Connections</li>
                  <li>💰 Fair Pricing for Everyone</li>
                  <li>🏪 Nearest Bazar Listings</li>
                  <li>🔄 Transparent & Updated Data</li>
                </ul>

                <Slide direction="down" cascade damping={0.15} triggerOnce>
                  <button className="bg-white text-black px-6 py-3 mt-6 hover:bg-gray-200 rounded-md">
                    VIEW FARMERS
                  </button>
                </Slide>
              </Slide>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
