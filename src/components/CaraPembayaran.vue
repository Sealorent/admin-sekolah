<template>
    <div class="flex flex-col h-100">
        <header class="bg-primaryColors sticky top-0">
            <div class="flex flex-row justify-between">
                <font-awesome-icon class="text-white m-4" icon="arrow-left" @click="$router.go(-1)" />
                <p class="text-center text-white font-[500px] font-montserrat py-4">Cara Pembayaran</p>
                <p class="m-4 "></p>
            </div>
        </header>
        <main class="flex-grow mt-4">
           <div class="container">
            <div class="flex flex-row justify-between w-full">
                <div>
                    <p class="font-mulish text-[20px]">{{ result.bank ?? '' }}</p>
                    <p class="font-mulish text-sm">{{ result.bayar_via }}</p>
                </div>
                <img :src="payment.logo" alt="" class="w-20">
            </div>
            <div class="mt-4">
                <p class="font-mulish">No. Virtual Account</p>
                <div class="flex flex-row w-full justify-between">
                    <p class="font-mulish">{{ result.va }}</p>
                    <p class="font-montserrat text-green-600">Salin</p>
                </div>
            </div>
            <div class="mt-4">
                <p class="font-mulish">Total Pembayaran</p>
                <p class="font-mulish">{{ rupiah( parseInt(result.total) + parseInt(result.fee) ) }}</p>
            </div>
            <div class="mt-4">
                <p class="font-mulish">Biaya Admin</p>
                <p class="font-mulish">{{ rupiah(result.fee) }}</p>
            </div>
            <div class="mt-4">
                <p class="font-mulish">Bayar Sebelum Jatuh Tempo !</p>
                <p class="font-mulish text-red-500">{{ result.expired != null ? datetimeIdn(result.expired) : null }}</p>
            </div>
            <div class="mt-4 mb-2">
                <p class="font-mulish">Petunjuk Pembayaran</p>
                <p class="font-mulish">Cara Pembayaran {{ result.bayar_via }} {{ result.bank }}</p>
                <div class="container" v-html="result.carabayar[0].bayar" v-if="result.carabayar != null"></div>
            </div>
            <div class="container">
                <button @click="$route.push({name : 'tabungan'})"  class="rounded-full border-2  text-white my-2 font-montserrat font-medium h-12 w-80 text-center bg-primaryColors">Kembali</button>
            </div>
           </div>
        </main>
    </div>
</template>
<script>
export default {
    name : 'CaraPembayaranBulananView',
    props : {
        result : {
            type : Object,
        },
        payment : {
            type : Object,
        }
    },
    data(){
        return {
            
        }
    },
    mounted(){
        console.log(this.result)
    },
    methods : {
        rupiah(number){
            return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
             minimumFractionDigits: 0,
            maximumFractionDigits: 0
            }).format(number);
        },   
        datetimeIdn(stringDate){
            const datetime = new Date(stringDate);
            console.log(datetime);
            let options = {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            };
            return new Intl.DateTimeFormat('id', options).format(datetime);
        }
    }
    
}
</script>