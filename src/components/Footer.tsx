import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">FTS</span>
              </div>
              <span className="font-semibold text-lg">FluxTerra Simworks</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              High-fidelity hardware simulators and intuitive interface software for immersive experiences in motorsports, aviation, rail transport, and beyond.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Austin, TX, United States</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@fluxterrasimworks.com" className="hover:underline">
                  info@fluxterrasimworks.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+15125551234" className="hover:underline">
                  +1 (512) 555-1234
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm hover:underline">
                About Us
              </Link>
              <Link to="/products" className="block text-sm hover:underline">
                Products
              </Link>
              <Link to="/events" className="block text-sm hover:underline">
                Events
              </Link>
              <Link to="/booking" className="block text-sm hover:underline">
                Book Session
              </Link>
              <Link to="/privacy" className="block text-sm hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/fluxterrasimworks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/20 rounded-lg hover:bg-primary-foreground/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/fluxterrasimworks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/20 rounded-lg hover:bg-primary-foreground/30 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@fluxterrasimworks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/20 rounded-lg hover:bg-primary-foreground/30 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} FluxTerra Simworks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};