import React from 'react';
import Slider from '../components/Slider';
import ProductSection from '../components/ProductSection';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import VeggiesFruitSection from '../components/VeggiesFruitSection';
import TestimonialSection from '../components/TestimonialSection';
import NewsletterSection from '../components/NewsletterSection';
import Additional from '../components/Additional';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
          
            <ProductSection></ProductSection>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
            <TestimonialSection></TestimonialSection>
            <Additional></Additional>
            <div className='max-w-7xl mx-auto'>
                   <NewsletterSection></NewsletterSection>
            </div>
        </div>
    );
};

export default Home;