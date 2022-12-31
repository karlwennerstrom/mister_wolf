<template>
      
    <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
            <div class="container px-5">
              
               <router-link class="navbar-brand fw-bold" to="/"><img src="/src/assets/img/logo---mr---wolf-2.png" class="logo-site" img-fluid alt=""></router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                 
                        <li class="nav-item">
                           <a class="nav-link  me-lg-3" aria-current="page" href="#" v-if="!isLoggedIn"><router-link to="/">Home</router-link></a>
                      </li>
                      <li class="nav-item">
                           <a class="nav-link  me-lg-3" aria-current="page" href="#" v-if="!isLoggedIn"><router-link to="/login">Login</router-link></a>
                      </li>
                      <li class="nav-item">
                         <a class="nav-link  me-lg-3" aria-current="page" href="#" v-if="!isLoggedIn"><router-link to="/registro">Registro</router-link></a>
                      </li>

                    </ul>
                    <div class="form-inline menu-usuario">
            <div class="card bg-lila border-lila m-2 boton btn creditos" v-if="isLoggedIn">Creditos: {{creditos}}</div>
            <button class="btn boton btn-primary bg-lila boton mt-0 border-lila m-2"  v-if="isLoggedIn"><router-link to="/admin">Panel</router-link></button>
            <button class="btn boton btn-primary bg-lila boton mt-0 border-lila m-2"  v-if="isLoggedIn"><router-link to="/cuenta">Cuenta</router-link></button>
            <button class="btn boton btn-primary bg-lila boton mt-0 border-lila m-2"  @click="handleSignOut" v-if="isLoggedIn">Log Out</button>
      </div>

                 
                </div>
            </div>
        </nav>







  <RouterView/>
</template>

<script>

export default {
  data(){
    return{
      isLoggedIn:false,
      creditos:0
    }
  },
}

</script>


<script setup>

import { RouterLink, RouterView } from 'vue-router'
import{onMounted,ref} from "vue"
import {getAuth,onAuthStateChanged,signOut} from "firebase/auth"
import {useRouter} from 'vue-router'


var creditos=ref(0)
var router=useRouter()



const isLoggedIn = ref(false)
let auth
onMounted(()=>{
  auth = getAuth()
  onAuthStateChanged(auth,(user)=>{
    if(user){
      isLoggedIn.value = true
    }else{
      isLoggedIn.value = false
    }
  })
  })

 const handleSignOut=()=>{
  signOut(auth).then(() => {
   router.push("/")
}).catch((error) => {
  console.log(error)
});


 }

</script>