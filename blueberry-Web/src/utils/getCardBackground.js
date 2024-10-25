const getCardBackground = (brand) => {
  switch(brand){
    case "visa":
      return "#292E63";
    case "mastercard":  
      return "#E0D2A3";
    case "amex":
      return "#081F97"
    default:
      return "#444444";
  }
};

export default getCardBackground;