<template>
  <div>
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div
          class="carousel-item carousel-header-item bg-cover active"
          style="background-image: url(/static/images/food1.jpg)"
        >
          <div class="carousel-caption d-none d-md-block">
            <h2>Indian Curry</h2>
            <p>經典印度咖哩。香氣四溢</p>
          </div>
        </div>
        <div
          class="carousel-item carousel-header-item bg-cover-top"
          style="background-image: url(/static/images/food2.jpg)"
        >
          <div class="carousel-caption d-none d-md-block">
            <h2>Samosa</h2>
            <p>試試我們新推出的咖哩餃吧</p>
          </div>
        </div>
        <div
          class="carousel-item carousel-header-item bg-cover-top"
          style="background-image: url(/static/images/food3.jpg)"
        >
          <div class="carousel-caption d-none d-md-block">
            <h2>Naan</h2>
            <p>享受剛出爐的印度烤餅！</p>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
$(document).ready(() => {
  //設定輪播圖片速度
  $('.carousel').carousel({
     interval: 3000
  })
})

export default {};
</script>