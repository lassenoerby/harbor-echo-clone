
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Since implementing Harba, our berth occupancy has increased by 34% and our administrative workload has been cut in half.",
    author: "Marina Westport",
    role: "Marina Manager",
    rating: 5
  },
  {
    quote: "The online booking system has completely transformed how we operate. Our customers love the convenience and we love the efficiency.",
    author: "Porto Marina",
    role: "Operations Director",
    rating: 5
  },
  {
    quote: "The analytics dashboard gives us insights we never had before. Now we can make data-driven decisions about our services and pricing.",
    author: "Blue Harbor Marina",
    role: "Business Development",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-secondary">
            Trusted by Marina Operators Worldwide
          </h2>
          <p className="subheading">
            Don't just take our word for it. Here's what marina operators are saying about our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-harbor-50 to-white p-8 rounded-xl shadow hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-harbor-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
