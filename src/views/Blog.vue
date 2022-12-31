<script setup>
import MenuAdministrador from '@/components/MenuAdministrador.vue';
import TituloBlogContenedor from '@/components/TituloBlogContenedor.vue';
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";
</script>

<template>
  <main class="masthead">
    <div v-if="loading" class="loading">

      <div class="cargador"> <div class="lds-facebook"><div></div><div></div><div></div></div> </div>

    </div>
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

                          <div class="paso-1" v-if="pasos.paso_1">
                            <label for="input_tema" class="form-label"  >Tema (sobre que te gustaría hablar de tu blog):</label>
                              <textarea type="text" class="form-control input_tema" v-model="tema" id="input_tema"> </textarea>

                            
                              <label for="cantidad">Cantidad de ideas para titulo a generar</label>

                              <input type="number" id="cantidad" class="form-control" v-model="cantidad_ideas" name ="cantidad" min="1" max="5">
                              <div class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="generar_ideas()">Generar titulares</div>

                          </div>
                            
                          <div class="paso-2"  v-if="pasos.paso_2">
                            <div class="row">
                              <span> Selecciona el título que más te guste </span>
                              <div class="col-4" v-for="item in items" :key="item">
                                  <div :class="{active:item.selected}" class="card"  @click="seleccionar_titulo(item)" ref="resultado" >
                                      <div class="card-body">
                                          <h5 class="card-title">{{item.titulo}}</h5>
                                      </div>
                                  </div>
                              </div>
                              
                            </div>
                            <div class="row">
                              <div class="col-4">
                                
                                <div v-if="titulos_generados" class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="generar_bajada()">Generar bajada</div>
                                <div v-if="pasos.paso_2" class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="atras()">Atrás</div>

                              </div>

                            </div>

                          </div>

                          <div class="paso-3"  v-if="pasos.paso_3">
                            <span> Selecciona la bajada </span>
                        
                              <div class="row">
                                <div class="col-4" v-for="bajada in bajadas" :key="bajada">
                                  <div :class="{active:bajada.selected}" class="card"  @click="seleccionar_bajada(bajada)" ref="resultado" >
                                  <div class="card-body">
                                            <h5 class="card-title">{{bajada.titulo}}</h5>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="row">
                              <div class="col-4">
                                
                                <div v-if="bajada_seleccionada" class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="generar_contenido()">Generar Contenido</div>
                                <div v-if="pasos.paso_3" class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="atras()">Atrás</div>
                              </div>

                            </div>


                          </div>

                          <div class="paso-4" v-if="pasos.paso_4">

                           
                                <div class="container" id="contenido_final">
                                  <div class="row">
                                    <div class="col-10">

                                        <h1>{{ titulo_seleccionado_text }}</h1>
                                        <h4>{{ bajada_seleccionada_text }}</h4>
                                        <p>{{ contenido_seleccionado_text }}</p>
                                    </div>
                                  </div>

                                </div>
                               

                                <!-- <div v-if="contenidos_generados" class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="saveAsWord">Guardar Contenido</div> -->
                                <div v-if="contenidos_generados" class="btn btn-primary bg-morado boton  border-morado mb-3 mt-3"  @click="atras()">Atrás</div>
                             


                          </div>
                        
                        

                      
                          
                        </div>
                     

                        </div>
                    </div>

            </div>
        </div>
           
   
  </main>
</template>


<script>
let total_tokens=1000

const cantidad_ideas = ref('')
const tema = ref('')
const getInitialItems = () => []
const bajadasInitialItems=() => []

let id = 1 
let bajada_seleccionada=1

export default {
  data() {
    return {
      count: 0,
      loading:false,
      items:getInitialItems(),
      titulos_generados:false,
      bajadas_generadas:false,
      contenidos_generados:false,
      contenido_final_word:'',
      bajadas:bajadasInitialItems(),
      pasos:{
        paso_1:true,
        paso_2:false,
        paso_3:false,
        paso_4:false
      },
      titulo_seleccionado_text:'',
      bajada_seleccionada_text:'',
      contenido_seleccionado_text:''
    }
  },
  components:{
    TituloBlogContenedor
  },
  methods:{
    //funcion que muestra los pasos anteriores
    atras (){
      if(this.pasos.paso_2){
        this.pasos.paso_1=true
        this.pasos.paso_2=false
      }
      if(this.pasos.paso_3){
        this.pasos.paso_2=true
        this.pasos.paso_3=false
      }
      if(this.pasos.paso_4){
        this.pasos.paso_3=true
        this.pasos.paso_4=false
      }
    },
    
    async generar_ideas(){
      this.count=0
      // console.log(tema.value)
      // console.log(cantidad_ideas.value)
      this.loading=true;
      const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "escribe "+cantidad_ideas.value+" titulos de blog en español latinoamericano sobre el tópico " + tema.value,
      temperature: 0.3,
      max_tokens: 400
    });
    this.loading=false;
   
    this.titulos_generados=[]
    this.pasos.paso_1=false
    this.pasos.paso_2=true
    //console.log(this.count)
    console.log(response.data.choices[0]);
    let string_generado=response.data.choices[0].text

    //extraer los tituales de la respuesta, eliminar los \n\n y los \n y agregarlos a un array
  
    this.items=[]
    let ideas = string_generado.split(/\n\n|\n/).map( item => item.replace(/^\d\.?\s/, '').trim() );
    
   
    for(let i=0;i<ideas.length;i++){
      this.items.push({id:i,titulo:ideas[i],selected:false})
    }
    console.log(this.items)

    },
    seleccionar_bajada(item){

      console.log(item.titulo)
      item.selected=!item.selected
    }
    ,
    seleccionar_titulo(item){
      //al clickear por primera vez en un elemento, mostrar un boton para generar bajada
      if(this.count==0){
        this.titulos_generados=true
        this.count++
      }
      
      

      //obtener el contenido del div que se clickeo
      console.log(item.titulo)
      this.titulo_seleccionado_text=item.titulo
      bajada_seleccionada=item.id
      item.selected=!item.selected
      //cambiar el estado de selected a false a los demás elementos menos al que se clickeo
      for(let i=0;i<this.items.length;i++){
        if(this.items[i].id!=item.id){
          this.items[i].selected=false
        }
      }
      

    }
    ,async generar_bajada(){


      console.log('generar bajada')
      console.log(bajada_seleccionada)
      this.bajadas=[]
      //obtener el titulo seleccionado
      let titulo_seleccionado=''
      for(let i=0;i<this.items.length;i++){
        if(this.items[i].id==bajada_seleccionada){
          titulo_seleccionado=this.items[i].titulo
        }
      }
      console.log(titulo_seleccionado)
      this.loading=true;
      const response = await openai.createCompletion({
      model: "text-davinci-002",
      //prompt: "generar una esquema del blog para sobre este  titulo " + titulo_seleccionado + " de manera que sea atractiva y que llame la atencion del lector, maximo 100 caracteres",
      prompt: "generar una introducción tipo blog para el titulo " + titulo_seleccionado + " de no más de 100 caracteres",
      temperature: 0.3,
      max_tokens: 400
    });
    this.loading=false;
    this.pasos.paso_2=false
      this.pasos.paso_3=true
      this.contenidos_generados=true

    let string_generado=response.data.choices[0].text
    this.bajadas.push({titulo:string_generado,selected:false})
    this.bajada_seleccionada_text=string_generado
    console.log(string_generado);
    }
    ,
    async generar_contenido(){
      this.loading=true;
      const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "escribe un contenido de 500 palabras tipo blog sobre el siguiente titulo" + this.titulo_seleccionado_text + " y la siguiente bajada " + this.bajada_seleccionada_text,
      temperature: 0.3,
      max_tokens: 400
    });
    this.loading=false;
    
    this.pasos.paso_3=false
    this.pasos.paso_4=true
    //console.log(this.count)
    console.log(response.data.choices[0]);
    let contenido_generado=response.data.choices[0].text
    this.contenido_seleccionado_text=contenido_generado


    }
    ,
    async saveAsWord() {
      // Crea un nuevo documento Word
      
      const doc = new Document()

      // Crea un párrafo con el contenido del div y agrégalo al documento
      const paragraph = new Paragraph(this.divContent)
      doc.addParagraph(paragraph)

      // Crea una instancia de Packer para empaquetar el documento en un archivo
      // const packer = new Packer()
      // const buffer = await packer.toBuffer(doc)

      // Guarda el archivo en el servidor
      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("document.docx", buffer);
    })  ;
      
      // Ofrece al usuario descargar el archivo
      const link = document.createElement('a')
      link.href = '/document.docx'
      link.download = 'document.docx'
      link.click()
    }
  }
  ,mounted(){
    console.log('componente montado')
   
  }
}

import {ref} from "vue"
import {routerKey, useRouter} from 'vue-router'
import {Configuration,OpenAIApi} from 'openai'

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);



</script>