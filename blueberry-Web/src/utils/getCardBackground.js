const getCardBackground = (brand) => {
  switch(brand){
    case "visa":
      return "#023E8A";
    case "mastercard":  
      return "#DC6601";
    case "amex":
      return "#CFB503"
    default:
      return "#444444";
  }
};

export default getCardBackground;