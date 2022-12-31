<template>
    <main class="masthead">
<div class="container">

    <div class="row d-flex justify-content-center ">
    <div class="contenedor-logo text-center">
        <img src="src/assets/img/logo---mr---wolf-2.png" class="" img-fluid alt="">
    </div>
    </div>

    <div class="row d-flex justify-content-center">
        <div class="col-md-6 borde-cajas rounded-1">
            

            <div class="contenedor-formulario ">
                
               

                        <div v-if="errMsg" class="resultado_login mt-3 ">
                            <span>{{errMsg}}</span>
                        </div>
                    

                        <div class="input mt-3">
                            <label for="email">Email</label>
                            <input type="email" id="email" class="border-morado rounded-1"  v-model="email" name="email" required>
                        </div>
                        <div class="input mt-3">
                            <label for="password">Password</label>
                            <input type="password" id="password" class="border-morado rounded-1" v-model ="password" name="password" required>
                        </div>


                        <div class="d-grid gap-2">

                            <button class="btn btn-primary bg-morado boton mt-3 border-morado" @click="login"> Login</button>
                            <button class="btn btn-primary bg-morado boton mt-3 border-morado" @click="signInWithGoogle"> Registro con Google</button>
                            <a class="btn btn-primary bg-lila boton mt-0 border-lila" href="#"><router-link to="/registro">Registro</router-link></a>
                        </div>
                    

                    
               
            </div>
        </div>
    </div>
   
</div>
</main>
</template>

<script setup>

    import {ref} from "vue"
    import {getAuth, signInWithEmailAndPassword } from "firebase/auth"
    import {useRouter} from 'vue-router'

    const email = ref("")
    const password=ref("")
    const router =useRouter()
    const errMsg =ref()

    const login = () => {
        const auth=getAuth()
        signInWithEmailAndPassword(auth,email.value,password.value)
            .then((data)=>{

                console.log("Logeado correctamente")
                console.log(auth.currentUser)
                
                router.push("/admin")
            })
            .catch((error)=>{
             console.log(error.code);
            switch(error.code){
                case "auth/wrong-password":
                    errMsg.value="Contraseña incorrecta"
                    break;
                case "auth/invalid-email":
                    errMsg.value="El email no es válido"
                    break;
                case "auth/weak-password":
                    errMsg.value="La contraseña es demasiado débil"
                    break;
                default:
                    errMsg.value="Error desconocido"
                    break;
            }


            })
    }
    const signInWithGoogle =()=>{}
</script>