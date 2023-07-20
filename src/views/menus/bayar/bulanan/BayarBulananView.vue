<style>
.bottom-sheet__card{
    height: 60% !important;
}
</style>

<template>
    <!-- ini data -->
    <LoadingCircle v-if="isLoading" />
     <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Bayar Tagihan</p>
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
                    <Accordion always-open  v-for="item in listBulanan"  :key="item">
                        <accordion-panel>
                            <accordion-header>{{ item.nama_bayar }}</accordion-header>
                            <accordion-content v-for="item2 in item.items" :key="item2">
                                <div class="flex flex-row justify-between">
                                    <div>
                                        <p>{{ item2.month_name + ' ' + item.period_start+ ' (' + item.period_start + '/' + item.period_end+ ')' }}</p>
                                        <p>{{ formatRupiah(item2.bill) }}</p>
                                    </div>
                                    <ButtonBayar :value="item2" @click="getVal(item2)" :check="history.some(item => item.bulan_id === item2.bulan_id)"></ButtonBayar>
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
</template>

<script>
/* state */
import { bayar } from '@/stores/bayar.js';
const bayarStore = bayar() 

/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'

/* utils */
import ArrayPeriod from '@/utils/arrayPeriod.js'
import Rupiah from '@/utils/rupiah.js'
import FormatDateInd from '@/utils/dateFormat.js'

/* components */
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'flowbite-vue'
import LoadingCircle from '@/components/loader/LoadingContainer.vue'
import ButtonFilter from '@/components/ButtonFilter.vue'
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import ButtonBayar from '@/components/ButtonBayar.vue'

export default {
    name : "BayarBulananView",
    components : {
        VueBottomSheet,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        LoadingCircle,
        ButtonFilter,
        ButtonFilterYear,
        ButtonBayar
    },
    data(){
        return {
            listBulanan : [],
            listPeriod : ArrayPeriod.getList(),
            selectedPeriod : [],
            sendData : null,
            isLoading : false,
            title : 'Pilih Tahun',
            message : null,
            history : null,
            
        }
    },
    methods : {
        setDataHistory(){
            this.sendDataHistory = JSON.stringify({
                "student_nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "bayar": "Bayar",
                "bulan_id": [],
                "bebas_id": []
            });
        },
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod.map((item) => parseInt(item)),
            })
        },
        async getHistory(){
            this.isLoading = true
            this.setDataHistory()
            let response = await bayarStore.listRingkasan(this.sendDataHistory)
            var state = JSON.parse(response)

            if(state.success){
                this.isLoading = state.loading
                this.message = state.message
                this.history = state.data.detail
            }else{
                this.isLoading = state.loading
                this.message = state.message
                this.history = []
            }
        },
        async getListBulanan(){
            this.isLoading = true
            this.setData()
            let response = await bayarStore.listBulanan(this.sendData)
            var state = JSON.parse(response)
            if(state.success){
                this.isLoading = state.loading
                this.listBulanan = state.data.detail.map(item => 
                        ({ 
                        nama_bayar: item.detail_bulan.nama_bayar, 
                        period_start: item.detail_bulan.period_start,
                        period_end: item.detail_bulan.period_end, 
                        items: ([
                            {
                                'month_name' : item.detail_bulan.month_name_jul,
                                'bill' : item.detail_bulan.bill_jul,
                                'status' : item.detail_bulan.status_jul
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_agu,
                                'bill' : item.detail_bulan.bill_agu,
                                'status' : item.detail_bulan.status_agu
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_sep,
                                'bill' : item.detail_bulan.bill_sep,
                                'status' : item.detail_bulan.status_sep
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_okt,
                                'bill' : item.detail_bulan.bill_okt,
                                'status' : item.detail_bulan.status_okt
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_nov,
                                'bill' : item.detail_bulan.bill_nov,
                                'status' : item.detail_bulan.status_nov
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_des,
                                'bill' : item.detail_bulan.bill_des,
                                'status' : item.detail_bulan.status_des
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_jan,
                                'bill' : item.detail_bulan.bill_jan,
                                'status' : item.detail_bulan.status_jan
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_feb,
                                'bill' : item.detail_bulan.bill_feb,
                                'status' : item.detail_bulan.status_feb
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_mar,
                                'bill' : item.detail_bulan.bill_mar,
                                'status' : item.detail_bulan.status_mar
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_apr,
                                'bill' : item.detail_bulan.bill_apr,
                                'status' : item.detail_bulan.status_apr
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_mei,
                                'bill' : item.detail_bulan.bill_mei,
                                'status' : item.detail_bulan.status_mei
                            },
                            {
                                'month_name' : item.detail_bulan.month_name_jun,
                                'bill' : item.detail_bulan.bill_jun,
                                'status' : item.detail_bulan.status_jun
                            },
                        ]) 
                    }) 
                );
                this.listBulanan = this.listBulanan.map(item => ({ 
                    nama_bayar: item.nama_bayar, 
                    period_start: item.period_start,
                    period_end: item.period_end,
                    items: item.items.filter(item => item.status != '1' && item.month_name != '')
                }));
            }else{
                this.isLoading = state.loading
                this.message = state.error
                this.listBulanan = []
            }
            console.log(this.listBulanan);
        },
        setSelectedPeriod(id){
            if(this.selectedPeriod.length < 0){
                this.selectedPeriod.push(id)
            }else if(this.selectedPeriod.includes(id)){
                this.selectedPeriod.splice(this.selectedPeriod.indexOf(id), 1);
            }else{
                this.selectedPeriod.push(id)
            }
        },
        open(){
            this.$refs.listPeriod.open()
        },
        close(){
            this.$refs.listPeriod.close()
        },
        loadData(){
            this.setData()
            this.getListBulanan(this.sendData)
            this.close()
        },
        formatRupiah(data){
            return Rupiah.format(data)
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        }
    },
    mounted(){
        this.getListBulanan()
    }
}
</script>