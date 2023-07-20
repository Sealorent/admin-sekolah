<template>
    <div class="flex flex-col h-100 ">
        <header class="bg-primaryColors top-0 w-full">
            <p class="text-center text-white font-[500px] font-mulish py-4">Bantuan</p>
        </header>
        <main>
            <div class="container py-3">
                <p class="text-xs font-montserrat">Butuh bantuan ? Hubungi admin E-Pesantren di</p>
                <button @click="whatsapp" type="button" class="text-white mt-4 w-full bg-green-500 rounded-lg py-4 px-3">
                    <div class="flex flex-row justify-between">
                        <div class="flex text-center">
                            <font-awesome-icon :icon="['fab', 'whatsapp']" size="xl"/>
                            <p class="pl-2">Whatsapp</p>
                        </div>
                        <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" class="pt-1 pr-2" />
                    </div>
                </button>
                <button @click="telegram" type="button" class="text-white mt-4 w-full bg-blue-500 rounded-lg py-4 px-3">
                    <div class="flex flex-row justify-between">
                        <div class="flex text-center">
                            <img src="@/assets/icons/ic_telegram.svg" alt="">
                            <p class="pl-2">Telegram</p>
                        </div>
                        <font-awesome-icon :icon="['fas', 'chevron-right']" size="sm" class="pt-1 pr-2" />
                    </div>
                </button>
                <div class="flex flex-row mt-5">
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
        </main>
        <!-- bottom bar -->
        <footer class=" bg-primaryColors flex bottom-0 fixed w-full">
            <MenuBottomBar/>
        </footer>
    </div>
</template>
<script>
/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'
/* components */
import MenuBottomBar from '@/components/MenuBottomBar.vue'
export default {
    name : 'BantuanView',
    components : {
        MenuBottomBar
    },
    data() {
        return {
            data : MainLocalStorage.getUser().setting   
        }
    },
    methods : {
        whatsapp(){
            this.checkNull(this.data[2].setting_whatsapp, 'Whatsapp') ? window.open(`https://wa.me/${this.data[2].setting_whatsapp}`, '_blank') : null
        },

        website(){
            this.checkNull(this.data[1].setting_website, 'Website') ? window.open(`${this.data[1].setting_website}`, '_blank') : null
        },

        facebook(){
            this.checkNull(this.data[3].setting_facebook, 'Facebook') ? window.open(`${this.data[3].setting_facebook}`, '_blank') : null
        },

        instagram(){
            this.checkNull(this.data[4].setting_instagram, 'Instagram') ? window.open(`${this.data[4].setting_instagram}`, '_blank') : null
        },

        youtube(){
            this.checkNull(this.data[5].setting_youtube, 'Youtube') ? window.open(`${this.data[5].setting_youtube}`, '_blank') : null
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
    },
    mounted () {
        console.log(this.data);
    }
}
</script>
