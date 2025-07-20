import React from 'react';
import logo from '../../../public/logo.jpg'

const Logo = () => {
    return (
        <div className='flex gap-1 items-center'>
            <img src={logo} alt="" className="w-10 rounded-full"/>
            <a className=" text-xl text-white cursor-pointer" href='/' ><div className="md:text-2xl text-white text-neutral font-medium"><h1>LocalMarket Tracker</h1></div></a>

        </div>
    );
};

export default Logo;