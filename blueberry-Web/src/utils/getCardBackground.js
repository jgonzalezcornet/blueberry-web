const getCardBackground = (brand) => {
  switch(brand){
    case "visa":
      return "#FFAE08";
    case "mastercard":  
      return "#5B2908";
    case "amex":
      return "#081437"
    default:
      return "#444444";
  }
};

export default getCardBackground;