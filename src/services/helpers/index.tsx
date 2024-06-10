const getProductType = (i: number) => {
  switch (i) {
    case 1:
      return "Xom tovuq";
    case 2:
      return "Yarim tayyor";
    default:
      return "-"
  }
};

export default {
  getProductType
};