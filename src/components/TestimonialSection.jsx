import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bg2 from "../assets/bg-2.webp"

const testimonials = [
  {
    id: 1,
    name: "Sophia Green",
    role: "Organic Farmer",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The veggies are so fresh and tasty! I’ve never had better quality produce delivered straight to my door.",
  },
  {
    id: 2,
    name: "James Oliver",
    role: "Chef",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Cooking with such fresh ingredients elevates every dish. Highly recommended!",
  },
  {
    id: 3,
    name: "Ava Mitchell",
    role: "Health Coach",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Eating fresh, local produce has never been easier. Excellent service and great taste!",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-cover bg-center relative md:mt-20"
      style={{
      backgroundImage: `url(${bg2})`,
      }} >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl text-my-primary font-bold mb-12">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={40}
          slidesPerView={1}
          className="pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto transition-all duration-300 hover:scale-105">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-26 h-26 mx-auto rounded-full border-4 border-[#89c74a] shadow-md"
                />
                <h3 className="mt-5 text-2xl font-semibold text-[#4b6b1a]">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500">{t.role}</p>
                <p className="mt-5 text-lg text-gray-700 leading-relaxed">
                  {t.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
