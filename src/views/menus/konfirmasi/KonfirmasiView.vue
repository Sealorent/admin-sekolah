<template>
    <LoadingCircle v-if="isLoading"/>
    <div class="flex flex-col h-100" v-if="isLoading == false">
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Konfirmasi Pembayaran</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="flex flex-col gap-y-3 container">
                <div class="border-2 py-2 shadow-md rounded-lg" v-for="item in listKonfirmasi" :key="item" v-on:click="detailKonfirmasi(item)">
                    <div class="flex w-full">
                        <div class="container ">
                            <div class="flex ">
                                <img :src="setIcon(item.detail) " alt="" class="w-10">
                                <p class="ms-2">{{ item.detail.catatan }}</p>
                            </div>
                        </div>
                        <div class="container  text-end">
                            {{ formatDateInd(item.tanggal) }}
                            <p :class="setColor(item.detail)">{{ setStatus(item.detail)  }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class='fixed bottom-0 w-full flex justify-center'>
            <button class="rounded-xl flex flex-row px-12 bg-white shadow-xl mb-3" v-on:click="$router.push({name:'uploadBuktiPembayaran'})">
                <font-awesome-icon class="text-primaryColors pt-1 pe-5" icon="add" />
                <p class="text-[15px] pb-3 font-mulish text-primaryColors">Upload Bukti</p>
            </button>
        </div>
    </div>
</template>
<script>
/* state */
import { konfirmasi } from '@/stores/konfirmasi.js';
const konfirmasiStore = konfirmasi()

/* utils */
import FormatDateInd from '@/utils/dateFormat.js'

/* components */
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

/* icon */
import IconDitolak from "@/assets/icons/status/failed.svg"
import IconPending from "@/assets/icons/status/pending.svg"
import IconSuccess from "@/assets/icons/status/success.svg"

export default {
    name : "KonfirmasiView",
    components : {
        LoadingCircle
    },
    data (){
        return {
            listKonfirmasi : [],
            isLoading : true
        }
    },
    methods : {
        async getKonfirmasi(){
            let response = await konfirmasiStore.getListKonfirmasi()
            var state = JSON.parse(response)
            console.log(state);
            this.listKonfirmasi = state.data
            this.isLoading = state.loading
        },
        formatDateInd(data){
            return FormatDateInd.fullYearInd(data)
        },
        setIcon(item) {
            if (item.status == "0") {
                return IconDitolak;
            }
            else if (item.status == "1") {
                return IconSuccess;
            }
            else if (item.status == "2") {
                return IconPending;
            }
            else if (item.status == "3") {
                return IconDitolak;
            }
        },
        setStatus(item) {
            if (item.status == "0") {
                return "Dibatalkan";
            }
            else if (item.status == "1") {
                return "DIverifikasi";
            }
            else if (item.status == "2") {
                return "Menunggu Verifikasi";
            }
            else if (item.status == "3") {
                return "Ditolak";
            }
        },
        setColor(item) {
            if (item.status == "0") {
                return "text-red-500";
            }
            else if (item.status == "1") {
                return "text-green-500";
            }
            else if (item.status == "2") {
                return "text-gray-500";
            }
            else if (item.status == "3") {
                return "text-red-500";
            }
        },
        async detailKonfirmasi(data){
            const res =   await konfirmasiStore.detailKonfirmasi(data)
            const state = JSON.parse(res)
            if(state.error == null){
                this.$router.push({name : 'detailKonfirmasi'})
            }
        }
    },
    mounted() {
        this.getKonfirmasi()
    },
}

</script>