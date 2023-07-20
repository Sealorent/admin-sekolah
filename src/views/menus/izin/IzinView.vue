<style>
.bottom-sheet__card{
    height: 50% !important;
}
</style>
<template>
    <LoadingCircle v-if="isLoading" />
     <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Izin</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-5">
                <div class="flex flex-row justify-between items-center">
                    <p class="font-mulish">Tahun Ajaran</p>
                    <ButtonFilterYear :title="title"  :value="selectedPeriod.length > 0 ? true : false" @click="openFilter" />
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between border-t-2 w-full" v-for="item in listIzin" :key="item" @click="detail(item)">
                        <div class="flex flex-col py-2" >
                            <p class="font-mulish">{{ changeDate(item.tanggal) + ' , ' + item.detail.waktu }}</p>
                            <p class="font-mulish text-gray-400">{{ item.detail.note }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="font-mulish">{{ item.detail.status }}</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        {{ message }}
                    </div>
                </div>
            </div>
        </main>

        <div class="fixed bottom-0 w-full flex justify-center my-2">
            <button @click="$router.push({name: 'addIzin'})" class="rounded-full w-56 bg-white shadow-lg border-2 gap-x-2 py-2 flex items-center justify-center">
                    <font-awesome-icon class="text-primaryColors " icon="add" />
                    <p class="text-[15px]  font-mulish text-primaryColors">Izin Keluar</p>
            </button>
        </div>
    </div>
    <vue-bottom-sheet ref="myBottomSheet">
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
    <vue-bottom-sheet ref="detailIzin" >
        <div class="container" v-if="arrDetail != null">
            <div class="flex flex-col ">
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Tanggal</p>
                    <p class="font-mulish capitalize">{{ formatDateInd(arrDetail.tanggal) }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Jam</p>
                    <p class="font-mulish ">{{ arrDetail.waktu }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Keperluan</p>
                    <p class="font-mulish ">{{ arrDetail.note }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Status</p>
                    <p class="font-mulish ">{{ arrDetail.detail.status }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script>
/* state */
import { izin }  from '@/stores/izin.js';
const izinStore = izin()

/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js';

/* utils */
import ArrayPeriod from '@/utils/arrayPeriod.js'
import FormatDateInd from '@/utils/dateFormat.js'

/* components */
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import ButtonFilter from '@/components/ButtonFilter.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

export default {
    name : "IzinView",
    components : {
        ButtonFilterYear,
        VueBottomSheet,
        ButtonFilter,
        LoadingCircle
    },
    data(){
        return {
                listIzin : [],
                sendData : null,
                selectedPeriod : [],
                listPeriod : ArrayPeriod.getList(),
                arrDetail : null,
                message : null,
                title : 'Pilih Tahun',
                isLoading : false
            }
    },
    methods : {
        changeDate(date){
            return FormatDateInd.fullYearInd(date)
        },
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod.map(item => parseInt(item)),
            })
        },
        async getListIzin(){
            this.isLoading = true
            this.setData()
            const res = await izinStore.listIzin(this.sendData)
            const state = JSON.parse(res)
            if(state.error == null){
                this.listIzin = state.data
                this.message = state.error
                this.isLoading = state.loading
            }else{
                this.listIzin = []
                this.isLoading = state.loading
                this.message = state.error
            }
        },
        loadData(){
            this.getListIzin()
            this.closeFilter()
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
        detail(item){   
            this.arrDetail = item
            this.openDetail()
        },
        batal(){
            this.selectedPeriod = []
            this.loadData()
        },
        openFilter(){
            this.$refs.myBottomSheet.open()
        },
        closeFilter(){
            this.$refs.myBottomSheet.close()
        },
        openDetail(){
            this.$refs.detailIzin.open()
        },
        closeDetail(){
            this.$refs.detailIzin.close()
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        }
    },
    mounted(){
        this.getListIzin()
        console.log(this.listPeriod);
    }
}

</script>