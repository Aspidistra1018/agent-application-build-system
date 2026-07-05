export const isMobileFromUA = () => {
  const { userAgent } = navigator;
  // Check if it is a mobile device
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );
};
