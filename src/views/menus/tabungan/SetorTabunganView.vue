<style>
.bottom-sheet__card{
    height: 50% !important;
}
</style>
<template>
    <div class="flex flex-col h-100" v-if="pembayaranSuccess == null">
        <header class="bg-primaryColors top-0 sticky w-full">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Setor Tabungan</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-3">
                <input v-model="nominal" type="text" class="border-2 rounded-lg border-gray-400  px-2 py-4 w-full font-mulish" placeholder="Masukkan Nominal" />
                <input v-model="catatan" type="text" class="border-2 rounded-lg border-gray-400  px-2 py-4 w-full font-mulish" placeholder="Catatan" />
            </div>
        </main>
        <footer class="  border-t-2 bottom-0 fixed w-full">
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
                <button @click="bayarTabungan" class="rounded-full bg-primaryColors w-full py-1 my-2 font-mulish text-white">Bayar Sekarang</button>
            </div>
        </footer>
    </div>
    <!-- bottom sheet -->
    <vue-bottom-sheet ref="metodeBayar">
            <div class="container">
                <p class="text-gray-400 mb-3 font-mulish">Pilih Metode Pembayaran</p>
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
    <!-- loading -->
    <div class="flex flex-col items-center justify-center h-full" v-if="isLoading">
        <LoadingCircle />
    </div>
    <!-- Cara Pembayaran -->
    <CaraPembayaran v-if="pembayaranSuccess != null" :result="pembayaranSuccess" :payment="paymentMethod" />
</template>
<script>
/* state */
import { tabungan } from '@/stores/tabungan.js';
const tabunganStore = tabungan()

/* storage */
import mainLocalStorage from '@/services/mainLocalStorage.js'

/* components */
import CaraPembayaran from '@/components/CaraPembayaranTabungan.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'flowbite-vue'
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

export default {
    name : "SetorTabungan",
    components : {
        VueBottomSheet,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        CaraPembayaran,
        LoadingCircle
    },
    data (){
        return {
            paymentMethod : null,
            listMetodeBayar : null,
            pembayaranSuccess : null,
            nominal : null,
            catatan : null,
            data : null,
            isLoading : false,
        }
    },
    methods: {
        async getMetodeBayar(){
            const response = await tabunganStore.listMetodeBayar()
            console.log(response);
            var state = JSON.parse(response)
            this.data = state.data
            const cstoreArray = this.data.metode.filter(item => item.metode.startsWith("cstore|"));
            const virtualAccountArray = this.data.metode.filter(item => item.metode.startsWith("va|"));
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
        setPayment(item){
            this.paymentMethod = item
            this.close()
        },
        async bayarTabungan(){
            this.isLoading = true
            if(this.paymentMethod == null){
                this.$snackbar.add({
                    type : 'error',
                    text : 'Pilih Metode Pembayaran'
                })
                this.isLoading = false
            }else if (this.nominal == null || parseInt(this.nominal) < 10000 ){
                this.$snackbar.add({
                    type : 'error',
                    text : 'Nominal Masih Kosong atau Kurang dari Rp. 10.000'
                })
                this.isLoading = false
            }else{

                var insertData = JSON.stringify({
                    "nis": mainLocalStorage.getAuth().nis,
                    "kode_sekolah": mainLocalStorage.getAuth().kode_sekolah,
                    "nominal": this.nominal,
                    "bayar": "Bayar",
                    "catatan": this.catatan
                });

                const responseInsert = await tabunganStore.topUpTabungan(insertData)
                const resInsert = JSON.parse(responseInsert)
                if(resInsert.success){
                        this.loading = false
                        var data = JSON.stringify({
                            "student_nis": mainLocalStorage.getAuth().nis,
                            "kode_sekolah": mainLocalStorage.getAuth().kode_sekolah,
                            "noref": this.data.nomor,
                            "nominal": this.nominal,
                            "payment_channel": this.paymentMethod.metode,
                            "catatan": this.catatan,
                            "ipaymu_no_trans": this.data.no_ipaymu
                        });

                        const response = await tabunganStore.insertIpaymu(data)
                        const state = JSON.parse(response)
                        console.log('state1');
                        console.log(state);

                        if(state.success){
                            var sendData = JSON.stringify({
                                "student_nis": mainLocalStorage.getAuth().nis,
                                "kode_sekolah": mainLocalStorage.getAuth().kode_sekolah,
                                "noref": this.data.nomor,
                                "nominal": this.nominal,
                                "payment_channel": this.paymentMethod.metode,
                                "ipaymu_no_trans": this.data.no_ipaymu,
                            });
                        
                            const response = await tabunganStore.caraPembayaran(sendData)
                            const state2 = JSON.parse(response)
                            if(state2.success){
                                    this.isLoading = state2.loading
                                    this.pembayaranSuccess = state2.data
                            }else{
                                this.isLoading = false
                                this.paymentMethod = null
                                this.$snackbar.add({
                                        type : 'error',
                                        text : 'Bank Pembayaran Sedang Bermasalah'
                                    })

                            }
                        }else{
                            console.log('error');
                            this.$snackbar.add({
                                type : 'error',
                                text : state.erorr
                            })
                            this.$router.push({name : 'tabungan'})
                        }
                }else{
                    this.$snackbar.add({
                        type : 'error',
                        text : responseInsert.erorr
                    })
                    this.loading = false
                }
            }
        }
    },
    mounted(){
        this.getMetodeBayar()
    }
}
</script>