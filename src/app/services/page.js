"use client";
import React, { useState } from 'react';
import { Settings, Wrench, Shield, Truck, Phone, Clock, Award, CheckCircle, ArrowRight, Star, Heart, Hammer, } from 'lucide-react';
import Link from 'next/link';

function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

 const services = [
  {
    id: 1,
    title: 'Hospital Equipment Manufacturing',
    icon: Hammer,
    shortDescription: 'High-quality, precision-engineered hospital equipment for all medical needs.',
    longDescription: 'At S.A.G. Engineering Products, we manufacture a wide range of hospital equipment designed for durability, hygiene, and ease of use. Our expert team ensures every product meets strict medical standards, delivering exceptional reliability to healthcare facilities.',
    image: './Deep Fat Fryer.jpg',
    features: [
      'Custom Medical Equipment Design',
      'Stainless Steel Construction',
      'Ergonomic & Safe Designs',
      'Corrosion-Resistant Materials',
      'Hygienic Finishes',
      'Compliance with Medical Standards'
    ],
    process: [
      { step: 1, title: 'Requirement Analysis', description: 'Understanding hospital needs and specifications' },
      { step: 2, title: 'Design', description: 'Creating detailed product designs' },
      { step: 3, title: 'Prototype', description: 'Building and testing prototypes' },
      { step: 4, title: 'Manufacturing', description: 'Full-scale production with quality control' },
      { step: 5, title: 'Inspection', description: 'Final quality assurance checks' },
      { step: 6, title: 'Delivery', description: 'Safe and timely product delivery' }
    ],
    applications: ['ICU Equipment', 'Operation Theatre Equipment', 'Hospital Beds', 'Medical Storage Units'],
    timeline: '2-6 weeks',
    warranty: '2 years manufacturing warranty'
  },
  {
    id: 2,
    title: 'Commercial Kitchen Equipment',
    icon: Settings,
    shortDescription: 'Durable and efficient kitchen equipment for hotels, restaurants, and institutions.',
    longDescription: 'We design and manufacture high-performance kitchen equipment built for heavy use in commercial kitchens. From preparation to cooking to storage, our products help you achieve efficiency and hygiene in your kitchen operations.',
    image: './Commercial Kitchen Exhaut Hood 4.jpeg',
    features: [
      'Custom Fabrication for Any Kitchen Layout',
      'Energy-Efficient Designs',
      'Heavy-Duty Stainless Steel',
      'Easy-to-Clean Surfaces',
      'Ergonomic Workstations',
      'Complies with Food Safety Standards'
    ],
    process: [
      { step: 1, title: 'Site Survey', description: 'Understanding kitchen layout and requirements' },
      { step: 2, title: 'Design', description: 'Planning efficient workflows' },
      { step: 3, title: 'Fabrication', description: 'Precision-built kitchen units' },
      { step: 4, title: 'Installation', description: 'Professional equipment setup' },
      { step: 5, title: 'Testing', description: 'Operational testing of all units' },
      { step: 6, title: 'Training', description: 'Staff training on usage and maintenance' }
    ],
    applications: ['Hotels', 'Restaurants', 'Hospitals', 'Industrial Kitchens'],
    timeline: '3-5 weeks',
    warranty: '1 year installation and manufacturing warranty'
  },
  {
    id: 3,
    title: 'Installation Services',
    icon: Wrench,
    shortDescription: 'Professional installation for hospital and kitchen equipment.',
    longDescription: 'Our expert installation team ensures that your hospital or kitchen equipment is set up, calibrated, and ready to perform at its best. We prioritize safety, efficiency, and minimal disruption to your operations.',
    image: './Elec. Hot Plate with Oven.jpg',
    features: [
      'Certified Installation Technicians',
      'Site Preparation',
      'Safe Equipment Handling',
      'System Calibration',
      'Compliance Checks',
      'On-Site Training'
    ],
    process: [
      { step: 1, title: 'Planning', description: 'Creating an installation schedule' },
      { step: 2, title: 'Preparation', description: 'Ensuring site readiness' },
      { step: 3, title: 'Setup', description: 'Installing and positioning equipment' },
      { step: 4, title: 'Testing', description: 'Ensuring full functionality' },
      { step: 5, title: 'Calibration', description: 'Optimizing performance' },
      { step: 6, title: 'Handover', description: 'Final check and training' }
    ],
    applications: ['Hospitals', 'Restaurants', 'Hotels', 'Catering Services'],
    timeline: '1-3 days',
    warranty: '1 year installation warranty'
  }
];


  const stats = [
    { number: '500+', label: 'Projects Completed', icon: Award },
    { number: '15+', label: 'Years Experience', icon: Clock },
    { number: '24/7', label: 'Support Available', icon: Phone },
    { number: '98%', label: 'Customer Satisfaction', icon: Heart }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Chief Surgeon, Apollo Hospital',
      content: 'S.A.G. Engineering delivered exceptional surgical equipment with flawless installation. Their attention to detail and quality is unmatched.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Maria Rodriguez',
      position: 'Restaurant Owner, Mumbai',
      content: 'The custom kitchen solutions exceeded our expectations. Professional service from design to installation. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b160c5b4?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Amit Patel',
      position: 'Plant Manager, Food Corp',
      content: 'Outstanding fabrication quality and timely delivery. Their maintenance support keeps our operations running smoothly.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Hero Section */}
      <div className="bg-[#41BCF5] text-white py-20 relative overflow-hidden mt-10">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black mb-6">Our Services</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Comprehensive stainless steel solutions from design to delivery. 
              Experience excellence in every aspect of your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" >
              <button className="bg-white text-[#002F4C] px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Free Consultation
              </button>
              </Link>
              <Link href="/products/All">
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
                View Our Work
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-[#41BCF5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-[#002F4C] mb-2">
                  {stat.number}
                </div>
                <div className="text-bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">Complete Service Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to ongoing support, we provide end-to-end services 
              to ensure your complete satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => setActiveService(index)}
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-[#41BCF5] rounded-xl flex items-center justify-center shadow-lg">
                    <service.icon className="text-white" size={20} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.shortDescription}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{service.timeline}</span>
                    </div>
                    <button className="text-[#002F4C]  font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Learn More</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Service Detail */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#41BCF5] rounded-xl flex items-center justify-center">
                  {React.createElement(services[activeService].icon, { className: "text-white", size: 20 })}
                </div>
                <h3 className="text-3xl font-black text-gray-900">{services[activeService].title}</h3>
              </div>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {services[activeService].longDescription}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services[activeService].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="text-[#002F4C] flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {services[activeService].applications.map((app, index) => (
                      <span key={index} className="px-3 text-white py-1 bg-[#41BCF5] text-sm rounded-full">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-8 bg-[#41BCF5] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                Request This Service
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="w-full rounded-2xl shadow-2xl"
              />
              
              {/* Process Timeline */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Our Process:</h4>
                <div className="space-y-3">
                  {services[activeService].process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#41BCF5] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{step.title}</h5>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                {/* <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p> */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-[#41BCF5]
 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Ready to Get Started?</h2>
  <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
    Contact us today for a free consultation and discover how we can help bring your stainless steel project to life
  </p>




          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact"> 
            <button className="bg-white text-[#002F4C] px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Get Free Quote
            </button>
            </Link> 
            <a href="tel:+918047631651">
  <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
    Call Now: +91 8047631651
  </button>
</a>

          </div>

          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck size={16} />
              <span>Free Installation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;