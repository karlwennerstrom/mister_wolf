<script setup>
import MenuAdministrador from '@/components/MenuAdministrador.vue';
</script>

<template>
    <main class="masthead">
    <div class="container-fluid">
        <div class="row">


            <div class="col-3">

                <!-- Componente de Admin -->
                <MenuAdministrador />

            </div>
            <div class="col-9">
                     <div class="acciones d-flex align-items-start  flex-column">

                        
                     </div>
                     <div class="card">
                        <div class="card-body">
                      
                          <router-link  class="btn btn-primary bg-morado boton  border-morado mb-3 " to="/admin/blog">BLOG POST</router-link>
                        </div>
                    </div>

            </div>
        </div>
           
    </div>
  </main>
</template>