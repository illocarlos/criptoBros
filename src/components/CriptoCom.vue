        <script setup>


        const props = defineProps({
                    cotizacion: {
                        type: Object,
                        required: true,
        
                    },
               
            
})


        </script>
<template>
  <div 

  class="contenedor-resultado">

    <h2>Cotizacion</h2>

    <div class="resultado">
      <img 
      :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" 
      alt="imagen cripto">
      <div class="resul-p">
        <p>Precio actual : <span>{{ cotizacion.PRICE }}</span></p>
          <p>Precio mas alto del dia : <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>el precio mas bajo del dia: <span>{{ cotizacion.LOWDAY }}</span></p>
              <p>Variacion 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
                <p>ultima actualizacion <span>{{ cotizacion.LASTUPDATE }}</span></p>
                  <p>Conversion: <span>{{ cotizacion.CONVERSIONTYPE }}</span></p>
      </div>
    </div>
    </div>
</template>


