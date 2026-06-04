"use client";
import React, { useState } from 'react';
import {
    Phone, Mail, MapPin, Clock, Send,
    Building, CheckCircle,
    Globe, Smartphone, Navigation, Award
} from 'lucide-react';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        productInterest: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: '',
                productInterest: ''
            });
        }, 3000);
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Call Us",
            primary: "+91 8047631651",
            secondary: "+91 8047631651",
            description: "Speak directly with our team",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Mail,
            title: "Email Us",
            primary: "sales@sagenginnering.in",
            secondary: "sales@sagenginnering.in",
            description: "Send us your requirements",
            color: "from-orange-500 to-orange-600"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            primary: "Mumbai, Maharashtra",
            secondary: "India - 400001",
            description: "Our manufacturing facility",
            color: "from-green-500 to-green-600"
        },
        {
            icon: Clock,
            title: "Business Hours",
            primary: "Mon - Sat: 9:00 AM - 6:00 PM",
            secondary: "Sunday: Closed",
            description: "We're here to help",
            color: "from-purple-500 to-purple-600"
        }
    ];

    const officeDetails = [
        {
            icon: Building,
            title: "Reach Us",
            address: "S.a.g. Engineering Products G. No. 15, DK Market, Subhash Nagar, Jangleshwar Road, Asalpha Village, Ghatkoper West, Survey No. 23 Barve Nagar, Mumbai – 400084, Maharashtra, India",
            phone: "+91 8047631651",
            email: "sales@sagenginnering.in"
        }
    ];

    const quickStats = [
        { icon: Phone, label: "24/7 Support", value: "Available" },
        { icon: Clock, label: "Response Time", value: "< 2 Hours" },
        { icon: Award, label: "Client Satisfaction", value: "98%" },
        { icon: Globe, label: "Years Experience", value: "15+" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            {/* Navigation */}
            {/* Hero Section */}

               <div className="bg-[#41BCF5] text-white py-20 relative overflow-hidden mt-10">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black mb-6">Contact Us</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
             Discover premium commercial kitchen equipment tailored to meet your needs. Let’s bring efficiency and innovation to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link href="/contact" >
              <button className="bg-white text-[#002F4C] px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Free Consultation
              </button>
              </Link>
              <Link href="/products/All">
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
                View Our Work
              </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
            <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    

                         <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                                <p className="text-gray-600">
                                    Fill out the form below and we&apos;ll get back to you within 2 hours during business hours.
                                </p>

                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="text-green-600" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for contacting us. We&apos;ll respond to your inquiry within 2 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Your Company Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Select Category</label>
                                        <select
                                            name="productInterest"
                                            value={formData.productInterest}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">Select a product category</option>
                                            <option value="Cooking Equipments">Cooking Equipments</option>
                                            <option value="Stainless Steel Products">Stainless Steel Products</option>
                                            <option value="Fast Food Equipments">Fast Food Equipments</option>
                                            <option value="Galley Equipments">Galley Equipments</option>
                                            <option value="Bakery Equipments">Bakery Equipments</option>
                                             <option value="Commercial Washing Equipments">Commercial Washing Equipments</option>
                                               <option value="Commercial Refrigeration">Commercial Refrigeration</option>
                                                 <option value="Work And Preparation Table">Work And Preparation Table</option>
                                                   <option value="Commercial Kitchen Exhaut Hood">Commercial Kitchen Exhaut Hood</option>
                                                     <option value="Food Processing Equipments">Food Processing Equipments</option>
                                                       <option value="Chapati Making Machine">Chapati Making Machine</option>
                                                        

                                        </select>
                                    </div>

                                    {/* <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Brief description of your inquiry"
                                            required
                                        />
                                    </div> */}

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="Please provide details about your requirements, specifications, quantities, etc."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-[#41BCF5] text-white py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group"
                                    >
                                        <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                                        Send Message
                                    </button>

                                    <p className="text-gray-500 text-sm text-center">
                                        * Required fields. We respect your privacy and will never share your information.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Office Details & Map */}
                        <div className="space-y-8">
                            {/* Office Information */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h3>
                                {officeDetails.map((office, index) => (
                                    <div key={index} className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-[#41BCF5] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                                <office.icon className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-3">{office.title}</h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-start space-x-3">
                                                        <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                                                        <p className="text-gray-600 whitespace-pre-line">{office.address}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Phone className="text-gray-400 flex-shrink-0" size={18} />
                                                        <p className="text-gray-600">{office.phone}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <Mail className="text-gray-400 flex-shrink-0" size={18} />
                                                        <p className="text-gray-600">{office.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
                                <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl h-64 flex items-center justify-center">
                                    <div className="text-center">
                                        <Navigation className="text-[#41BCF5] mx-auto mb-4" size={48} />
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h4>
                                        <p className="text-gray-600">Mumbai, Maharashtra</p>
                                        <button className="mt-4 bg-[#41BCF5] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                                            Get Directions
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Contact Info */}
                            <div className="bg-[#41BCF5] rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-6">Need Immediate Assistance?</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Smartphone className="text-blue-200" size={20} />
                                        <div>
                                            <p className="font-semibold">Emergency Hotline</p>
                                            <p className="text-blue-200">+91 8047631651</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Clock className="text-blue-200" size={20} />
                                        <div>
                                            <p className="font-semibold">Response Time</p>
                                            <p className="text-blue-200">Within 2 hours during business hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Award className="text-blue-200" size={20} />
                                        <div>
                                            <p className="font-semibold">Customer Satisfaction</p>
                                            <p className="text-blue-200">98% satisfaction rate</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                    

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-12 h-12 bg-[#41BCF5] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="text-white" size={24} />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Multiple ways to reach us - choose what works best for you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-600">
                                <div className={`w-16 h-16 bg-[#41BCF5] rounded-2xl flex items-center justify-center mb-6`}>
                                    <method.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{method.title}</h3>
                                <div className="space-y-2 mb-4">
                                    <p className="text-lg font-semibold text-gray-800">{method.primary}</p>
                                    <p className="text-gray-600">{method.secondary}</p>
                                </div>
                                <p className="text-gray-500 text-sm">{method.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Office Details */}
       

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">
                            Quick answers to common questions about our services and processes
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                question: "What is your typical lead time for custom equipment?",
                                answer: "Our standard lead time is 2-4 weeks depending on the complexity and specifications of your custom equipment. We'll provide an accurate timeline during our initial consultation."
                            },
                            {
                                question: "Do you provide installation and maintenance services?",
                                answer: "Yes, we offer complete installation services and ongoing maintenance support for all our equipment. Our technical team ensures proper setup and optimal performance."
                            },
                            {
                                question: "What quality certifications do you have?",
                                answer: "All our products meet industry standards for medical-grade and food-grade stainless steel equipment. We maintain strict quality control processes and can provide certification documentation."
                            },
                            {
                                question: "Can you create equipment based on our specific designs?",
                                answer: "Absolutely! We specialize in custom manufacturing. Provide us with your drawings, specifications, or requirements, and our engineering team will work with you to bring your vision to life."
                            },
                            {
                                question: "What is your warranty policy?",
                                answer: "We provide a comprehensive warranty on all our products, typically 1-2 years depending on the equipment type. This covers manufacturing defects and ensures your peace of mind."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Contact us today for a free consultation and quote. Our experts are ready to help
                        you find the perfect stainless steel solution for your needs.
                    </p>
                    <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:justify-center">
                        <button className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group">
                            Get Free Quote
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                        <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                            <Phone className="mr-2" size={20} />
                            Call Now
                        </button>
                    </div>
                </div>
            </section> */}
        </div>
    );
}