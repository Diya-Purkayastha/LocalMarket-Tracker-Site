import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../css/slider.css'
import { Slide } from 'react-awesome-reveal';

const Slider = () => {
    return (
        <div className="w-full h-[80vh] group relative">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation

                className="h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div
                        className="relative h-[500px] md:h-[80vh] w-full bg-cover bg-center flex items-center rounded-2xl"
                        style={{
                            backgroundImage: "url('https://i.ibb.co/sGShmx6/eaters-collective-12e-HC6-Fx-Pyg-unsplash.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

                        {/* Content */}
                        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16">
                            {/* Left Text Content */}
                            <div className="md:w-1/2 text-center md:text-left py-12 md:pl-10 space-y-6 text-white">
                            <Slide direction="up" cascade damping={0.15} triggerOnce delay={300}>
                                 <h1 className="text-3xl md:text-5xl font-light leading-tight ">
                                    Healthy Pasta <br />
                                    <span className="font-bold">Nutritional Info</span>
                                </h1>
                            
                               
                                <ul className="space-y-2 text-base">
                                    <li>🌿 Fresh Basil & Herb Sauce</li>
                                    <li>🧄 Garlic Olive Oil Infusion Pack</li>
                                    <li>🍅 Sun-Dried Tomato Garnish</li>
                                    <li>🍝 Organic Whole Wheat Pasta</li>
                                </ul>
                                <Slide direction="down" cascade damping={0.15} triggerOnce>
                                      <button className="bg-white text-black px-6 py-3 mt-4 hover:bg-gray-200">
                                    START JOURNEY
                                </button>
                                </Slide>
                              
                                </Slide>
                            </div>

                            {/* Optional right side space */}
                            <div className="md:w-1/2 hidden md:block"></div>
                        </div>
                    </div>
                </SwiperSlide>


                {/* Slide 2 */}
                <SwiperSlide>
                    <div
                        className="relative h-[500px] md:h-[80vh] w-full bg-cover bg-center flex items-center " // ← added mt-10
                        style={{
                            backgroundImage: "url('https://i.ibb.co/5W6TWmSv/amirali-mirhashemian-pc-GND1-s-T5-I-unsplash.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

                        {/* Content */}
                        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16">
                            {/* Left Text Content */}
                            <div className="md:w-1/2 text-center md:text-left py-12 md:pl-10 space-y-6 text-white">
                                 <Slide direction="up" cascade damping={0.15} triggerOnce delay={300}> <h1 className="text-3xl md:text-5xl font-light leading-tight">
                                    Spicy Chowmein <br />
                                    <span className="font-bold">10-Minute </span>
                                </h1>
                               
                                <ul className="space-y-2 text-base">
                                    <li>🍜 Premium Stir-Fry Noodles</li>
                                    <li>🌶️ Signature Spicy Sauce Blend</li>
                                    <li>🥕 Pre-cut Veggie Mix (Carrot, Cabbage, Bell Peppers)</li>
                                    <li>🧄 Garlic & Ginger Flavor Boosters</li>

                                </ul>
                                </Slide>
                                   <Slide direction="down" cascade damping={0.15} triggerOnce><button className="bg-white text-black px-6 py-3 mt-4 hover:bg-gray-200">
                                    START JOURNEY
                                </button></Slide>
                                
                            </div>

                            {/* Optional right side space */}
                            <div className="md:w-1/2 hidden md:block"></div>
                        </div>
                    </div>
                </SwiperSlide>


                {/* Slide 3 */}
                <SwiperSlide>
                    <div
                        className="relative h-[500px] md:h-[80vh] w-full bg-cover bg-center flex items-center " // ← added mt-10
                        style={{
                            backgroundImage: "url('https://i.ibb.co/cXprpZJg/david-holifield-k-Pxsq-UGne-XQ-unsplash.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

                        {/* Content */}
                        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16">
                            {/* Left Text Content */}
                            <div className="md:w-1/2 text-center md:text-left py-12 md:pl-10 space-y-6 text-white">
                               <Slide direction="up" cascade damping={0.15} triggerOnce delay={300}>
                                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                                    Chocolate Cake <br />
                                    <span className="font-bold">Bake Perfect</span>
                                </h1>
                                <ul className="space-y-2 text-base">
                                    <li>🍫 Rich Dark Cocoa for Deep Flavor</li>
                                    <li>🥚 All-in-One Dry Cake Mix</li>
                                    <li>🧈 Buttery Vanilla Fusion</li>
                                    <li>🍫 Ready-to-Spread Chocolate Ganache</li>
                                   
                                </ul>
                                </Slide>
                                       <Slide direction="down" cascade damping={0.15} triggerOnce> <button className="bg-white text-black px-6 py-3 mt-4 hover:bg-gray-200">
                                    START JOURNEY
                                </button></Slide>
                               
                            </div>

                            {/* Optional right side space */}
                            <div className="md:w-1/2 hidden md:block"></div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Slider;