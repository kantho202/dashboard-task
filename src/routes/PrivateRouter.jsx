import React from 'react';

import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({children}) => {
    const {user, loading} =useAuth()
    if(loading){
        <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading ...</p>
      </div>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRouter;