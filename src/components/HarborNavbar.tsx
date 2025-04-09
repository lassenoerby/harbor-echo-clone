
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const HarborNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-harbor-600">Harba</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/task-overview" className="text-gray-600 hover:text-harbor-600 transition-colors">
              Task Overview
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-harbor-600 transition-colors">
              Dashboard
            </Link>
            <Button 
              className="bg-harbor-600 hover:bg-harbor-700 gap-2"
              asChild
            >
              <Link to="/task-overview">
                <Plus className="h-5 w-5" />
                Create Task
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/task-overview"
                className="text-gray-600 hover:text-harbor-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Task Overview
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-harbor-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Button 
                className="bg-harbor-600 hover:bg-harbor-700 w-full gap-2"
                asChild
              >
                <Link to="/task-overview" onClick={() => setIsMenuOpen(false)}>
                  <Plus className="h-5 w-5" />
                  Create Task
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HarborNavbar;
