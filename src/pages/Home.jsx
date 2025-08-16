import React from 'react';
import Slider from '../components/Slider';
import ProductSection from '../components/ProductSection';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import VeggiesFruitSection from '../components/VeggiesFruitSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
          
            <ProductSection></ProductSection>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;