<style>
    .header button{
        background-color: white !important;
        border: 1px solid #E5E7EB !important;
    }

    .content{
        border : 1px solid #E5E7EB !important;
        border-top: none !important;
    }
</style>
<template>
    <LoadingCircle v-if="isloading"/>
     <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Bayar Tagihan Bebas</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-5">
                <div class="flex flex-row justify-between items-center">
                    <p class="font-mulish">Tahun Ajaran</p>
                    <ButtonFilterYear :title="title"  :value="selectedPeriod.length > 0 ? true : false" @click="open" />
                </div>
                <div class="flex flex-col">
                    <Accordion always-open  v-for="item in listBebas"  :key="item" class="mt-3">
                        <accordion-panel>
                            <accordion-header class="header">{{ item.bebas }}</accordion-header>
                            <accordion-content class="content">
                                <div class="flex flex-row justify-between">
                                    <div>
                                        <p>{{ rupiah(item.bebas_bill) }}</p>
                                    </div>
                                    <ButtonBayarBebas :nominal="item.nominal_pay" :check="item.nominal != null ? true : false"  @click="item.nominal_pay != null ? closeBayar(item) : openBayar(item.bebas, item.nominal)" ></ButtonBayarBebas>
                                </div>
                            </accordion-content>
                        </accordion-panel>
                    </Accordion>
                </div>
                <div class="flex items-center justify-center">
                    <p>{{ message }}</p>
                </div>
            </div>
        </main>
    </div>
    <div class="bottom-0 fixed w-full flex justify-center shadow-inner bg-gray-50">
        <div class="flex flex-col py-2">
            <div class="flex flex-row justify-between">
                <p class="font-mulish">Total ({{ itemLength }})</p>
                <p class="font-mulish">{{ rupiah(totalPay) }}</p>
            </div>
            <button @click="bayar"  class="rounded-full border-2  text-white my-2 font-montserrat font-medium h-12 w-80 text-center bg-primaryColors">Lanjutkan</button>
        </div>
    </div>
    <vue-bottom-sheet ref="listPeriod">
        <div class="container">
            <p class="text-gray-400 mb-3 font-mulish">Pilih Tahun Ajaran</p>
            <div class="grid grid-cols-3 gap-3 pt-4" >
                <div v-for="item in listPeriod" :key="item">
                    <ButtonFilter :title="item.label" :value="selectedPeriod != null ? selectedPeriod.includes(item.id) : ''" @click="setSelectedPeriod(item.id)"/>
                </div>
            </div>
            <div class="flex flex-row justify-end text-end pt-10">
                <button class="font-mulish text-blue-500" @click="batal">Batal</button>
                <button class="ms-12 font-mulish text-blue-500" @click="loadData">Terapkan</button>
            </div>
        </div>
    </vue-bottom-sheet>
    <vue-bottom-sheet ref="bayarBottomSheet">
        <div class="container ">
            <p class="text-gray-400 font-mulish">Pembayaran Bebas</p>
            <p class="font-mulish text-lg mt-2">{{ arrBebas.nama_bayar }}</p>
            <div class="flex flex-row justify-between mt-2">
                <p class=" font-mulish">Total Tagihan</p>
                <p class="font-mulish text-lg">{{ rupiah(arrBebas.bebas_bill) }}</p>
            </div>
            <div class="flex flex-row justify-between mt-2">
                <p class=" font-mulish">Total Terbayar</p>
                <p class=" font-mulish">{{ rupiah(arrBebas.bebas_total_pay) }}</p>
            </div>
            <hr>
            <div class="flex flex-row justify-between mt-2">
                <p class="text-red-400 font-mulish ">Kekurangan</p>
                <p class="text-red-400 font-mulish">{{ rupiah(parseInt(arrBebas.bebas_bill) - parseInt(arrBebas.bebas_total_pay)) }}</p>
            </div>
            <input ref="inputContainer" type="text"  v-model="inputValue" class="border-2 mt-4 border-gray-200 rounded-md w-full p-2" placeholder="Masukan Nominal"/>
            <small class="text-center">Masukkan nominal yang ingin dibayar</small>
            <button @click="setNominal($event)" class="rounded-3xl mt-4 py-2 text-white w-full bg-primaryColors">Bayar</button>
        </div>
    </vue-bottom-sheet>
</template>

<script>
/* state */
import { bayar } from '@/stores/bayar.js'
const bayarStore = bayar()

/* utils */
import ArrayPeriod from '@/utils/arrayPeriod.js'
import Rupiah from '@/utils/rupiah.js'

/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'

/* components */
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import ButtonFilter from '@/components/ButtonFilter.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import LoadingCircle from '@/components/loader/LoadingContainer.vue'
import ButtonBayarBebas from '@/components/ButtonBayarBebas.vue'
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'flowbite-vue'


export default {
    name: 'bayarBebasView',
    components : {
        ButtonFilter,
        ButtonFilterYear,
        VueBottomSheet,
        LoadingCircle,
        ButtonBayarBebas,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent
    },
    data(){
        return {
            listBebas : [],
            listPeriod : ArrayPeriod.getList(),
            sendData : null,
            isloading : true,
            selectedPeriod : [],
            title : 'Pilih Tahun',
            selesai : false,
            pending : false,
            total : 0,
            message : null,
            arrBebas : [],
            arrBayar : [],
            inputValue : null,
            itemLength : 0,
            totalPay : 0,

        }
    },
    methods : {
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod.map((item) => parseInt(item)),
            })
        },
        async getBebas(){
            this.isloading = true
            this.setData()
            const res = await bayarStore.listBayarBebas(this.sendData)
            const state = JSON.parse(res)
            if(state.success){
                this.listBebas = state.data.detail.map(item  => ({
                    bebas_id : item.detail_bebas.bebas_id,
                    bebas : item.detail_bebas.bebas,
                    bebas_bill : item.detail_bebas.bebas_bill,
                    bebas_total_pay : item.detail_bebas.bebas_total_pay,
                    sisa : item.detail_bebas.sisa,
                    nominal_pay : null
                }))
                this.isloading = state.loading
                this.message = state.error
            }else{
                this.isloading = state.loading
                this.message = state.error
            }
        },
        open(){
            this.$refs.listPeriod.open()
        },
        close(){
            this.$refs.listPeriod.close()
        },
        openBayar(name_bebas){
            this.name_bebas = name_bebas;
            this.arrBebas = this.listBebas.filter(item => item.bebas == name_bebas)[0]
            this.arrBayar.push(this.listBebas.filter(item => item.bebas == name_bebas)[0])
            this.$refs.bayarBottomSheet.open()
            this.$refs.inputContainer.focus();

        },
        setNominal(){
            if(this.inputValue == null){
                return alert("Masukkan nominal terlebih dahulu");
            }else{
                this.listBebas.map(item => item.bebas == this.name_bebas ? item.nominal_pay = this.inputValue : null)

                this.name_bebas = null;
                
                this.sum()
                this.$refs.bayarBottomSheet.close();
            }
            this.inputValue = null;

        },
        sum(){
            var length = this.arrBayar.length;
            
            var totalPay = 0;
            if(length == 0){
                totalPay =  0;
            }else if (length == 1){
                totalPay = this.arrBayar[0].nominal_pay;
            }else{
                totalPay = this.arrBayar.map(item => parseInt(item.nominal_pay)).reduce((prev, next) => prev + next)
            }

            this.totalPay = totalPay;
            this.itemLength = this.arrBayar.length == 0 ? 0 : this.arrBayar.length;
        },
        async bayar(){
            if(this.checkBayar().status == false){
                this.$snackbar.add({
                    type: 'error',
                    text: this.checkBayar().message,
                })
            }else{
                var arr_bebas_id = this.arrBayar.map(item => parseInt(item.bebas_id))
                var arr_nominal_pay = this.arrBayar.map(item => parseInt(item.nominal_pay))
                const sendData = {
                    bebas_id : arr_bebas_id,
                    nominal_pay : arr_nominal_pay,
                }

                const res = await bayarStore.bayarBebas(sendData)
                const state = JSON.parse(res)
                if(state.success){
                    this.$snackbar.add({
                        type: 'success',
                        text: state.data,
                    })
                    this.$router.push({name : 'ringkasanPembayaran'})
                }else{
                    this.$snackbar.add({
                        type: 'error',
                        text: state.message,
                    })
                }
            }
        },
        checkBayar(){
            if(this.arrBayar.length == 0){
                return {
                    status : false,
                    message : 'Pilih tagihan terlebih dahulu'
                }
            }else if(this.totalPay < 10000){
                return {
                    status : false,
                    message : 'Minimal pembayaran Rp. 10.000'
                }
            }else{
                return {
                    status : true,
                    message : null
                }
            }
        },
        closeBayar(bebas){
            this.listBebas.map(item => item.bebas == bebas.bebas ? item.nominal_pay =  null : null)
            this.arrBayar = this.arrBayar.filter(item => item.bebas != bebas.bebas)
            this.sum()
            this.$refs.bayarBottomSheet.close();
        },
        
        setSelectedPeriod(id){
            if(this.selectedPeriod.includes(id)){
                this.selectedPeriod = this.selectedPeriod.filter(item => item != id)
            }else{
                this.selectedPeriod.push(id)
            }
        },
        batal(){
            this.selectedPeriod = []
            this.close()
        },
        loadData(){
            this.getBebas()
            this.close()
        },
        rupiah(value){
            return Rupiah.format(value)
        },
    },
    mounted() {
        this.getBebas()
    },

}

</script>