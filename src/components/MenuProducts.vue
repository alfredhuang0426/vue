<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="all"
        role="tabpanel"
        aria-labelledby="list-home-list"
      >
        <div class="row">
          <div class="col-md-4" v-for="(item, key) in products" :key="key">
            <div class="card bg-transparent border-0">
              <div
                class="card-img-top bg-cover picture"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
              <div class="card-body px-0">
                <a href="#" @click.prevent="openProductModel(item)"
                  ><h5 class="card-title text-primary-darker font-weight-bold">
                    {{ item.title }}
                  </h5></a
                >
                <p class="card-text text-right">
                  <span class="text-danger">{{ item.price | currency }}</span>
                  <del class="text-primary-darker">{{
                    item.origin_price | currency
                  }}</del>
                </p>
                <a href="#" class="btn btn-primary btn-block" @click.prevent="addToCart(item.id)">加到購物車</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade"
        :id="type"
        role="tabpanel"
        aria-labelledby="list-profile-list"
        v-for="(type, key) in productTypes"
        :key="key"
      >
        <div class="row">
          <div
            class="col-md-4"
            v-for="(item, key) in classifiedProducts[type]"
            :key="key"
          >
            <div class="card bg-transparent border-0">
              <div
                class="card-img-top bg-cover picture"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
              <div class="card-body px-0">
                <a href="#" @click.prevent="openProductModel(item)"
                  ><h5 class="card-title text-primary-darker font-weight-bold">
                    {{ item.title }}
                  </h5></a
                >
                <p class="card-text text-right">
                  <span class="text-danger">{{ item.price | currency }}</span>
                  <del class="text-primary-darker">{{
                    item.origin_price | currency
                  }}</del>
                </p>
                <a href="#" class="btn btn-primary btn-block" @click.prevent="addToCart(item.id)">加到購物車</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary-lighter">
            <h5
              class="modal-title text-primary-darker font-weight-bold"
              id="exampleModalLabel"
            >
              {{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              class="card-img-top bg-cover picture-big"
              :style="{ backgroundImage: `url(${tempProduct.imageUrl})` }"
            ></div>
            <p class="text-right h3 mt-3">
              <span class="text-danger">{{ tempProduct.price | currency }}</span>
              <del class="text-primary-darker">{{
                tempProduct.origin_price | currency
              }}</del>
            </p>
            <p>{{ tempProduct.description }}</p>
            <p>{{ tempProduct.content }}</p>
            <div class="form-group">
              <label for="productNum">選購數量</label>
              <select class="form-control" id="productNum" v-model="tempProduct.num">
                <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{tempProduct.unit}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-block" @click="addToCart(tempProduct.id,tempProduct.num)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      productTypes: [],
      classifiedProducts: {},
      tempProduct: {
        
      },
      isLoading:false,
    };
  },
  methods: {
    //取得產品列表
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      var vm = this;
      vm.productTypes = [];
      vm.isLoading = true;//啟動loading動畫特效
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products;
          vm.products.forEach((element) => {
            //盤點類別
            if (!vm.productTypes.includes(element.category))
              vm.productTypes.push(element.category);
            //盤完類別後幫商品做分類
            if (!Object.keys(vm.classifiedProducts).includes(element.category))
              vm.classifiedProducts[element.category] = [element];
            else vm.classifiedProducts[element.category].push(element);
          });
        }
        vm.isLoading = false;//結束loading動畫特效
      });
    },
    //開啟產品細節視窗
    openProductModel(item) {
      this.tempProduct = item;
      $("#productModal").modal("show");
      this.tempProduct.num = 1;
    },
    //加入購物車
    addToCart(itemId,qty=1){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: itemId,
        qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {     
        if(response.data.success)
          this.$bus.$emit("message:push",response.data.message,"success");  
        $("#productModal").modal("hide");
        //更新購物車數量圖標
        this.$bus.$emit("message:addCart");  
      });
      
    }
  },
  created() {
    this.getProducts();
  },
};
</script>