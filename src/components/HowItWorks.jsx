import { motion } from "framer-motion";


const steps = [
  {
    number: "01",
    title: "Register or Login",
    description: "Create an account or login to access full features effortlessly."
  },
  {
    number: "02",
    title: "Browse Products",
    description: "Explore fresh market prices updated daily by verified vendors."
  },
  {
    number: "03",
    title: "Track & Buy",
    description: "Add to watchlist, compare prices, and make secure purchases."
  },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-my-primary mb-12">
        How It Works
      </h2>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT: Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
        
src='https://i.ibb.co/35KNmVLr/mexican-tacos-with-beef-tomato-sauce-salsa.jpg'
            alt="How it works"
            className="rounded-xl shadow-lg max-w-md w-full"
          />
        </motion.div>

        {/* RIGHT: Steps */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-6">
              {/* Number Circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-my-primary text-white flex items-center justify-center text-lg font-bold">
                {step.number}
              </div>
              {/* Step Content */}
              <div>
                <h3 className="text-xl font-semibold text-my-secondary">
                  {step.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

