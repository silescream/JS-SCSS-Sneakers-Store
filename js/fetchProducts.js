export const fetchProducts = async () => {
    try {
      let result = await fetch("js/database.json");
      let products = await result.json();
  
      return products;
    } catch (error) {
      console.log(error);
    }
  };
  