<template>
    <div class="flex flex-col h-100" >
        <main class="flex-grow">
            <div class="container pt-2">
                <div class="flex flex-row justify-center w-full">
                    <img src="@/assets/images/adminsekolah.png" alt="" class="w-20 h-20">
                </div>
                <p class="text-center text-[15px] font-mulish font-[600] pt-6">Assalamu'alaikum Selamat Datang Di</p>
                <p class="text-center text-[20px] font-mulish font-bold">Admin Sekolah</p>
                <div class="container flex flex-col pt-10 item-center gap-y-2">
                    <input v-model="kode_sekolah" type="text" class="px-2 py-3 mb-3 border-2 border-gray-400 rounded-lg  font-mulish" placeholder="Kode Sekolah" />
                    <input v-model="nis" type="text" class="px-2 py-3 border-2 border-gray-400 rounded-lg font-mulish" placeholder="NIS" />
                    <PasswordContainer v-model:value="password" title="Password" />
                    <small class="text-end text-primaryColors"><button @click="this.$router.push('/resetPassword')"> Lupa Password ?</button></small>
                    <button @click="loginRequest" class="w-full h-12 text-white border-2 rounded-full bg-primaryColors" >Lanjut</button>
                    <a href="" class="text-center text-red-500 font-mulish text-md">{{ error }}</a>
                    <a href="" class="text-center font-mulish text-primaryColors text-md">Hapus Riwayat</a>
                </div>
            </div>
        </main>
        <footer class="h-20">
            <p class="text-center text-[13px] font-mulish pt-8 ">Butuh Bantuan ?</p>
            <p class="text-center text-[15px] font-mulish text-primaryColors pt-2">Hubungi Admin</p>
        </footer>
    </div>
</template>
<script>
import PasswordContainer from "@/components/PasswordContainer.vue";
import { auth } from '@/stores/auth.js';
const authStore = auth()
export default {
    components : {
        PasswordContainer
    },
    name : "LoginView",
    data(){
        return{
            // kode_sekolah : '2302052',
            // nis : '123456',
            kode_sekolah : '2020123',
            nis : '202103092004',
            password : '123456',
            // kode_sekolah : '2020123',
            // nis : '202202112005',
            // password : '1234567',
            // kode_sekolah : '',
            // nis : '',
            // password : '',
            isLoading : false,
            error : null,
        }
    },
    methods : {
        async loginRequest(){
            /* data */
            const data = {
                kode_sekolah : this.kode_sekolah,
                nis : this.nis,
                password : this.password
            }

            let response = await authStore.login(data)
            var state = JSON.parse(response)

            /* set state */
            this.isLoading = state.loading
            if(state.error == null){
                this.$router.push('/home')
            }else{
                this.error = state.error
                setTimeout(() => {
                    this.error = null
                }, 2000);
            }
        },
    //     installPWA() {
    //   // Check if the deferredPrompt is available
    //         if (this.deferredPrompt) {
    //             // Show the installation prompt when the download button is clicked
    //             this.deferredPrompt.prompt();

    //             // Wait for the user to respond to the prompt
    //             this.deferredPrompt.userChoice.then((choiceResult) => {
    //             // Reset the deferredPrompt once the prompt is dismissed
    //                 this.deferredPrompt = null;
    //                 // Hide the download button after the prompt is shown
    //                 document.getElementById('downloadBtn').style.display = 'none';
    //             });
    //         }
    //     },
    },
    mounted (){
        if ('onbeforeinstallprompt' in window) {
        // Add event listener for beforeinstallprompt event
            window.addEventListener('beforeinstallprompt', (event) => {
                // Prevent the default prompt to show
                event.preventDefault();

                // Store the event for later use
                this.deferredPrompt = event;

                // Show the download button
                document.getElementById('downloadBtn').style.display = 'block';
            });
        }
    }

}
</script>