<template>
    <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'konfirmasi'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Detail Konfirmasi</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container">
                <div class="container bg-white border-2 p-5">
                    <p class="font-mulish text-[15px]">{{ changeDate(dataKonfirmasi.tanggal) }}</p>
                    <p class="font-mulish text-[14px] pt-2 pb-4">{{ dataKonfirmasi.detail.catatan }}</p>
                    <img :src="dataKonfirmasi.detail.gambar" alt="" srcset="" style="height: 450px; width: 100%;" >
                    <div class="flex flex-row space-x-4 items-center container mt-2">
                        <button  class="bg-primaryColors rounded-full font-mulish text-sm py-1 text-white w-full">Batalkan</button>
                        <button @click="$router.push({name: 'konfirmasi'})" class="bg-primaryColors rounded-full font-mulish text-sm py-1 text-white w-full">Kembali</button>
                    </div>
                </div>
            </div>            
        </main>
    </div>
</template>
<script>
/* local storage */
import mainLocalStorage  from '@/services/mainLocalStorage.js';

/* utils */
import FormatDateInd from '@/utils/dateFormat.js'
export default {
    name : "DetailKonfirmasiView",
    data (){
        return {
            dataKonfirmasi : mainLocalStorage.getDetailKonfirmasi()
        }
    },
    methods : {
        changeDate(date) {
            return FormatDateInd.fullYearInd(date)
        }
    },
    mounted () {
        console.log(this.dataKonfirmasi);
        console.log(localStorage.getItem('konfirmasi'));
    }
}
</script>