import { Mail, Phone } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#002F4C] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div> */}
              <div>
                <h3 className="text-white font-bold text-xl">S.A.G. Engineering Products</h3>
                {/* <p className="text-white">Proprietor: Prashant Gatkal</p> */}
              </div>
            </div>
            <p className="text-white leading-relaxed mb-6">
              At SAG Engineering Products, we specialize in premium commercial kitchen equipment, delivering quality, innovation, and trust since our inception.
            </p>
             <p className="text-white leading-relaxed mb-6">
             Head: office - Mumbai  <br></br>
              Survey No. 23, G. No. 15, DK Market, Subhash Nagar, Jangleshwar Road, Asalpha, Village, Ghatkopar West, Mumbai, Maharashtra 400084 
             </p>
              <p className="text-white leading-relaxed mb-6">
              Branch office - Pune      
              <br></br>
              R. Office: Sr. No. 50/9A/4, Flat No: 13, SAI PRASAD, GHULE Nagar, VadgoanBk, Haveli, Pune, 411041.

                     </p>
              
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-400" size={18} />
                <a href="tel:+919892084449" className="text-gray-400 hover:text-blue-500">
                  +91 9892084449
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="text-blue-400" size={18} />
                <a href="tel:+919082008085" className="text-gray-400 hover:text-blue-500">
                  +91 9082008085
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" size={18} />
                <span className="text-gray-400">sales@sagenginnering.in</span>
              </div>
              {/* <div className="flex items-center space-x-3">
                <MapPin className="text-blue-400" size={18} />
                <span className="text-gray-400 block">
Head: Survey No. 23, G. No. 15, DK Market, Subhash Nagar, Jangleshwar Road, Asalpha, Village, Ghatkopar West, Mumbai, Maharashtra 400084
                </span>

              </div> */}
              {/* <div className="flex items-center space-x-3">
                <MapPin className="text-blue-400" size={18} />
                <span className="text-gray-400 block">

                </span>

              </div> */}
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Business Hours</h4>
            <div className="space-y-2 text-gray-400">
              <p>Monday - Saturday</p>
              <p className="font-semibold">9:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/products/cooking-equipments" className="hover:text-white transition-colors">Products</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="/products/cooking-equipments" className="hover:text-white transition-colors">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 S.A.G. Engineering Products. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="https://www.newnessmarketing.com" className="text-gray-400 hover:text-white transition-colors">Design and developed by newnessmarketing.com</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
