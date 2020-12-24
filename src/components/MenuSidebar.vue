<template>
  <div class="sticky-top" style="top:10px;">
    <div >
      <div class="list-group rounded-0" id="list-tab" role="tablist">
      <a
        class="list-group-item list-group-item-action active"
        id="list-home-list"
        data-toggle="list"
        href="#all"
        role="tab"
        aria-controls="home"
        >所有商品</a
      >
      <a
        class="list-group-item list-group-item-action"
        id="list-profile-list"
        data-toggle="list"
        :href="'#'+item"
        role="tab"
        aria-controls="profile"
        v-for="(item,key) in productTypes"
        :key=key
        >{{item}}</a
      >
      
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      productTypes:[],
    }
  },
  methods: {
    //取得產品列表，計算有哪些類別
    getProductTypes(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      var vm = this;
      vm.productTypes = [];
      this.$http.get(api).then((response) => {
        if(response.data.success){
          var products = response.data.products;
          products.forEach(element => {
          if(!vm.productTypes.includes(element.category))
            vm.productTypes.push(element.category);
        });
        }
      });
    }
  },
  created(){
    this.getProductTypes();
  }
}
</script>