<template>
    <LoadingCircle v-if="isLoading" />
    <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Tahfidz</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-5">
                <div class="flex flex-row justify-between items-center">
                    <p class="font-mulish">Tahun Ajaran</p>
                    <ButtonFilterYear :title="title"  :value="selectedPeriod.length > 0 ? true : false" @click="openFilter" />
                </div>
                <div class="border-2 shadow-sm px-4 py-2">
                    <p class="font-mulish text-[14px]">Jumlah Hafalan</p>
                    <p class="font-mulish text-[32px]">{{ jumlahHafalan }}</p>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between border-t-2 w-full" v-for="item in listTahfidz" :key="item" @click="detail(item)">
                        <div class="flex flex-col  " >
                            <p class="font-mulish">{{ item.detail.murojaah_hafalan_baru }}</p>
                            <p class="font-mulish">{{ formatDateInd(item.tanggal) }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="font-mulish text-green-500">{{ item.detail.jumlah_hafalan_baru }}</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        {{ message }}
                    </div>
                </div>
            </div>
        </main>
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
    <vue-bottom-sheet ref="detailTahfidz" >
        <div class="container" v-if="arrDetail != null">
            <div class="flex flex-col ">
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Keterangan</p>
                    <p class="font-mulish capitalize">{{ arrDetail.detail.keterangan_hafalan_baru }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Jumlah Hafalan</p>
                    <p class="font-mulish ">{{ arrDetail.detail.jumlah_hafalan_baru }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Tanggal</p>
                    <p class="font-mulish ">{{ changeDate(arrDetail.tanggal) }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Murojaah</p>
                    <p class="font-mulish ">{{ arrDetail.detail.murojaah }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Murotal</p>
                    <p class="font-mulish ">{{ arrDetail.detail.murojaah_hafalan_baru }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script>
/* state */
import { tahfidz }  from '@/stores/tahfidz.js';
const tahfidzStore = tahfidz()

/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js';
import ArrayPeriod from '@/utils/arrayPeriod.js'

/* utils */
import FormatDateInd from '@/utils/dateFormat.js'

/* components */
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import ButtonFilter from '@/components/ButtonFilter.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

export default {
    name : "TahfidzView",
    components : {
        ButtonFilterYear,
        VueBottomSheet,
        ButtonFilter,
        LoadingCircle
    },
    data (){
        return {
            listTahfidz : [],
            sendData : null,
            listPeriod : ArrayPeriod.getList(),
            selectedPeriod : [],
            title : 'Pilih Tahun',
            message : null,
            jumlahHafalan : 0,
            arrDetail : null,
            isLoading : false

        }
    },
    methods : {
        setData(){
            this.sendData =  JSON.stringify({
                "nis": MainLocalStorage.getAuth().nis,
                "kode_sekolah": MainLocalStorage.getAuth().kode_sekolah,
                "period_id": this.selectedPeriod == null || this.selectedPeriod < 1 ? ArrayPeriod.getArray() : this.selectedPeriod.map(item => parseInt(item)),
            })
        },
        async getListTahfidz(){
            this.isLoading = true
            const response = await tahfidzStore.listTahfidz(this.sendData)
            const state = JSON.parse(response)
            if(state.error == null){
                this.isLoading = state.loading
                this.listTahfidz = state.data
                this.jumlahHafalan = state.data.map(item => item.detail.jumlah_hafalan_baru).reduce((a, b) => a + b)
                this.message = state.error
            }else{
                this.isLoading = state.loading
                this.listTahfidz = []
                this.jumlahHafalan = 0
                this.message = state.error
            }
        },
        loadData(){
            this.setData()
            this.getListTahfidz(this.sendData)
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
            this.$refs.detailTahfidz.open()
        },
        closeDetail(){
            this.$refs.detailTahfidz.close()
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        }
    },
    mounted() {
        this.setData()
        this.getListTahfidz()
    },
}
</script>