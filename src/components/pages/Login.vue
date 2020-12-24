<template>
  <div>
    <div class="container mt-5">
      <div class="row  justify-content-center">
        <div class="col-md-4">
          <div>
              <p class="text-primary text-center h3">管理員登入</p>
          </div>
          <form @submit.prevent="signIn">
            <div class="form-group">
              <label for="account">帳號</label>
              <input
                type="text"
                class="form-control"
                id="account"
                placeholder="account"
                v-model="user.username"
              />
            </div>
            <div class="form-group">
              <label for="password">密碼</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="password"
                v-model="user.password"
              />
            </div>
            <div>
                <button type="submit" class="btn btn-primary mb-2 btn-block">登入</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //登入
    signIn() {
      const api = `${process.env.APIPATH}/admin/signin`;
      var vm = this;
      this.$http.post(api,vm.user).then((response) => {
        if(response.data.success){
            //登入成功則跳轉至後台管理頁面
            vm.$router.push('/dashboard/products');
        }else{
            alert('登入失敗');
        }
      });
    },
  },
};
</script>