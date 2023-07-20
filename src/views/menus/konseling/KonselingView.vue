<style>
.bottom-sheet__card{
    height: 50% !important;
}
</style>
<template>
    <LoadingCircle v-if="isLoading"/>
    <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Konseling</p>
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
                    <p class="font-mulish text-[32px]">{{ jumlahPoin }}</p>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between border-t-2 w-full" v-for="item in listKonseling" :key="item" @click="detail(item)">
                        <div class="flex flex-col  py-2" >
                            <p class="font-mulish font-semibold">{{ item.detail.pelanggaran }}</p>
                            <p class="font-mulish text-sm text-gray-400">{{ formatDateInd(item.tanggal) }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="font-mulish text-red-500">{{ item.detail.poin }}</p>
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
    <vue-bottom-sheet ref="detailKonseling" >
        <div class="container" v-if="arrDetail != null">
            <div class="flex flex-col ">
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Pelanggaran</p>
                    <p class="font-mulish capitalize">{{ arrDetail.detail.pelanggaran }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Poin Pelanggaran</p>
                    <p class="font-mulish text-red-500 ">{{ arrDetail.detail.poin }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Tanggal</p>
                    <p class="font-mulish ">{{ formatDateInd(arrDetail.tanggal) }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Tindakan</p>
                    <p class="font-mulish ">{{ arrDetail.detail.penanganan }}</p>
                </div>
                <div class="mb-3">
                    <p class="font-mulish uppercase text-gray-500">Murotal</p>
                    <p class="font-mulish ">{{ arrDetail.detail.catatan }}</p>
                </div>
            </div>
        </div>
    </vue-bottom-sheet>
</template>

<script>
/* state */
import { konseling } from '@/stores/konseling.js';
const konselingStore = konseling()


/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js';
import ArrayPeriod from '@/utils/arrayPeriod.js'

/* components */
import ButtonFilter from '@/components/ButtonFilter.vue'
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

/* utils */
import FormatDateInd from '@/utils/dateFormat.js'

export default {
    name : "KonselingView",
    components : {
        LoadingCircle,
        ButtonFilter,
        ButtonFilterYear,
        VueBottomSheet
    },
    data (){
        return {
            listKonseling : [],
            listPeriod : ArrayPeriod.getList(),
            selectedPeriod : [],
            title : 'Pilih Tahun',
            message : null,
            jumlahPoin : 0,
            isLoading : false,
            arrDetail : null,
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
        async getKonseling(){
            this.isLoading = true
            this.setData()
            let response = await konselingStore.listKonseling(this.sendData)
            var state = JSON.parse(response)
            console.log(state);
            if(state.error == null){
                this.isLoading = state.loading
                this.listKonseling = state.data
                this.jumlahPoin = state.data.map(item => item.detail.poin).reduce((a, b) => a + b)
                this.message = state.error
            }else{
                this.listKonseling = []
                this.jumlahPoin = 0
                this.isLoading = state.loading
                this.message = state.error
            }
        },
        loadData(){
            this.getKonseling()
            this.closeFilter()
        },
        setSelectedPeriod(id){
            if(this.selectedPeriod.includes(id)){
                this.selectedPeriod = this.selectedPeriod.filter(item => item != id)
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
            this.$refs.myBottomSheet.close()
        },
        openFilter(){
            this.$refs.myBottomSheet.open()
        },
        closeFilter(){
            this.$refs.myBottomSheet.close()
        },
        openDetail(){
            this.$refs.detailKonseling.open()
        },
        closeDetail(){
            this.$refs.detailKonseling.close()
        },
        formatDateInd(date){
            return FormatDateInd.fullYearInd(date)
        }
    },
    mounted() {
        this.getKonseling()
    },  
}

</script>