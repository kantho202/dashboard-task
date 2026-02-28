import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({children}) => {
    const {user, loading} = useAuth()
    
    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-greenImplementation of beautiful and modern animations and transitions.-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lg text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        )
    }
    
    if(!user){
        return <Navigate to="/login" replace />
    }
    
    return children;
};

export default PrivateRouter;