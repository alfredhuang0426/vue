<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"  style="z-index:20;">
      <h3 class="navbar-brand mb-0" to="/dashboard/products">後台管理</h3>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //登出
    signOut() {
      const api = `${process.env.APIPATH}/logout`;
      var vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          //登出成功後跳轉回登入頁
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>