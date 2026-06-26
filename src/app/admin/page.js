  "use client";
  import React, { useState } from 'react';
  import {    Menu, X, Image, List, PlusSquare, FileText } from 'lucide-react';

  import Post from '@/admincom/Post';
  import CreateCategory from '@/admincom/CreateCategory';
  import Createcatalogue from '@/admincom/Createcatalogue';
  import HomeImagesManager from '@/admincom/HomeImagesManager';
  import ProductAdding from '@/admincom/ProductAdding';
  import Productget from '@/admincom/Productget';

  export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('users');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
      <div className="flex h-screen bg-gray-50 mt-40">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden`}>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-red-600">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">SAG Management</p>
          </div>
          
          <nav className="p-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === 'users' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText  size={20} />
              <span className="font-medium">Create Blog and View</span>
            </button>
            
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === 'bookings' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <PlusSquare  size={20} />
              <span className="font-medium">Category Management</span>
            </button>
            <button
              onClick={() => setActiveTab('carpermit')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === 'carpermit' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <List  size={20} />
              <span className="font-medium">Create Catalogue</span>
            </button>
            
            <button
              onClick={() => setActiveTab('transactions')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'transactions' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Image  size={20} />
              <span className="font-medium">Home Images</span>
            </button>
            <button
              onClick={() => setActiveTab('productadding')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'productadding' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Image  size={20} />
              <span className="font-medium">Product Add</span>
            </button>
              {/* <button
              onClick={() => setActiveTab('product')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'product' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Image  size={20} />
              <span className="font-medium">Product</span>
            </button> */}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
        
          </div>

          {/* Stats Cards */}
          <div className="p-6">


            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">     

              <div className="overflow-x-auto">
                  {activeTab === "users" && <Post />}
                  {activeTab === "bookings" && <CreateCategory />}
                  {activeTab === "carpermit" && <Createcatalogue />}
                  {activeTab === "transactions" && <HomeImagesManager />}
                  {activeTab === "productadding" && <ProductAdding />}
                  {activeTab === "product" && <Productget />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }