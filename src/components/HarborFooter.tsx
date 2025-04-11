
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HarborFooter = () => {
  return (
    <footer className="bg-harbor-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/a3ae2dde-f517-47b4-8860-c7a934c82ce7.png" 
                alt="Harba Logo" 
                className="h-12 mr-2 bg-white rounded-full p-1" 
              />
            </div>
            <p className="text-gray-100 mb-6 text-lg max-w-md leading-relaxed">
              Harba your All-in-One Marina Management Software that makes managing your Marina a Breeze.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-2xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li>
                <a href="mailto:info@harba.co" className="hover:text-white transition-colors">info@harba.co</a>
              </li>
              <li>
                <a href="tel:+4570603560" className="hover:text-white transition-colors">+45 70 60 35 60</a>
              </li>
              <li className="leading-relaxed">
                55 Sortedam Dossering,<br />
                DK-2100 Copenhagen, Denmark
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-harbor-700 mb-8" />
        
        <div className="text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Harba. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HarborFooter;
