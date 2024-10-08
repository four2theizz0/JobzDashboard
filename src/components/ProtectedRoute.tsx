import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;