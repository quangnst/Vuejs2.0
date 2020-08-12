<template>
  <div class="product-details py-5 mb-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm">
          <section class="panel">
            <div class="panel-body row">
              <div class="col-md-6">
                <div class="pro-img-details">
                  <img
                    :src="product.image"
                    alt=""
                    width="70"
                    class="img-fluid rounded shadow-sm"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <h4 class="pro-d-title">
                  <a href="#" class="text-dark d-inline-block align-middle">{{
                    product.name
                  }}</a>
                </h4>
                <p class="text-muted font-weight-normal font-italic d-block">
                  {{ product.description }}
                </p>
                <div class="m-bot15">
                  <strong>Price : </strong>
                  <span class="amount-old">$544</span>
                  <span class="pro-price"> $300.00</span>
                </div>
                <div class="form-group">
                  <label>Quantity</label>
                  <input
                    type="quantiy"
                    placeholder="1"
                    class="form-control quantity"
                  />
                </div>
                <p>
                  <product-button :product="product"></product-button>
                </p>
              </div>
            </div>
          </section>
          <!-- End -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductButton from "./ProductButton";
export default {
  props: ["product"],
  components: {
    "product-button": ProductButton,
  },
};
</script>

<style scoped>
/*panel*/
.panel {
  border: none;
  box-shadow: none;
}

/*product list*/

.pro-img-details {
  margin-left: -15px;
}

.pro-img-details img {
  width: 100%;
}

.pro-d-title {
  font-size: 16px;
  margin-top: 0;
}

.pro-price {
  color: #fc5959;
}

.pro-price,
.amount-old {
  font-size: 18px;
  padding: 0 10px;
}

.amount-old {
  text-decoration: line-through;
}

.quantity {
  width: 120px;
}
</style>
