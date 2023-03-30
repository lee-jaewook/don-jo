export const calculateEth = (price = 0) =>
  parseFloat(Math.round(price * 100) / 100).toFixed(3);
