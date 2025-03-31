
import { NavigateFunction } from 'react-router-dom';

export const redirectUserBasedOnRole = (role: string, navigate: NavigateFunction): void => {
  console.log("Redirecting user based on role:", role);
  
  switch (role) {
    case 'admin':
      navigate('/admin');
      break;
    case 'artist':
      navigate('/artist-dashboard');
      break;
    case 'gallery':
      navigate('/gallery-dashboard');
      break;
    case 'buyer':
    default:
      navigate('/buyer-dashboard');
      break;
  }
};
