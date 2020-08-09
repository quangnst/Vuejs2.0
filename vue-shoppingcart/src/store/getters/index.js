export const productGetters = {
  allProducts: state => {
    return state.products;
  },
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p.id == id)[0];
    } else {
      return state.product;
    }
  }
};

export const manufacturerGetter = {
  allManufacturers: state => state.manufacturers
};
