<template>
    <div class="flex flex-col h-100">
        <header class="bg-primaryColors top-0 w-full">
            <p class="text-center text-white font-[500px] font-mulish py-4">Akun</p>
        </header>
        <main>
            <div class="container">
                <div class="flex flex-row pt-2">
                    <div class="flex flex-grow justify-start items-center w-32">
                        <div class="rounded-full h-20 w-20 border-2 overflow-hidden" >
                            <img alt="profile-image" class="object-cover h-full w-full" :src="imageProfile"/>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-1 w-full justify-start">
                        <p class="font-mulish text-xl font-semibold">{{ data.nama }}</p>
                        <p class="font-mulish text-gray-400 text-sm">{{ data.nis }}</p>
                        <p class="font-mulish text-gray-400 text-sm">{{ data.kelas }}</p>
                        <button class="text-start text-blue-400 font-mulish" @click="this.$router.push({name :'profil'})">Lihat Profil</button>
                    </div>
                </div>
            </div>
            <div class="pt-10">
                <div class="flex flex-col">
                    <div v-on:click="this.$router.push({name:'editPassword'})" class="flex py-3 container border-t-2 justify-between items-center">
                        <div class="flex items-center gap-x-4 ">
                            <font-awesome-icon class="text-blue-400" icon="key" />
                            <p class="font-mulish">Ganti Password</p>
                        </div>
                        <font-awesome-icon class="" icon="chevron-right" />
                    </div>
                    <div v-on:click="this.$router.push({name:'syaratKetentuan'})" class="flex py-3 container border-t-2 justify-between items-center">
                        <div class="flex items-center gap-x-4 ">
                            <font-awesome-icon class="text-blue-400" icon="book" />
                            <p class="font-mulish">Syarat dan Ketentuan</p>
                        </div>
                        <font-awesome-icon class="" icon="chevron-right" />
                    </div>
                    <div v-on:click="this.$router.push({name:'kebijakanPrivasi'})" class="flex py-3 container border-t-2 justify-between items-center">
                        <div class="flex items-center gap-x-4 ">
                            <font-awesome-icon class="text-blue-400" icon="screwdriver-wrench" />
                            <p class="font-mulish">Kebijakan Privasi</p>
                        </div>
                        <font-awesome-icon class="" icon="chevron-right" />
                    </div>
                    <div class="flex py-3 container border-t-2 justify-between items-center">
                        <div class="flex items-center gap-x-4 ">
                            <font-awesome-icon class="text-blue-400" icon="star" />
                            <p class="font-mulish">Beri Rating <span class="text-xs text-gray-400">v.1.1.1</span></p>
                        </div>
                        <font-awesome-icon class="" icon="chevron-right" />
                    </div>
                    <div v-on:click="open" class="border-b-2 flex py-3 container border-t-2 justify-between items-center">
                        <p class="font-mulish text-red-500">Keluar Akun</p>
                        <font-awesome-icon class="text-red-500" icon="arrow-right-from-bracket" />
                    </div>
                </div>
                <div class="container flex flex-col items-center justify-center">
                    <p class="font-mulish pt-5">Cari Tahu Tentang Kami di :</p>
                    <div class="flex flex-row pt-2">
                        <button @click="website"  class="w-10 h-10 bg-gray-100 rounded-full items-center flex justify-center border-2 border-slate-400" >
                            <font-awesome-icon :icon="['fas', 'globe']" size="xl" class="text-black"/>
                        </button>
                        <button @click="facebook" class="w-10 h-10 bg-gray-100 rounded-full items-center flex justify-center border-2 border-slate-400 ml-2">
                            <font-awesome-icon :icon="['fab', 'facebook']" size="xl" class="text-blue-600"/>
                        </button>
                        <button @click="instagram" class="w-10 h-10 bg-gray-100 rounded-full items-center flex justify-center border-2 border-slate-400 ml-2">
                            <font-awesome-icon :icon="['fab', 'instagram']" size="xl" style="color: #E1306C;" />
                        </button>
                        <button @click="youtube" class="w-10 h-10 bg-gray-100 rounded-full items-center flex justify-center border-2 border-slate-400 ml-2">
                            <font-awesome-icon :icon="['fab', 'youtube']" size="xl" class="text-red-600"/>
                        </button>
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

/* state management */
import { auth } from '@/stores/auth.js';
const store = auth()
/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'
/* components */ 
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import MenuBottomBar from '@/components/MenuBottomBar.vue'

export default {
    name : 'BantuanView',
    components : {
        MenuBottomBar,
        VueBottomSheet
    },
    data(){
        return{
            data : MainLocalStorage.getUser(),
            socialMedia : MainLocalStorage.getUser().setting,
            imageProfile : null
        }
    },
    methods : {
        website(){
            this.checkNull(this.socialMedia[1].setting_website, 'Website') ? window.open(`${this.socialMedia[1].setting_website}`, '_blank') : null
        },

        facebook(){
            this.checkNull(this.socialMedia[3].setting_facebook, 'Facebook') ? window.open(`${this.socialMedia[3].setting_facebook}`, '_blank') : null
        },

        instagram(){
            this.checkNull(this.socialMedia[4].setting_instagram, 'Instagram') ? window.open(`${this.socialMedia[4].setting_instagram}`, '_blank') : null
        },

        youtube(){
            this.checkNull(this.socialMedia[5].setting_youtube, 'Youtube') ? window.open(`${this.socialMedia[5].setting_youtube}`, '_blank') : null
        },
        
        telegram(){
            this.checkNull(null, 'Telegram') ? window.open(`${this.data[6].setting_youtube}`, '_blank') : null
        },
        
        checkNull(val, medsos){
            if(val == null || val == ''){
                this.$snackbar.add({
                    type : 'error',
                    text : `${medsos} Belum di setting`
                })
            }else{
                return true
            }
        },
        open(){
            this.$refs.myBottomSheet.open()
        },
        logOut(){
            store.logout()
            this.$refs.myBottomSheet.close()
            this.$router.push('/')
        },

    },
    mounted(){
        this.imageProfile = this.data.photo != null ? this.data.photo : 'src/assets/images/dummyProfile.png';
    }

}
</script>