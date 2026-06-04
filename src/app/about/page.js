"use client";
import React from 'react';
import { 
  ChevronRight, ArrowRight,
   Users, Target, Eye, Heart, CheckCircle,
  Factory, Shield, Zap, Settings, Globe, Trophy, User
} from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {

  const milestones = [
    {
      year: "2009",
      title: "Company Founded",
      description: "S.A.G. Engineering Products established in Mumbai under the leadership of Mister Prashant Gatkal"
    },
    {
      year: "2012",
      title: "Hospital Equipment Focus",
      description: "Specialized in medical-grade stainless steel equipment, including premium scrub sinks"
    },
    {
      year: "2015",
      title: "Food Industry Expansion",
      description: "Extended expertise to food & beverage equipment for commercial applications"
    },
    {
      year: "2018",
      title: "Kitchen Solutions",
      description: "Launched comprehensive home and hotel kitchen appliance manufacturing"
    },
    {
      year: "2021",
      title: "Quality Certification",
      description: "Achieved industry certifications and expanded client base to 200+ customers"
    },
    {
      year: "2024",
      title: "Market Leadership",
      description: "Serving 300+ satisfied clients with cutting-edge stainless steel solutions"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "We never compromise on quality. Every product undergoes rigorous testing to meet the highest industry standards."
    },
    {
      icon: Users,
      title: "Customer Centric",
      description: "Our clients' success is our success. We build lasting relationships through exceptional service and support."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously evolving our manufacturing processes and designs to stay ahead of industry trends."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Honest business practices, transparent communication, and ethical operations define our approach."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to eco-friendly manufacturing processes and sustainable business practices."
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Striving for perfection in every aspect of our business, from design to delivery."
    }
  ];

  const capabilities = [
    {
      icon: Factory,
      title: "Advanced Manufacturing",
      description: "State-of-the-art facility equipped with modern machinery for precision manufacturing",
      features: ["CNC Machining", "Welding Expertise", "Quality Control", "Custom Fabrication"]
    },
    {
      icon: Settings,
      title: "Custom Solutions",
      description: "Tailored designs and engineering solutions to meet specific client requirements",
      features: ["Design Consultation", "3D Modeling", "Prototype Development", "Scalable Production"]
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Comprehensive quality management system ensuring consistent product excellence",
      features: ["Material Testing", "Process Validation", "Final Inspection", "Performance Guarantee"]
    }
  ];

  const team = [
    {
      name: "Mister Prashant Gatkal",
      position: "Proprietor & Founder",
      experience: "15+ Years",
      description: "Visionary leader with extensive experience in stainless steel manufacturing and business development.",
      expertise: ["Business Strategy", "Quality Management", "Client Relations", "Product Development"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
       <div className="bg-[#41BCF5] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-black mb-6">SAG Engineering Products</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            At SAG Engineering Products, we take pride in being one of Mumbai’s premier providers of commercial kitchen equipment. With years of experience and a commitment to excellence, we are dedicated to transforming commercial kitchens into efficient, high-performing spaces that enable businesses to thrive. From state-of-the-art cooking ranges to advanced bakery equipment, our products are designed with precision, durability, and innovation at their core.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <button className="bg-white text-[#002F4C] px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Free Consultation
              </button>
              </Link>
              <Link href="/products/All" >
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
                View Our Work
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
     

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Who We Are</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>We are a trusted name in the food service industry, catering to restaurants, cafes, bakeries, hotels, and catering services. Our team of skilled professionals and engineers is driven by a passion for delivering quality products that meet the unique requirements of each client. Our focus is on creating solutions that not only enhance productivity but also provide long-lasting value.</p>

<p>At SAG Engineering Products, we don’t just sell equipment; we deliver trust, quality, and performance with every product we offer.</p>

{/* <p>Today, we specialize in three core areas: medical-grade hospital equipment including premium scrub sinks, commercial food &amp; beverage processing equipment, and high-quality kitchen appliances for both residential and hospitality sectors. Each product is crafted with precision and built to last, reflecting our unwavering commitment to quality.</p> */}


              </div>
            </div>
            <div className="relative">
              <div className="bg-[#41BCF5] rounded-3xl p-8">
                <img 
                  src="./Galley Equipment 2.jpg" 
                  alt="Manufacturing Facility" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#41BCF5] rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Mister Prashant Gatkal</p>
                    <p className="text-gray-600 text-sm">Founder & Proprietor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#41BCF5] rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Target className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To deliver exceptional stainless steel solutions that exceed customer expectations while 
                maintaining the highest standards of quality, innovation, and service excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#41BCF5] rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Eye className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become India s leading manufacturer of premium stainless steel equipment, recognized 
                for innovation, reliability, and customer-centric solutions across all industries we serve.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#41BCF5] rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Heart className="text-white" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Integrity, quality, innovation, and customer satisfaction form the foundation of everything 
                we do, ensuring lasting partnerships and sustainable business growth.
              </p>
            </div>
          </div>

          {/* Core Values Grid */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">What Drives Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-14 h-14 bg-[#41BCF5] to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership - the milestones that shaped S.A.G. Engineering Products
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#41BCF5] to-orange-500"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'}`}>
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#41BCF5] rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {milestone.year.slice(-2)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#002F4C]">{milestone.title}</h3>
                        <p className="text-[#002F4C] font-semibold">{milestone.year}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full border-4 border-white shadow-lg lg:block hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art facilities and expertise that enable us to deliver exceptional results
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#41BCF5] rounded-2xl flex items-center justify-center mb-8">
                  <capability.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{capability.description}</p>
                <div className="space-y-3">
                  {capability.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leadership driving innovation and excellence in stainless steel manufacturing
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-3xl p-12 shadow-lg">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                      <User className="text-white" size={60} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-2">{member.position}</p>
                    <p className="text-gray-600 font-medium">{member.experience}</p>
                  </div>
                  
                  <div className="lg:col-span-2 space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">{member.description}</p>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Areas of Expertise</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {member.expertise.map((skill, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <ChevronRight className="text-blue-600 flex-shrink-0" size={18} />
                            <span className="text-gray-700">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#41BCF5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the S.A.G. Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 300+ satisfied clients who trust us for their stainless steel equipment needs. 
    Let&#39;s discuss how we can serve your requirements with precision and excellence.

          </p>
          <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:justify-center">
            <Link href="/contact">
            <button className="w-full sm:w-auto bg-white text-[#002F4C] px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group">
              Contact Us Today
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            </Link>
            <Link href="/products/All">
            <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#002F4C] transition-all duration-300">
              View Our Products
            </button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}