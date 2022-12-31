<script setup>
import MenuAdministrador from '@/components/MenuAdministrador.vue';
</script>

<template>
  <main>
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
                            <label for="input_concepto" class="form-label"  >Ingresa el texto:</label>
                        <textarea type="text" class="form-control input_concepto" v-model="concepto" id="input_concepto"> </textarea>

                        <div class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="extraer_concepto">Extraer Concepto</div>

                        <textarea type="text" class="form-control input_concepto  mt-3" v-model="salida" id="salida"> </textarea>
                        </div>
                    </div>

            </div>
        </div>
           
    </div>
  </main>
</template>


<script>
import {ref} from "vue"
import {useRouter} from 'vue-router'
const concepto = ref('')
const salida = ref('')


import {Configuration,OpenAIApi} from 'openai'
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);


async function  extraer_concepto()  {
    
   //escribe 3 slogan, cortos, directos y espectaculares sobre

    const response = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: "Extraer el resumen de la siguiente frase: " + concepto.value,
  temperature: 0.6,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 1,
});
console.log(response.data.choices[0].text)
salida.value=response.data.choices[0].text


}


</script>