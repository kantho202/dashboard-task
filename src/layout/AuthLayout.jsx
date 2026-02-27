import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto pt-3 '>
            <div className='flex justify-center'>
                <Link to="/" className='font-bold text-2xl p-4'>Donezo</Link>
            </div>
            <div className='flex justify-center items-center'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;