import React from 'react';
import { NavLink, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='flex flex-col md:flex-row min-h-screen'>

            {/* Left Side - Forms */}
            <div className='flex-1'>
                <Outlet />
            </div>

            {/* Right Side - Welcome Section */}
            <div className="flex-1 relative overflow-hidden text-base-content">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#89c74a] via-[#a5e067] to-[#6aa637] opacity-95 z-0"></div>

                {/* Decorative blob */}
                <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full top-20 right-20 blur-3xl z-0"></div>

                {/* Text content */}
                <div className="relative z-10 flex items-center justify-center h-full px-6 py-12 text-center text-white">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                            Welcome to LocalMarket Tracker
                        </h1>
                        <p className="text-lg leading-relaxed opacity-90">
                            Track real-time prices, discover local offers, and shop smarter with your neighborhood market insights.
                        </p>
                        <p className="text-sm opacity-80">
                            Your one-stop solution for comparing essentials and saving money — anytime, anywhere.
                        </p>
                        <NavLink to='/'>
                            <button className='btn bg-white text-[#6aa637] hover:bg-[#89c74a] hover:text-white border-none shadow-lg'>
                                Back to Home
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
