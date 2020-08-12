<template>
  <div class="cart-item mb-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm">
          <!-- Shopping cart table -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 bg-light" style="width: 50%">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" class="border-0">
                    <div class="p-2">
                      <img
                        :src="product.image"
                        alt=""
                        width="70"
                        class="img-fluid rounded shadow-sm"
                      />
                      <div class="ml-3 d-inline-block align-middle w-75">
                        <h5 class="mb-0">
                          <a
                            href="#"
                            class="text-dark d-inline-block align-middle"
                            >{{ product.name }}</a
                          >
                        </h5>
                        <span
                          class="text-muted font-weight-normal font-italic d-block"
                          >{{ product.description }}</span
                        >
                      </div>
                    </div>
                  </th>
                  <td class="border-0 align-middle">
                    <strong>${{ product.price }}</strong>
                  </td>
                  <td class="border-0 align-middle"><strong>{{ product.manufacturer.name }}</strong></td>
                  <td class="border-0 align-middle">
                    <product-button :product="product"></product-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
