<template>
  <div class="bg-primary-lighter page-min-height">
    <loading :active.sync="isLoading"></loading>
    <div class="py-5 text-center" v-if="cartShow">
      <h2>已選購商品</h2>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7" v-for="item in cart.carts" :key="item.id">
            <div class="media mt-3">
              <div
                class="bg-cover picture-small"
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
              <div class="media-body text-left px-3">
                <h5 class="mt-0">{{ item.product.title }}</h5>
                <p>{{ item.product.description }}</p>
                <div class="d-flex justify-content-between">
                  <p>{{ item.qty }}/{{ item.product.unit }}</p>
                  <p>{{ item.final_total }}元</p>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="removeCartItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div class="col-md-7 my-3">
            <p class="text-right h3">總計 : {{ cart.total }}元</p>
          </div>
          <div class="col-md-7">
            <h3>資料填寫</h3>
            <form class="text-left" @submit.prevent="createOrder">
              <div class="form-group">
                <label for="useremail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="useremail"
                  v-model="form.user.email"
                  placeholder="請輸入 Email"
                  required
                />
                
              </div>

              <div class="form-group">
                <label for="username">收件人姓名</label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="username"
                  v-model="form.user.name"
                  placeholder="輸入姓名"
                  required
                />
                
              </div>

              <div class="form-group">
                <label for="usertel">收件人電話</label>
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="form.user.tel"
                  placeholder="請輸入電話"
                  required
                />
              </div>

              <div class="form-group">
                <label for="useraddress">收件人地址</label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  id="useraddress"
                  v-model="form.user.address"
                  placeholder="請輸入地址"
                  required
                />
                
              </div>

              <div class="form-group">
                <label for="comment">留言</label>
                <textarea
                  name=""
                  id="comment"
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                ></textarea>
              </div>
              <div class="text-right">
                <button class="btn btn-primary">送出訂單</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5 text-center" v-else>
      <p class="h2 mb-3">購物車還沒有東西喔，趕緊去選購吧</p>
      <router-link class="btn btn-outline-primary font-weight-bold" to="/Menu"><i class="fas fa-arrow-left"></i> 點我看菜單</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cartShow:false,
      isLoading:false,
    };
  },
  methods: {
    //取得購物車資料
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;//啟動loading動畫特效
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        //判斷購物車內有無品項
        if(vm.cart.carts.length!=0)
          vm.cartShow = true;
        else
          vm.cartShow = false;
        vm.isLoading = false;//結束loading動畫特效
      });
    },
    //移除購物車品項
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(url).then(() => {
        //移除完後重新取得購物車品項
        vm.getCart();
        //更新購物車數量圖標
        this.$bus.$emit("message:addCart");  
      });
    },
    //建立訂單(會同時清空購物車資料)
    createOrder(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      this.$http.post(url, { data: order }).then((response) => {
            if (response.data.success) {
              //更新購物車數量圖標
              this.$bus.$emit("message:addCart");  
              //跳轉至訂單頁面
              vm.$router.push(`/customerCheckout/${response.data.orderId}`);
            }
          });
    }
  },
  created() {
    this.getCart();
  },
};
</script>