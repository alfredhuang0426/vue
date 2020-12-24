<template>
  <div>
    <DashboardNavbar/>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2 bg-light border-right sidebar px-0">
                <DashboardSidebar/>
            </div>
            <div class="col-md-10 ml-auto">
                <router-view></router-view>
            </div>    
        </div>        
    </div>
  </div>
</template>


<script>

import DashboardNavbar from '../DashboardNavbar';
import DashboardSidebar from '../DashboardSidebar';

export default {
    components:{
        DashboardNavbar,
        DashboardSidebar,
        
    }    
}
</script>
