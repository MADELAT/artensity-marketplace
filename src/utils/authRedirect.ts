
import { NavigateFunction } from 'react-router-dom';

export const redirectUserBasedOnRole = (role: string, navigate: NavigateFunction): void => {
  console.log("Redirecting user based on role:", role);
  
  switch (role) {
    case 'admin':
      navigate('/dashboard/admin');
      break;
    case 'artist':
      navigate('/dashboard/artist');
      break;
    case 'gallery':
      navigate('/dashboard/gallery');
      break;
    case 'buyer':
    default:
      navigate('/home');
      break;
  }
};
