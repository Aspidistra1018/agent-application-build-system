import { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    location.href = `https://www.coze.cn${location.pathname}`;
  }, []);
  return null;
};

export default Redirect;
