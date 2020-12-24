<template>
  <div>
    <h5 class="mt-3 px-3 font-weight-bold">管理員</h5>

    <div class="list-group rounded-0">
      <router-link to="/dashboard/products" @click.native="changeStatus('products')" :class="{'active':status==='products'}" class="list-group-item list-group-item-action border-0 bg-transparent dashboardlist-group-item">
        產品列表
      </router-link>
      <router-link to="/dashboard/orders" @click.native="changeStatus('orders')" :class="{'active':status==='orders'}" class="list-group-item list-group-item-action border-0 bg-transparent dashboardlist-group-item">
        訂單列表
      </router-link>
      
    </div>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  data() {
    return {
      status:'products',
    };
  },
  methods: {
    changeStatus(status){
      this.status = status;
    }
  },
  created() {},
};
</script>