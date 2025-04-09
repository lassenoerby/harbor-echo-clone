
import React from "react";
import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Setup Your Marina Profile",
    description: "Create your marina profile with all berths, facilities, and services. Our team will help you get everything set up correctly.",
    benefits: ["Quick onboarding process", "Personalized setup assistance", "No technical knowledge required"]
  },
  {
    number: "02",
    title: "Manage Berths & Services",
    description: "Start managing your berths digitally. Track occupancy, services, and customer information all in one place.",
    benefits: ["Real-time occupancy overview", "Digital contract management", "Automated invoicing"]
  },
  {
    number: "03",
    title: "Accept Online Bookings",
    description: "Open your marina to online bookings. Boaters can find, book, and pay for berths without any manual intervention.",
    benefits: ["24/7 booking availability", "Secure payment processing", "Automatic confirmation emails"]
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-harbor-50 py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-secondary">
            Get Started in Three Simple Steps
          </h2>
          <p className="subheading">
            Our platform is designed for easy implementation, with minimal disruption to your existing operations.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
            >
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="bg-harbor-100 text-harbor-700 font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-harbor-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  <div className="space-y-2">
                    {step.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-harbor-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-harbor-200 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-harbor-300">
                  <p className="text-harbor-700 px-4 text-center">Step {step.number} illustration</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
