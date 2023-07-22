<style>
.bg_home{
  border-bottom-left-radius: 50% 8%;
  border-bottom-right-radius: 50% 8%;
}
</style>
<template>
        <div class="flex flex-col h-100">
        <header class="bg-primaryColors bg_home ">
            <div class="flex justify-between w-full pt-2">
                <div class="container">
                    <p class="text-white text-md  font-montserrat font-thin">{{ user.nama_pesantren }}</p>
                </div>
                <div v-on:click="open" class="container flex justify-end items-center gap-x-4">
                    <p class="text-white text-lg  font-montserrat font-thin">Keluar</p>
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-white" />
                </div>
            </div>
            <div class="flex justify-between w-full pt-3 pb-3">
                <div class="container flex flex-col justify-center items-start w-80 ">
                    <p class="text-white text-md  font-montserrat ">{{ user.nama }}</p>
                    <p class="text-sm  font-montserrat font-light text-gray-300">{{ user.kelas }}</p>
                </div>
                <div class=" container flex flex-grow justify-end  items-center w-40">
                    <div class="rounded-full h-20 w-20 border-2 overflow-hidden" >
                        <img alt="profile-image" class="object-cover h-full w-full" :src="imageProfile"/>
                    </div>
                </div>
            </div>
        </header>
        <main class="pt-4 flex-grow  ">
            <div class="">
                <!-- menu Button -->
                <div class="container pt-2 text-center">
                    <div class="grid grid-cols-4 gap-3">
                        <div class="flex-col justify-center items-center" v-on:click="$router.push({name:`${item.route}`})" v-for="item in menu" :key="item">
                            <div class="flex justify-center items-center rounded-3xl w-14 h-14 mx-auto  bg-opacity-50" :class="item.bg_color" >
                                <img :src="getImgUrl(item.icon)" alt="" style="width: 60%;">
                            </div>
                            <div class="flex items-center justify-center pt-3">
                                <p class="text-black font-bold font-mulish text-sm ">{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- carousel -->
                <div class="container px-5 pt-6 pb-2">
                    <div class="flex justify-between items-center ">
                        <p class="font-mulish font-bold ">Informasi</p>
                        <button class="font-mulish font-light " @click="$router.push({name : 'informasi'})">Lihat Semua </button>
                    </div>
                    <div class="container pb-32 pt-3">
                        <Carousel v-if="isLoadingImage" :itemsToShow="3" :wrapAround="true" :transition="500"  :autoplay="2000"  pause-autoplay-on-hover>
                            <Slide v-for="i in 3" :key="i">
                                <div class="carousel__item">
                                    <div class="container w-40 h-40 flex items-center justify-center">
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
        <footer class=" bg-primaryColors flex bottom-0 fixed w-full">
            <MenuBottomBar/>
        </footer>
        <vue-bottom-sheet ref="myBottomSheet">
            <p class="ms-4">Anda yakin akan keluar akun ?</p>
            <div class="grid grid-cols-2 gap-2 mx-2 mt-3 ">
                <button class="border-2 w-full rounded-full" @click="close">Batal</button>
                <button class="border-2 w-full rounded-full bg-primaryColors font-mulish text-white p-2 shadow-lg" @click="logOut">Keluar</button>
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