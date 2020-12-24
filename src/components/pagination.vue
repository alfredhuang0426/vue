<template>
  <div>
    <nav aria-label="Page navigation example ">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !paginationObj.has_pre }"
        @click.prevent="getPages('pre')">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="(page, key) in paginationObj.total_pages"
          :key="key"
          :class="{ active: paginationObj.current_page === page }"
          @click.prevent="getPages('cur', page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !paginationObj.has_next }"
        @click.prevent="getPages('next')">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["paginationObj"],
  methods: {
    //切換頁面
    getPages(page, curpage="") {
      if (page === "pre") {
        //如果無下一頁，則無法動作
        if(!this.paginationObj.has_pre)
          return;
        this.$emit("getItems", this.paginationObj.current_page - 1);
      } else if (page === "next") {
        //如果無上一頁，則無法動作
        if(!this.paginationObj.has_next)
          return;
        this.$emit("getItems", this.paginationObj.current_page + 1);
      } else {
        this.$emit("getItems", curpage);
      }
    },
  },
};
</script>