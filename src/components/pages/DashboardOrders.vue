<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col" width="40%">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,key) in orders" :key="key">
          <th scope="row">{{order.create_at|date}}</th>
          <td>{{order.user.email}}</td>
          <td>
              <p v-for="(item,itemKey) in order.products" :key="itemKey" class="mb-0">
                  {{item.product.title}} : {{item.qty}}{{item.product.unit}}
              </p>
          </td>
          <td class="text-right">{{order.total|currency}}</td>
          <td>
              <span v-if="order.is_paid" class="text-success">確認付款</span>
              <span v-else class="text-danger">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :paginationObj="pagination" @getItems="getOrders"/>
  </div>
</template>

<script>
import Pagination from '../pagination';

export default {
  data() {
    return {
      orders: {},
      pagination:{},
      isLoading:false,
    };
  },
  methods: {
    //取得訂單列表
    getOrders(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      var vm = this;
      vm.isLoading = true;//啟動loading動畫特效
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;//結束loading動畫特效
      });
    },
  },
  created() {
    this.getOrders();
  },
  components:{
    Pagination,
  },
};
</script>