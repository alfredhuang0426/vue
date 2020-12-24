<template>
  <div class="bg-primary-lighter page-min-height">
    <div class="container py-5">
      <AlertMessage/>
      <div class="row">
        <div class="col-md-3 mb-3">
          <MenuSidebar/>
        </div>
        <div class="col-md-9">
          <MenuProducts/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MenuProducts from '../MenuProducts';
import MenuSidebar from '../MenuSidebar';
import AlertMessage from '../AlertMessage';

export default {
    components:{
        MenuProducts,
        MenuSidebar,
        AlertMessage
    }
    
}
</script>