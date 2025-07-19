import { Fade } from "react-awesome-reveal";

const reasons = [
  {
    icon: "🛒",
    title: "Fresh Daily Prices",
    description: "Get accurate prices updated by vendors every day.",
    image: "https://i.ibb.co/svbCQP3f/bg.jpg", // replace with your own
  },
  {
    icon: "📈",
    title: "Price Trends",
    description: "Track price changes with interactive charts and graphs.",
    image: "https://i.ibb.co/svbCQP3f/bg.jpg", // replace with your own
  },
  {
    icon: "💬",
    title: "User Reviews",
    description: "Real feedback from market users and buyers.",
    image: "https://i.ibb.co/svbCQP3f/bg.jpg", // replace with your own
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="py-16 bg-cover bg-center bg-fixed relative mt-16"
      style={{
        backgroundImage: `url('https://i.ibb.co/qL4whqS7/why-img.webp')`, // section bg
      }}
    >
      <div className="container px-4 py-14 md:py-20 mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-my-primary mb-10">
          Why Choose LocalMarket Tracker?
        </h2>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <Fade key={idx} direction="up" delay={200 * idx} triggerOnce>
              <div className="relative group h-80 rounded-lg shadow-lg overflow-hidden">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300 brightness-[0.45] group-hover:brightness-[0.35]"
                  style={{ backgroundImage: `url(${reason.image})` }}
                ></div>

                {/* Overlay content */}
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
      </div>
    </section>
  );
};

export default WhyChooseUs;
