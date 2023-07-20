<style>
.bottom-sheet__card{
    height: 50% !important;
}
</style>
<template>
    <div class="flex flex-col h-100">
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Tabungan</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container">
                <div class="container bg-white border-2 shadow-lg py-2">
                    <div class="flex flex-col">
                        <p class="font-mulish">Saldo</p>
                        <p class="font-mulish text-lg">{{ formatRupiah(getSaldo) }}</p>
                    </div>
                    <div class="flex flex-row py-2 gap-x-10">
                        <div class="flex flex-col">
                            <p class="font-mulish text-sm">Debit</p>
                            <p class="font-mulish text-[13px]">{{ formatRupiah(getDebit) }}</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="font-mulish text-sm">Debit</p>
                            <p class="font-mulish text-[13px]">{{ formatRupiah(getKredit) }}</p>
                        </div>
                    </div>
                    <button @click="this.$router.push({name: 'setorTabungan'})" class="rounded-full bg-primaryColors w-full py-1 my-2 font-mulish text-white">Top-up Tabungan</button>
                </div>
                <div class="flex flex-col pt-4">
                    <div class="flex flex-row justify-between border-t-2 py-2" v-for="item in listTabungan" :key="item">
                        <div class="flex flex-col">
                            <p class="font-mulish">{{ parseInt(item.detail.debit) == 0  ? 'Kredit' : 'Debit' }}</p>
                            <p class="font-mulish">{{ formatDateInd(item.tanggal) }}</p>
                        </div>
                        <div class="flex items-center">
                            <p class="font-mulish" :class="parseInt(item.detail.debit) == 0  ? 'text-red-500' : 'text-green-500'">{{ parseInt(item.detail.debit) == 0  ? formatRupiah(item.detail.kredit) : formatRupiah(item.detail.debit) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

/* state */
import { tabungan } from '@/stores/tabungan.js';
const tabunganStore = tabungan()

/* utils */
import Rupiah from '@/utils/rupiah.js'
import FormatDateInd from '@/utils/dateFormat.js'

export default {
    name : "TabunganView",
    data (){
        return {
            listTabungan : []
        }
    },
    methods : {
        async getTabungan(){
            let response = await tabunganStore.listTabungan()
            var state = JSON.parse(response)
            this.listTabungan = state.data
        },
        formatRupiah(data){
            return Rupiah.format(data)
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        }
    },
    mounted() {
        this.getTabungan()
    },
    computed : {
        getSaldo(){
            return this.listTabungan.reduce((acc, item) => {
                return acc + parseInt(item.detail.debit) - parseInt(item.detail.kredit)
            }, 0)
        },
        getDebit(){
            return this.listTabungan.reduce((acc, item) => {
                return acc + parseInt(item.detail.debit)
            }, 0)
        },
        getKredit(){
            return this.listTabungan.reduce((acc, item) => {
                return acc + parseInt(item.detail.kredit)
            }, 0)
        }
    }
}
</script>