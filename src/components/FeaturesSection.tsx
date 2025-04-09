
import React from "react";
import { 
  Anchor, 
  Calendar, 
  CreditCard, 
  BarChart, 
  MessageSquare, 
  Ship 
} from "lucide-react";

const features = [
  {
    icon: <Ship className="h-6 w-6 text-harbor-600" />,
    title: "Berth Management",
    description: "Effortlessly manage berth assignments and visualize your marina occupancy in real-time."
  },
  {
    icon: <Calendar className="h-6 w-6 text-harbor-600" />,
    title: "Online Booking",
    description: "Allow boaters to easily book berths online, reducing administrative work and phone calls."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-harbor-600" />,
    title: "Payment Processing",
    description: "Accept digital payments and automate invoicing for all marina services."
  },
  {
    icon: <BarChart className="h-6 w-6 text-harbor-600" />,
    title: "Performance Insights",
    description: "Get detailed analytics and reports on occupancy, revenue, and customer satisfaction."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-harbor-600" />,
    title: "Boater Communication",
    description: "Keep in touch with boaters through automated notifications and messages."
  },
  {
    icon: <Anchor className="h-6 w-6 text-harbor-600" />,
    title: "Service Add-ons",
    description: "Offer additional services like maintenance, cleaning, or provisions directly through the platform."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-secondary">
            Your Complete Marina Management Solution
          </h2>
          <p className="subheading">
            Streamline operations, boost occupancy, and enhance boater experiences with our all-in-one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover-scale"
            >
              <div className="bg-harbor-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-harbor-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
