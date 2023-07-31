
<style>
.bottom-sheet__card{
    height: 50% !important;
}
</style>
<template>
        <div class="flex  container flex-nowrap overflow-x-auto scrollbar-hidden pt-2">
            <div class="flex space-x-2">
                <ButtonFilterYear :title="title"  :value="selectedPeriod.length > 0 ? true : false" @click="open" />
                <ButtonFilter title="Selesai" :value="selesai" @click="toggleSelesai"  />
                <ButtonFilter title="Menunggu Pembayaran" :value="pending" @click="togglePending" />
            </div>
        </div>
        <div class="flex flex-col">
            <div class="container">
                <div class="block w-full  p-3 bg-white border border-gray-200 rounded-lg shadow mt-4 mb-4">
                    <p class="font-mulish font-light text-gray-400 text-lg">Tagihan Per {{ formatDateInd(Date()) }}</p>
                    <p class="font-montserrat font-bold text-2xl ps-1 mt-2">{{ formatRupiah(total) }}</p>
                    <div class="flex flex-row my-4 justify-between">
                        <button class="bg-primaryColors font-mulish rounded-full text-white  py-2  w-1/2" @click="$router.push({name:'bayarBulanan'})">Bayar Tagihan</button>
                        <button class="border-2 border-blue-500 font-mulish rounded-full text-primaryColors py-2  ms-2 w-1/2" @click="$router.push({name : 'getPdf', params: { type : 'bulanan' } })">Unduh Tagihan</button>
                    </div>
                </div>
            </div>
            <div class="container">
                <Accordion always-open  v-for="item in listBulanan"  :key="item">
                    <accordion-panel>
                        <accordion-header>{{ item.nama_bayar }}</accordion-header>
                        <accordion-content v-for="item2 in item.items" :key="item2">
                            <div class="flex flex-row justify-between">
                                <div>
                                    <p>{{ item2.month_name + ' ' + item.period_start+ ' (' + item.period_start + '/' + item.period_end+ ')' }}</p>
                                    <p>{{ formatRupiah(item2.bill) }}</p>
                                </div>
                                <p class="mt-2" :class="item2.status == '1' ? 'text-primaryColors' : 'text-red-500' ">{{ item2.status == '1' ? 'Lunas' : 'Belum Lunas' }}</p>
                            </div>
                        </accordion-content>
                    </accordion-panel>  
                </Accordion>
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
                    <button class="font-mulish text-blue-500">Batal</button>
                    <button class="ms-12 font-mulish text-blue-500" @click="loadData">Terapkan</button>
                </div>
            </div>
        </vue-bottom-sheet>
</template>
<script>

/* state */
import { bayar } from '@/stores/bayar.js'
const bayarStore = bayar()

/* Main Local Storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'

/* utils */
import ArrayPeriod from '@/utils/arrayPeriod.js'
import Rupiah from '@/utils/rupiah.js'
import FormatDateInd from '@/utils/dateFormat.js'

/* components */
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import ButtonFilter from '@/components/ButtonFilter.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'flowbite-vue'


export default{
    name: 'BulananContainer',
    components : {
        ButtonFilter,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        ButtonFilterYear,
        VueBottomSheet
    },
    data(){
        return {
            listBulanan : [],
            firstList : [],
            listPeriod : ArrayPeriod.getList(),
            sendData : null,
            isloading : true,
            selectedPeriod : [],
            title : 'Pilih Tahun',
            selesai : false,
            pending : false,
            total : 0
        }
    },
    methods : {
        async getListBulanan(data){
            let response = await bayarStore.listBulanan(data)
            
            var state = JSON.parse(response)
            console.log('state');
            const detail = state.data.detail
            /* map data */
            this.listBulanan = detail.map(item => ({
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
            )
            this.firstList = this.listBulanan
            this.total = this.sum(this.listBulanan)
            
        },
        filter(){
            let softContainer;

            if(this.pending == false && this.selesai == true){ // selesai true pending false
                console.log('selesai true');
                softContainer =  this.filterStatus(this.listBulanan);
            }else if(this.pending == true && this.selesai == false){
                console.log('pending true');
                softContainer =  this.filterStatus(this.listBulanan);
            }else{
                softContainer = this.firstList;
            }        
            this.total = this.sum(softContainer)
            this.listBulanan = softContainer;
        },
        togglePending(){
            if (this.pending) {
                this.pending = false
                this.filter()
            } else {
                this.pending = true
                this.filter()
            }
        },
        toggleSelesai(){
            if (this.selesai) {
                this.selesai = false
                this.filter()
            } else {
                this.selesai = true
                this.filter()
            }
        },
        open(){
            this.$refs.listPeriod.open()
        },
        close(){
            this.$refs.listPeriod.close()
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
        loadData(){
            this.setData()
            this.getListBulanan(this.sendData)
            this.close()
        },
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod,
            })
        },
        filterStatus(arr){
            var softArr;
            var status = this.pending == true ? '0' : '1'; 
            softArr = arr.map(item => ({
                nama_bayar: item.nama_bayar,
                period_start: item.period_start,
                period_end: item.period_end,
                items: item.items.filter(subItem => subItem.status === status)
            }));
            return softArr;
        },
        sum(arr){
            var totalTagihan = 0;

            if(arr.length == 0){
                totalTagihan = 0;
            }else{
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    for (let j = 0; j < item.items.length; j++) {
                        const subItem = item.items[j];
                        totalTagihan += parseInt(subItem.bill);
                    }
                }
            }
            return totalTagihan;
        },
        formatRupiah(data){
            return Rupiah.format(data)
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        }
            
    },
    mounted(){
        this.setData()
        this.getListBulanan(this.sendData)
    },
}
</script>
