<template>
    <div class="flex flex-col h-100">
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Bayar</p>
                <div class="relative flex  h-10 w-10 items-center" @click="$router.push({name:'ringkasanPembayaran'})">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-white flex-1" />
                    <span v-if="itemLength > 0"  class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right  text-white font-mono text-sm leading-tight text-center">
                        {{ itemLength }}
                    </span>
                </div>
            </div>
            <div class="flex flex-row w-full">
                <button @click="getBulanan" :class="['w-full  p-4 rounded-t-lg ', active_tab == 'bulanan' ? 'isActive' : 'isNotActive']">
                    <p class="text-center font-mulish">Bulanan</p>
                </button>
                <button  @click="getBebas" :class="['w-full  p-4 rounded-t-lg ', active_tab == 'bebas' ? 'isActive' : 'isNotActive']">
                    <p class="text-center font-mulish ">Bebas</p>
                </button>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <BulananContainer v-if="active_tab == 'bulanan'"/>
            <BebasContainer v-if="active_tab == 'bebas'"/>
        </main>
    </div>
</template>
<script>
import BulananContainer from '@/views/menus/bayar/bulanan/BulananContainer.vue'
import BebasContainer from '@/views/menus/bayar/bebas/BebasContainer.vue'
import MainLocalStorage from '@/services/mainLocalStorage.js'
/* state */
import { bayar } from "@/stores/bayar.js";
const bayarStore = bayar();

export default{
    name : 'BayarView',
    components : {
        BulananContainer,
        BebasContainer
    },
    data (){
        return {
            user: [],
            ImageProfile : null,
            active_tab : 'bulanan',
            slides : [],
            itemLength : 0
        }
    },
    mounted(){
        this.getRingkasan()
    },
    methods: {
         setData(){
            this.sendData = JSON.stringify({
                "student_nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "bayar": "Bayar",
                "bulan_id": [],
                "bebas_id": []
            });
        },
        async getRingkasan(){
            this.isLoading = true;
            this.setData()
            let res = await bayarStore.listRingkasan(this.sendData)
            let state = JSON.parse(res)
            console.log(state)
            if(state.success){
                /* set metode bayar */
                /* set data ringkasan */
                this.dataRingkasan = state.data
                const { bebas, bulan, ...data } = state.data;
                this.dataRingkasan = data
                /* set list ringkasan */
                this.listBebas = bebas
                this.listBulan = bulan
                this.itemLength = bebas.length + bulan.length
                this.isLoading = false;
                
            }else{
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
        },
        getBulanan(){
            this.active_tab = 'bulanan';
        },
        getBebas(){
            this.active_tab = 'bebas';
        }
    }
}
</script>
<style>
.isActive{
    background-color: #ffffff;
    --tw-text-opacity: 3;
    color: #048A0B;
}
.isNotActive{
    background-color: #00000000;
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
}
</style>