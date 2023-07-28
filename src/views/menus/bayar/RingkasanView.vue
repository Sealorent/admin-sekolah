<style>
.bottom-sheet__card{
    height: 100% !important;
}
</style>

<template>
    <LoadingCircle v-if="isLoading"/>
    <div class="flex flex-col h-100" v-if="pembayaranSuccess == null">
        <header class="bg-primaryColors top-0 sticky w-full">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Ringkasan</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
          <div class="container">
            <div class="flex flex-col">
                <p class="font-mulish">No. Ref</p>
                <p class="font-montserrat text-lg">{{ dataRingkasan.noref }}</p>
            </div>
            <div class="flex flex-col pt-2 ">
                <div class="flex flex-row justify-between pb-4">
                    <p class="font-mulish uppercase text-sm text-gray-400">{{`item (${itemLength})`}}</p>
                    <p class="font-mulish uppercase text-sm text-gray-400">Jumlah</p>
                </div>
                <!-- listringkasan -->
                <div v-for="item in listBulan" :key="item" class="container flex flex-row justify-between border-2 shadow-sm py-2 my-1" >
                    <div class=" w-full flex flex-col ">
                        <p class="font-mulish">{{ item.nama_bayar }}</p>
                    </div>
                    <div class=" w-full flex flex-row justify-between">
                        <div class=" w-full flex items-center">
                            <p class="font-mulish ms-3">{{ formatRupiah(item.nominal) }}</p>
                        </div>
                        <div class=" w-1/3 flex items-center justify-center">
                            <font-awesome-icon  :icon="['fas', 'trash']" size="sm" class="text-red-500" @click="removeBulanan(item.bulan_id)" />
                        </div>
                    </div>
                </div>
                <div v-for="item in listBebas" :key="item" class="container flex flex-row justify-between border-2 shadow-sm py-2 my-1" >
                    <div class=" w-full flex flex-col ">
                        <p class="font-mulish">{{ item.nama_bayar }}</p>
                    </div>
                    <div class=" w-full flex flex-row justify-between">
                        <div class=" w-full flex items-center">
                            <p class="font-mulish ms-3">{{ formatRupiah(item.nominal) }}</p>
                        </div>
                        <div class=" w-1/3 flex items-center justify-center">
                            <font-awesome-icon  :icon="['fas', 'trash']" size="sm" class="text-red-500" @click="removeBebas(item.bebas_id)" />
                        </div>
                    </div>
                </div>
                <div class=" flex flex-row justify-between border-t-2 pt-2 mt-6 mb-6">
                    <p class="font-mulish uppercase">Total</p>
                    <p class="font-mulish">{{ formatRupiah(totalPay) }}</p>
                </div>

            </div>
          </div>
        </main>
        <footer class=" border-t-2 bottom-0 fixed w-full z-20 bg-gray-50">
            <div class="container py-2">
                <p class="font-mulish text-sm">Pilih Metode Pembayaran</p>
                <div class="container py-2" v-if="paymentMethod == null" @click="open">
                    <div class="flex flex-row justify-between">
                        <div class="flex flex-col">
                            <p class="font-mulish text-lg font-bold">Pilih Bank</p>
                            <p class="font-mulish">Jenis Pembayaran</p>
                        </div>
                        <div class="flex items-center mt-4">
                            <font-awesome-icon  :icon="['fas', 'chevron-right']" size="sm" class=" align-middle ms-2 mb-6"/>
                        </div>
                    </div>
                </div>
                <div class="container py-2" v-if="paymentMethod != null">
                    <div class="flex flex-row gap-x-4">
                        <div class="flex items-center">
                            <img :src="paymentMethod.logo" alt="" class="w-20">
                        </div>
                        <div class="flex flex-col ">
                            <p class="font-mulish">{{ paymentMethod.kode }}</p>
                            <p class="font-mulish">{{ paymentMethod.bank }}</p>
                        </div>
                    </div>
                </div>
                <button @click="bayar" class="rounded-full bg-primaryColors w-full py-1 my-2 font-mulish text-white">Bayar Sekarang</button>
            </div>
        </footer>
    </div>

    <CaraPembayaran v-if="pembayaranSuccess != null" :result="pembayaranSuccess" :payment="paymentMethod" />

    <!-- bottom sheet -->
    <vue-bottom-sheet ref="metodeBayar">
            <div class="container">
                <p class="text-gray-400 font-mulish">Pilih Metode Pembayaran</p>
                <!-- <div class="grid grid-cols-3 gap-3 pt-4" > -->
                <Accordion always-open  v-for="item in listMetodeBayar"  :key="item">
                    <accordion-panel>
                        <accordion-header>{{ item.nama_bayar }}</accordion-header>
                        <accordion-content v-for="item2 in item.items" :key="item2" @click="setPayment(item2)">
                            <div class="flex flex-row gap-x-2">
                                <img :src="item2.logo" alt="" class="w-20">
                                <p class="font-mulish">{{ item2.kode }}</p>
                            </div>
                        </accordion-content>
                    </accordion-panel>
                </Accordion>
            </div>
    </vue-bottom-sheet>
</template>

<script>
/* state */
import { bayar } from "@/stores/bayar.js";
const bayarStore = bayar();

/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'

/* utils */
import Rupiah from '@/utils/rupiah.js'

/* components */
import CaraPembayaran from '@/components/CaraPembayaran.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'flowbite-vue'
import LoadingCircle from '@/components/loader/LoadingContainer.vue'


export default {
    name : "RingkasanView",
    components : {
        VueBottomSheet,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        LoadingCircle,
        CaraPembayaran
    },
    data(){
        return {
            sendData : null,
            listMetodeBayar : [],
            paymentMethod : null,
            isLoading : null,
            pembayaranSuccess : null,
            dataRingkasan : [],
            listBulan : [],
            listBebas : [],
            itemLength : 0,
            totalPay : 0
        }
      
    },
    methods : {
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
                this.setMetodeBayar(state.data.bayar)
                /* set data ringkasan */
                this.dataRingkasan = state.data
                const { bebas, bulan,  ...data } = state.data;
                this.dataRingkasan = data
                /* set list ringkasan */
                this.listBebas = bebas
                this.listBulan = bulan
                this.itemLength = bebas.length + bulan.length
                this.totalPay = bebas.map(item => parseInt(item.nominal)).reduce((prev, next) => prev + next, 0) + bulan.map(item => parseInt(item.nominal)).reduce((prev, next) => prev + next, 0)
                this.isLoading = false;
                
            }else{
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
        },
        async removeBebas(bebas_id){
            this.isLoading = true;
            let res = await bayarStore.removeBebas(bebas_id)
            let state = JSON.parse(res)
            console.log('remove bebas');
            console.log(state);
            if(state.success){
                this.getRingkasan()
            }else{
                this.$snackbar.add({
                    type : 'error',
                    text : "Gagal menghapus tagihan"
                })
            }
        },
        async removeBulanan(month_id){
            this.isLoading = true;
            let res = await bayarStore.removeBulanan(month_id)
            let state = JSON.parse(res)
            console.log('remove bulan');
            console.log(state);
            if(state.success){
                this.getRingkasan()
            }else{
                this.isLoading = false;
                this.$snackbar.add({
                    type : 'error',
                    text : "Gagal menghapus tagihan"
                })
            }
        },
        setPayment(data){
            this.paymentMethod = data
            this.close()
        },
        async bayar(){
            this.isLoading = true;

            var data = JSON.stringify({
                "student_nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "noref": this.dataRingkasan.noref,
                "nominal": this.totalPay + "",
                "payment_channel": this.paymentMethod.metode,
                "ipaymu_no_trans": MainLocalStorage.getNoIpaymu()
            });

            const res = await bayarStore.insertIpaymuBayar(data)
            const state = JSON.parse(res)

            if(state.success){
                var sendData = JSON.stringify({
                    "student_nis": MainLocalStorage.getAuth().nis,
                    "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                    "noref": this.dataRingkasan.noref,
                    "nominal": this.totalPay + "",
                    "payment_channel": this.paymentMethod.metode,
                    "ipaymu_no_trans": MainLocalStorage.getNoIpaymu(),
                });
                
                const res2 = await bayarStore.caraPembayaran(sendData)
                const state2 = JSON.parse(res2)
                
                if(state2.success){
                    this.isLoading = state2.loading
                    this.pembayaranSuccess = state2.data
                }else{
                    this.$snackbar.add({
                        type : 'error',
                        text : state2.error
                    })
                    this.isLoading = state2.loading
                    this.paymentMethod = null
                }
            }else{
                this.isLoading = state.loading
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
                this.paymentMethod = null
            }


        },
        setMetodeBayar(data){
            const bayar  = data
            const cstoreArray = bayar.filter(item => item.metode.startsWith("cstore|"));
            const virtualAccountArray = bayar.filter(item => item.metode.startsWith("va|"));
            this.listMetodeBayar = [
                {
                    nama_bayar : "Virtual Account",
                    items : virtualAccountArray
                },
                {
                    nama_bayar : "Cstore",
                    items : cstoreArray
                },
            ]
        },
        open(){
            this.$refs.metodeBayar.open()
        },
        close(){
            this.$refs.metodeBayar.close()
        },
        formatRupiah(data){
            return Rupiah.format(data)
        }
    },
    mounted() {
        console.log(this.getRingkasan());
        // console.log(this.$route.params)
    }

}
</script>