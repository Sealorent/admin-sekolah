<template>
    <LoadingCircle v-if="isLoading" />
     <div class="flex flex-col h-100" >
        <header class=" top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Presensi</p>
                <font-awesome-icon :icon="['fas', 'share-nodes']"  @click="share"/>
            </div>
        </header>
        <main class="flex-grow pt-4">
            <div class="container flex flex-col gap-y-5">
                <div class="flex flex-col">
                    <div class="containerw-full">
                        <img :src="foto" alt="" class="rounded-lg" style="">
                    </div>
                    <div class="w-full  flex flex-col justify-center pt-3">
                        <p class="font-mulish font-bold text-xl">{{ title }}</p>
                        <p class="font-mulish pt-2">{{ setTanggal }}</p>
                        <p v-html="subtitle" class="py-5"></p>
                    </div>
                    <div class="flex items-center justify-center">
                        {{ informasi }}
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

/* component */
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

/* utils */
import FormatDateInd from '@/utils/dateFormat.js'


export default {
    name : 'InformationView',
    components : {
        LoadingCircle
    },
    data(){
        return {
            informasi : null,
            foto : null,
            isLoading : false,
            message : null,
            tanggal : null,
            title : null,
            subtitle : null,
        }
    },
    methods : {
        async getInformasi(){
            this.isLoading = true
            let response = await getInformation.detailInformation();
            var state = JSON.parse(response);
            this.isLoading = state.loading
            this.foto = state.data.detail.foto;
            this.tanggal = state.data.tanggal;
            this.title = state.data.detail.judul_info;
            this.subtitle = state.data.detail.detail_info;
        },
        formatDateInd(date){
            return FormatDateInd.fullYearInd(date)
        },
        async share(){
            const shareData = {
                title: 'Check out this awesome content!',
                text: 'I found this amazing content. You should check it out too!',
                url: 'https://example.com', // Replace with the URL of the content you want to share
            };

            // Invoke the native sharing dialog
            await navigator.share(shareData);
        }
    },
    computed : {
            setTanggal(){
                return FormatDateInd.fullYearInd(this.tanggal)
            },
    },
    mounted(){
        this.getInformasi();
    }
}
</script>