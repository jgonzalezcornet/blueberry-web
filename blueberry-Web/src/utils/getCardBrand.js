const getCardBrand = (number) => {
  const strNumber = String(number);
  if (/^4/.test(strNumber)) {
    return "visa";
  } else if (/^5[1-5]/.test(strNumber)) {
    return "mastercard";
  } else if (/^3[47]/.test(strNumber)) {
    return "amex";
  }
  return "unknown";
};

export default getCardBrand;