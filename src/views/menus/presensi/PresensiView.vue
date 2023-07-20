<style>
.bottom-sheet__card{
    height: 60% !important;
}
</style>

<template>
    <LoadingCircle v-if="isLoading" />
     <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Presensi</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-5">
                <div class="flex flex-row justify-between items-center">
                    <p class="font-mulish">Tahun Ajaran</p>
                    <ButtonFilterYear :title="title"  :value="selectedPeriod.length > 0 || selectedMonth.length > 0 ? true : false" @click="openFilter" />
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between border-t-2 w-full py-4" v-for="item in listPresensi" :key="item" @click="detail(item)">
                        <p class="font-mulish">{{ formatDateInd(item.detail.tanggal) }}</p>
                        <p class="font-mulish" :class="item.detail.kehadiran == 'H' ? 'text-green-500' : 'text-red-500' ">{{ item.detail.kehadiran == "H" ? "Hadir" : "Absen"  }}</p>
                    </div>
                    <div class="flex items-center justify-center">
                        {{ message }}
                    </div>
                </div>
            </div>
        </main>
    </div>
    <vue-bottom-sheet ref="myBottomSheet">
            <div class="flex flex-col pb-10">
                <div class="container">
                    <p class="text-gray-400 mb-3 font-mulish">Pilih Tahun Ajaran</p>
                    <div class="grid grid-cols-3 gap-3 pt-1" >
                        <div v-for="item in listPeriod" :key="item">
                            <ButtonFilter :title="item.label" :value="selectedPeriod != null ? selectedPeriod.includes(item.id) : ''" @click="setSelectedPeriod(item.id)"/>
                        </div>
                    </div>
                </div>
                <div class="container mt-2">
                    <p class="text-gray-400 my-3 font-mulish">Pilih Bulan</p>
                    <div class="grid grid-cols-4 gap-3 pt-1" >
                        <div v-for="item in listMonth" :key="item">
                            <ButtonFilter :title="item.month" :value="selectedMonth != null ? selectedMonth.includes(item.number) : ''" @click="setSelectedMonth(item.number)"/>
                        </div>
                    </div>
                    <div class="flex flex-row justify-end text-end pt-10">
                        <button class="font-mulish text-blue-500" @click="batal">Batal</button>
                        <button class="ms-12 font-mulish text-blue-500" @click="loadData">Terapkan</button>
                    </div>
                </div>
            </div>
    </vue-bottom-sheet>
</template>

<script>
/* state */
import { presensi } from '@/stores/presensi.js';
const presensiStore = presensi()

/* utils */
import ArrayMonth from '@/utils/arrayMonth.js';
import ArrayPeriod from '@/utils/arrayPeriod.js'
import FormatDateInd from '@/utils/dateFormat.js'

/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js';

/* components */
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import ButtonFilter from '@/components/ButtonFilter.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import LoadingCircle from '@/components/loader/LoadingContainer.vue'


export default {
    name : "PresensiView",
    components : {
        ButtonFilterYear,
        VueBottomSheet,
        ButtonFilter,
        LoadingCircle
    },
    data (){
        return {
            listPresensi : [],
            listMonth : ArrayMonth.getListMonth(),
            listPeriod : ArrayPeriod.getList(),
            selectedPeriod : [],
            selectedMonth : [],
            title : 'Pilih Tahun',
            message : null,
            isLoading : false
        }
    },
    methods : {
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod.map(item => parseInt(item)),
                "bulan" : this.selectedMonth == null || this.selectedMonth < 1 ? ArrayMonth.getArrayMonth() : this.selectedMonth.map(item => parseInt(item)),
            })
        },
        async getPresensi(){
            this.isLoading = true
            this.setData()
            let response = await presensiStore.listPresensi(this.sendData)
            var state = JSON.parse(response)
            if(state.error == null){
                this.listPresensi = state.data
                this.isLoading = state.loading
                this.message = state.error
            }else{
                this.listPresensi = []
                this.message = state.message
                this.isLoading = state.loading
                this.message = state.error
            }
            console.log(state);
        },
        setSelectedPeriod(id){
            if(this.selectedPeriod.includes(id)){
                this.selectedPeriod = this.selectedPeriod.filter(item => item != id)
            }else{
                this.selectedPeriod.push(id)
            }
        },
        setSelectedMonth(number){
            if(this.selectedMonth.includes(number)){
                this.selectedMonth = this.selectedMonth.filter(item => item != number)
            }else{
                this.selectedMonth.push(number)
            }
        },
        loadData(){
            this.getPresensi()
            this.closeFilter()
        },
        openFilter(){
            this.$refs.myBottomSheet.open()
        },
        closeFilter(){
            this.$refs.myBottomSheet.close()
        },
        formatDateInd(date){
            return FormatDateInd.fullYearInd(date)
        }
    },
    mounted() {
        this.getPresensi()
        
    },
}
</script>