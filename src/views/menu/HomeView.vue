<style>
.bg_home{
  border-bottom-left-radius: 50% 8%;
  border-bottom-right-radius: 50% 8%;
}
.bottom-sheet__card{
    width: 100% !important;
    height: 20% !important;
}
</style>
<template>
        <div class="flex flex-col h-100">
        <header class="bg-primaryColors bg_home ">
            <div class="flex justify-between w-full pt-2">
                <div class="container">
                    <p class="font-thin text-white text-md font-montserrat">{{ user.nama_pesantren }}</p>
                </div>
                <div v-on:click="open" class="container flex items-center justify-end gap-x-4">
                    <p class="text-lg font-thin text-white font-montserrat">Keluar</p>
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-white" />
                </div>
            </div>
            <div class="flex justify-between w-full pt-3 pb-3">
                <div class="container flex flex-col items-start justify-center w-80 ">
                    <p class="text-white text-md font-montserrat ">{{ user.nama }}</p>
                    <p class="text-sm font-light text-gray-300 font-montserrat">{{ user.kelas }}</p>
                </div>
                <div class="container flex items-center justify-end flex-grow w-40 ">
                    <div class="w-20 h-20 overflow-hidden border-2 rounded-full" >
                        <img alt="profile-image" class="object-cover w-full h-full" :src="imageProfile"/>
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-grow pt-4 ">
            <div class="">
                <!-- menu Button -->
                <div class="container pt-2 text-center">
                    <div class="grid grid-cols-4 gap-3">
                        <div class="flex-col items-center justify-center" v-on:click="$router.push({name:`${item.route}`})" v-for="item in menu" :key="item">
                            <div class="flex items-center justify-center mx-auto bg-opacity-50 rounded-3xl w-14 h-14" :class="item.bg_color" >
                                <img :src="getImgUrl(item.icon)" alt="" style="width: 60%;">
                            </div>
                            <div class="flex items-center justify-center pt-3">
                                <p class="text-sm font-bold text-black font-mulish ">{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- carousel -->
                <div class="container px-5 pt-6 pb-2">
                    <div class="flex items-center justify-between ">
                        <p class="font-bold font-mulish ">Informasi</p>
                        <button class="font-light font-mulish " @click="$router.push({name : 'informasi'})">Lihat Semua </button>
                    </div>
                    <div class="container pt-3 pb-32">
                        <Carousel v-if="isLoadingImage" :itemsToShow="3" :wrapAround="true" :transition="500"  :autoplay="2000"  pause-autoplay-on-hover>
                            <Slide v-for="i in 3" :key="i">
                                <div class="carousel__item">
                                    <div class="container flex items-center justify-center w-40 h-40">
                                        <spinner color="green" size="8" />
                                    </div>
                                </div>
                            </Slide>
                            <template #addons>
                                <Pagination />
                            </template>
                        </Carousel>
                        <Carousel v-if="isLoadingImage == false" :itemsToShow="1" :wrapAround="true" :transition="500"  :autoplay="2000"  pause-autoplay-on-hover>
                            <Slide v-for="slide in slides" :key="slide.id">
                                <div class="carousel__item" @click="detail(slide)">
                                    <img :src="slide.detail.foto" alt="" style="width: 1000px; height: 200px;" >
                                </div>
                            </Slide>
                            <template #addons>
                                <Pagination />
                            </template>
                        </Carousel>
                        <img src="" alt="">
                    </div>
                </div>
            </div>
        </main>
        <!-- bottom bar -->
        <footer class="fixed bottom-0 flex w-full bg-primaryColors">
            <MenuBottomBar/>
        </footer>
        <vue-bottom-sheet ref="myBottomSheet">
            <p class="ms-4">Anda yakin akan keluar akun ?</p>
            <div class="grid grid-cols-2 gap-2 mx-2 mt-3 ">
                <button class="w-full border-2 rounded-full" @click="close">Batal</button>
                <button class="w-full p-2 text-white border-2 rounded-full shadow-lg bg-primaryColors font-mulish" @click="logOut">Keluar</button>
            </div>
        </vue-bottom-sheet>
    </div>
</template>
<script>

/* state */
import { auth } from '@/stores/auth.js';
import { information } from '@/stores/informasi.js';
const getInformation = information()
const storeAuth = auth()
/* local storage */
import LocalStorage from '@/services/mainLocalStorage.js'
/* filter array object */
import FilterArrayObject from '@/utils/filterArrayObject.js'
/* components */
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { Spinner } from 'flowbite-vue'
/* Bottom Bar */
import MenuBottomBar from '@/components/MenuBottomBar.vue'

export default {
    name : 'HomeView',
    components : {
        Carousel,
        Pagination,
        Slide,
        Spinner,        
        VueBottomSheet,
        MenuBottomBar
    },
    data(){
        return {
            user : LocalStorage.getUser(),
            imageProfile : null,
            isLoadingImage : true,
            slides : [],
            menu : [
                {icon : 'ic_bayar', name : 'Bayar', route : 'bayar' , bg_color : 'bg-green-200 '},
                {icon : 'ic_tabungan', name : 'Tabungan', route : 'tabungan' , bg_color : 'bg-green-200'},
                {icon : 'ic_konfirmasi', name : 'Konfirmasi', route : 'konfirmasi' , bg_color : 'bg-green-200'},
                {icon : 'ic_tahfidz', name : 'Tahfidz', route : 'tahfidz' , bg_color : 'bg-green-200 '},
                {icon : 'ic_izin', name : 'Izin', route : 'izin' , bg_color : 'bg-blue-200 '},
                {icon : 'ic_konseling', name : 'Konseling', route : 'konseling' , bg_color : 'bg-blue-200 '},
                {icon : 'ic_presensi', name : 'Presensi', route : 'presensi' , bg_color : 'bg-blue-200 '},
            ] 
        }
    },
    methods : {
        getImgUrl(img) {
            return new URL(`../../assets/icons/menu/${img}.svg`, import.meta.url).href;
        },
        async getInformasi(){
            let response = await getInformation.getInformation();
            var state = JSON.parse(response);
            this.slides = state.data;
            this.isLoadingImage = state.loading
        },
        logOut(){
            storeAuth.logout()
            this.$router.push('/')
        },
        open(){
            this.$refs.myBottomSheet.open();
        },
        close(){
            this.$refs.myBottomSheet.close();
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
        this.imageProfile = this.user.photo != null ? this.user.photo : 'src/assets/images/dummyProfile.png';
        const filteredArray = FilterArrayObject.filterArraysByProperty(this.menu, this.user.navmenu, 'name');
        this.menu = filteredArray;
        console.log(this.user);
        this.getInformasi();
    }
}
</script>