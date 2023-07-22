<template>
    <LoadingCircle v-if="isLoading" />
    <div class="flex flex-col h-100" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Semua Informasi</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-5">
                <div class="flex flex-col">
                    <div class="flex flex-row justify-between w-full py-4" v-for="item in listInformasi" :key="item" @click="detail(item)">
                        <div class="container  w-28">
                            <img :src="item.detail.foto" alt="" class="w-20 rounded-lg">
                        </div>
                        <div class="w-full  flex flex-col justify-center">
                            <p class="font-mulish">{{ item.detail.judul_info }}</p>
                            <p class="font-mulish">{{ formatDateInd(item.tanggal) }}</p>
                        </div>
                        <!-- <p class="font-mulish" :class="item.detail.kehadiran == 'H' ? 'text-green-500' : 'text-red-500' ">{{ item.detail.kehadiran == "H" ? "Hadir" : "Absen"  }}</p> -->
                    </div>
                    <div class="flex items-center justify-center">
                        {{ message }}
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
/* stores */
import { information } from '@/stores/informasi.js';
const getInformation = information()

/* utils */
import FormatDateInd from '@/utils/dateFormat.js'

/* components */
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

export default {
    name : 'InformationView',
    components : {
        LoadingCircle
    },
    data(){
        return {
            listInformasi : [],
            isLoading : false,
            message : null
        }
    },
    methods : {
        async getInformasi(){
            let response = await getInformation.getInformation();
            var state = JSON.parse(response);
            console.log(state);
            this.listInformasi = state.data;
        },
        formatDateInd(date){
            return FormatDateInd.fullYearInd(date)
        },
        async detail(data){
            let response = await getInformation.setInformation(data)
            var state = JSON.parse(response);
            if(state.error == null){
                this.$router.push({ name: 'detailInformasi' })
            }else{
                this.$snackbar.add({
                    type : 'error',
                    text : 'Data Kosong'
                })
            }
        }
    },
    mounted(){
        this.getInformasi();
    }
}
</script>