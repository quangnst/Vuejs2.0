<template>
  <div class="px-lg-0">
    <div class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 p-5 bg-white shadow-sm mb-5">
            <!-- Shopping cart table -->
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="border-0 bg-light">
                      <div class="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Price</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Manufacturer</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Remove</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
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
                    <td class="border-0 align-middle text-center"><strong>{{ product.manufacturer.name }}</strong></td>
                    <td class="border-0 align-middle text-center">
                      <router-link :to="'/admin/edit/' + product.id" class="text-dark mr-3">
                        <i class="fa fa-pencil-square-o"></i>
                      </router-link>
                      <a @click="deleteProduct(product.id)">
                        <i class="fa fa-trash"></i>
                      </a>
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
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.allProducts;
    },
  },
  created() {
    if (this.products.length === 0) {
      this.$store.dispatch("allProducts");
    }
  },
  methods: {
    deleteProduct(id) {
      this.$store.dispatch("removeProduct", id);
    },
  },
};
</script>
