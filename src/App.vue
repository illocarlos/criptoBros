<script setup>
import { computed, onMounted,reactive, ref } from "vue";
import Alert from './components/Alert.vue';
import Spinner from "./components/Spinner.vue";
import useCripto from './composables/useCripto'
import CriptoCom from "./components/CriptoCom.vue";

const{ monedas, cotizar, cripto, cotizacion,cargando }=useCripto()

const error = ref("")

const Cotizaciones = () => {
  if (Object.values(cotizar).includes("")) {
   error.value='todo los campos son obligatorios'
    return
  }
  error.value = ''
obtenerCotizacion()
}

const obtenerCotizacion = async () => {
  cargando.value = true
  cotizacion.value = {}
  const { moneda, criptoMoneda } = cotizar
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
  
  const respuesta = await fetch(url)
  const data = await respuesta.json()
  setTimeout(() => {
  cotizacion.value= data.DISPLAY[criptoMoneda][moneda]
  cargando.value = false
},3000)
}
const monstrarResultado = computed(() => {
 return Object.values(cotizacion.value).length
})

</script>

<template>
<div class="contenedor">
<h1 class="titulo">cotizador de <span>criptomoneda</span></h1>

<div class="contenido">

  <form 
  class="formulario">
    <Alert
    v-if="error"
  >{{ error }}</Alert>
    <div class="campo">
      <label for="moneda">Moneda:</label>
      <select
      v-model="cotizar.moneda"
      id="moneda">
        <option value="">--seleciona moneda--</option>
          <option v-for="moneda in monedas" 
          :key="moneda.codigo"
          :value="moneda.codigo">{{ moneda.texto }}</option>
      </select>

   <label for="cripto">cripto:</label>
        <select  
         v-model="cotizar.criptoMoneda"
        id="cripto">
          <option value="">--seleciona moneda--</option>
            <option v-for="criptomoneda in cripto" 
            :key="criptomoneda.CoinInfo.Id"
            :value="criptomoneda.CoinInfo.Name">{{ criptomoneda.CoinInfo.FullName }}</option>
        </select>
    </div>
<button
  @click.prevent="Cotizaciones"
type="submit" value="cotizar">cotizar</button>
</form>
  <Spinner
  v-if="cargando"
  />

<CriptoCom
   v-if="monstrarResultado > 0"
   :cotizacion="cotizacion"
/>
</div>
</div>

</template>


