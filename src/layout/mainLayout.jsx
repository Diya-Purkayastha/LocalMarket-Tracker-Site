import React from 'react';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer';


const mainLayout = () => {
    return (
        <div>
            <Header>
            </Header>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default mainLayout;