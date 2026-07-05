import { useLocation } from 'react-router-dom';

/** Clear the routing parameters of the authentication data */
export const resetAuthLoginDataFromRoute = () => {
  window.history.replaceState({}, '');
};
export function useResetLocationState() {
  const location = useLocation();
  return () => {
    // Clear the state of the location
    location.state = {};
    resetAuthLoginDataFromRoute();
  };
}
