<template>
  <div>
    <div class="admin-new">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="admin-menu d-flex mb-2">
              <router-link to="/admin" class="mr-2">View Products</router-link>
              <router-link to="/admin/new" class="ml-2">New Product</router-link>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
  .admin-menu a {
    display: block;
    background: #fef577;
    color: #3D3D3D;
    padding: 20px 15px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    transform: scaleX(1);
    transition: transform 200ms ease-in;
  }
  .admin-menu a:hover {
    text-decoration: none;
    transform: scaleX(1.02);
  }
  .admin-new, .admin-products {
    padding: 30px 0;
  }
</style>