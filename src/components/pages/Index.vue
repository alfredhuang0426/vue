<template>
  <div>
    <IndexNavbar/>
    <router-view></router-view>
    <IndexFooter/>
  </div>
</template>

<script>
import IndexNavbar from '../IndexNavbar';
import IndexFooter from '../IndexFooter';

export default {
  components:{
        IndexNavbar,
        IndexFooter,
    }
}
</script>