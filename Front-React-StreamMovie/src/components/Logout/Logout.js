import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAndRedirect = async () => {
      await onLogout();
      setTimeout(() => {
        navigate('/auth');
      }, 100); // Retrasa ligeramente la navegación
    };

    logoutAndRedirect();
  }, [onLogout, navigate]);

  return null;
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
