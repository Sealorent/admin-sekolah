
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
                <div class="block  w-full p-3 bg-white border border-gray-200 rounded-lg shadow mt-4 mb-4">
                    <p class="font-mulish font-light text-gray-400 text-lg">Tagihan Bebas</p>
                    <p class="font-montserrat font-bold text-2xl ps-1 mt-2">{{ formatRupiah(total) }}</p>
                    <div class="flex flex-row my-4 justify-between">
                        <button class="bg-primaryColors rounded-full text-white  py-2 w-1/2" @click="$router.push({name:'pembayaranBebas'})" >Bayar Tagihan</button>
                        <button class="border-2 border-green-500 rounded-full text-primaryColors py-2  ms-2 w-1/2">Unduh Tagihan</button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-3" v-for="item in listBebas" :key="item">
                <div class="border-t-2 border-gray-100">
                    <div class="flex flex-row justify-between py-2 px-4">
                        <div class="flex-col flex">
                            <p class="font-montserrat font-bold text-base">{{ item.nama_bayar }}</p>
                            <p class="font-montserrat text-sm ">{{ formatRupiah(item.bebas_bill) }} dibayar {{ formatRupiah(item.bebas_total_pay) }}</p>
                        </div>
                        <div class="flex justify-center items-center">
                            <p class="font-montserrat text-center align-middle  text-sm" :class="  item.status == true ? 'text-green-500' : 'text-red-500' ">{{  item.status == true ? 'Lunas' : 'Belum Lunas'   }}</p>
                        </div>
                    </div>
                </div>
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


export default{
    name: 'BulananContainer',
    components : {
        ButtonFilter,
        ButtonFilterYear,
        VueBottomSheet
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
            total : 0
        }
    },
    methods : {
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod,
            })
        },
        async getData(){
            this.isloading = true
            let res = await bayarStore.listBebas(this.sendData)
            var state = JSON.parse(res)
            if(state.error == null){
                this.listBebas = state.data.bayar.map(item => {
                    return {
                        nama_bayar : item.detail_bebas.nama_bayar,
                        period_start : item.detail_bebas.period_start,
                        period_end : item.detail_bebas.period_end,
                        bebas_bill : item.detail_bebas.bebas_bill,
                        bebas_total_pay : item.detail_bebas.bebas_total_pay,
                        status : parseInt(item.detail_bebas.bebas_bill) > parseInt(item.detail_bebas.bebas_total_pay) ? false : true ,
                    }
                })
                this.total = this.listBebas.map(item => parseInt(item.bebas_bill) - parseInt(item.bebas_total_pay) ).reduce((prev, next) => prev + next)
                this.isloading = false
            }else{
                this.$snackbar.add({
                    type : 'error',
                    message : state.error
                })
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
        formatRupiah(data){
            return Rupiah.format(data)
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        }
    }, 
    mounted(){
        this.setData()
        this.getData(this.sendData)
    }
}
</script>
