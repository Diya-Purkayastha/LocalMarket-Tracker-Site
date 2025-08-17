import { Fade } from "react-awesome-reveal";
import VeggiesFruitSection from "./VeggiesFruitSection";

// const reasons = [
//   {
//     icon: "🛒",
//     title: "Fresh Daily Prices",
//     description: "Get accurate prices updated by vendors every day.",
//     image: "https://i.ibb.co/svbCQP3f/bg.jpg", // replace with your own
//   },
//   {
//     icon: "📈",
//     title: "Price Trends",
//     description: "Track price changes with interactive charts and graphs.",
//     image: "https://i.ibb.co/svbCQP3f/bg.jpg", // replace with your own
//   },
//   {
//     icon: "💬",
//     title: "User Reviews",
//     description: "Real feedback from market users and buyers.",
//     image: "https://i.ibb.co/svbCQP3f/bg.jpg", // replace with your own
//   },
// ];

const WhyChooseUs = () => {
  return (
    <section
      className="py-30 bg-cover bg-center bg-fixed relative mt-10 md:mt-28"
      style={{
        backgroundImage: `url('https://demo1.leotheme.com/bos_freshness_demo/themes/bos_freshness/assets/img/modules/appagebuilder/images/bn2.jpg')`, // section bg
      }}
    >
       {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
    <div className="flex justify-center z-10">
      <h2 className="text-4xl bg-my-primary z-10 text-white p-3 rounded-full inline font-bold ">
          Get Fresh Items First
        </h2>
    </div>
      <VeggiesFruitSection></VeggiesFruitSection>
       {/*<div className="container px-8 py-14 md:py-20 mx-auto">
       
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Why Choose LocalMarket Tracker?
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <Fade key={idx} direction="up" delay={200 * idx} triggerOnce>
              <div className="relative group h-80 rounded-lg shadow-lg overflow-hidden">
                
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300 brightness-[0.45] group-hover:brightness-[0.35]"
                  style={{ backgroundImage: `url(${reason.image})` }}
                ></div>

               
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
                  <div className="text-5xl mb-4">{reason.icon}</div>
                  <h3 className="text-2xl font-extrabold mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default WhyChooseUs;
