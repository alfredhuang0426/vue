<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container my-2">
        <router-link class="navbar-brand font-weight-bold" to="/"
          ><h1 class="h4 mb-0">Masala House</h1></router-link
        >        
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mx-3">
              <router-link class="nav-link active font-weight-bold" to="/Menu">菜單 Menu</router-link>           
            </li>
            <li class="nav-item mx-3">
               <router-link class="nav-link active font-weight-bold" to="/login">管理者後台</router-link>
            </li>
            <li class="nav-item mx-3">
              <router-link class="nav-link active" to="/cart">
                <i class="fas fa-shopping-cart cart">
                  <span class="badge badge-pill badge-danger cart-number" v-if="cartNumber">{{cartNumber}}</span>
                </i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return {
      cartNumber:0,
    };
  },
  methods:{
    //取得購物車內品項數量
    getCartNumber(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(url).then((response) => {
        var cart = response.data.data;
        vm.cartNumber = cart.carts.length;
      });
    },
  },
  created(){
    this.getCartNumber();
    const vm = this;
    //綁定bus事件使其可以被其他元件呼叫
    vm.$bus.$on('message:addCart', () => {
      vm.getCartNumber();
    });
  }
}
</script>