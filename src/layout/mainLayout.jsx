import React from 'react';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer';


const mainLayout = () => {
    return (
        <div>
            <Header>
            </Header>
            <main className="min-h-[calc(100vh-335px)]">
                <Outlet></Outlet>
            </main>
            
            <Footer></Footer>
            
        </div>
    );
};

export default mainLayout;