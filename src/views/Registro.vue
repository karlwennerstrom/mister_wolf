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
                            <label for="nombre_usuario">Nombre de usuario</label>
                            <input type="text" id="nombre_usuario" class="border-morado rounded-1"  v-model="nombre_usuario" name="nombre_usuario" required>

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

                            <button class="btn btn-primary bg-morado boton mt-3 border-morado" @click="register"> Registro</button>
                            <button class="btn btn-primary bg-morado boton mt-3 border-morado" @click="signInWithGoogle"> Registro con Google</button>
                            <a class="btn btn-primary bg-lila boton mt-0 border-lila" href="/login">Login</a>
                        </div>
                    

                    
               
            </div>
        </div>
    </div>
   
</div>
      </main>
</template>

<script setup>

    import {ref} from "vue"
    import {getAuth, createUserWithEmailAndPassword } from "firebase/auth"
    import {useRouter} from 'vue-router'
    import axios from 'axios'


    const email = ref("")
    const password=ref("")
    const errMsg=ref("")
    const nombre_usuario=ref("")
    

    const router =useRouter()
    const register = () => {

       

        
        createUserWithEmailAndPassword(getAuth(),email.value,password.value)
            .then((data)=>{

                console.log("Registro correcto")
                console.log(data.user.uid)
                guardarUsuarioEnDB(data.user.uid,nombre_usuario.value,1,email.value);
                agregarCreditoInicial(data.user.uid)
                getDatosUsuario(data.user.uid)
                //guardarUsuarioEnDB(data.user.uid);
                router.push("/login")

            }
        ).catch((error)=>{

            console.log(error.code);
            switch(error.code){
                case "auth/email-already-exists":
                   // errMsg.value="El email ya está en uso"
                    console.log("El email ya está en uso")
                    break;
                case "auth/email-already-in-use":
                   errMsg.value="Ya existe una cuenta registrada con este correo, prueba con otro"
                    console.log("El email ya está en uso")
                    break;

                case "auth/invalid-email":
                   errMsg.value="El email no es válido"
                    break;
                    console.log("El email no es válido")
                case "auth/weak-password":
                  errMsg.value="La contraseña es demasiado débil"
                    break;
                    console.log( "La contraseña es demasiado débil")
                default:
                   errMsg.value="Error desconocido"
                    console.log("Error desconocido")
                    break;
            }
        }


        )
    }
    const signInWithGoogle =()=>{


    }

    //guardar usuario en DB mediante axios
    const guardarUsuarioEnDB = (uid,nombre,estado,email) => {
        const headers = {
    "Content-Type": "application/json"
  };    
        axios.post('http://localhost:3000/api/add/user', {
                id_usuario:uid,
                nombre_usuario:nombre,
                estado:estado,
                email:email,
                id_privilegio:1
             },{headers})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //agregar credito inicial de 3000 a usuario
    const agregarCreditoInicial = (uid) => {
        const headers = {
    "Content-Type": "application/json"
    };    
            axios.post('http://localhost:3000/api/add/credito', {
                    id_usuario:uid,
                    creditos:3000
                 },{headers})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    //obtener todos los datos del usuario
    const getDatosUsuario = (uid) => {
        const headers = {
                
    "Content-Type": "application/json"
    };    
            axios.get('http://localhost:3000/api/get/user/'+uid,{headers})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

</script>