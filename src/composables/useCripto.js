import { onMounted, reactive, ref } from "vue"



export default function useCripto() {

    const cotizacion = ref({})
    const cargando = ref(false)
    const cripto = ref([])


    const cotizar = reactive({
        moneda: "",
        criptoMoneda: ""
    })
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ])

    onMounted(() => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD'
        fetch(url)
            .then(resp => resp.json())
            .then(({ Data }) => cripto.value = Data)

    })
    return {
        monedas,
        cotizar,
        cripto,
        cotizacion,
        cargando,
    }


}