
<template>
    <div class="h-100 w-full ">
        <header class="">
            <div class="flex flex-row justify-between">
                <font-awesome-icon class="text-primaryColors m-4" icon="arrow-left" @click="$router.push({name : 'login'})" />
                <p class="m-4"></p>
            </div>
        </header>
        <div class="container">
            <img src="@/assets/images/forgotpassword.svg" alt="">
            <div class="container flex flex-col justify-center items-center gap-y-2">
                <input v-model="kode_sekolah" type="text" class="border-2 rounded-lg border-gray-400  px-2 py-3 w-80 " placeholder="Kode Sekolah" />
                <input v-model="nis" type="text" class="border-2 rounded-lg border-gray-400  px-2 py-3 w-80" placeholder="NIS Siswa" />
                <input v-model="nomor_wa" type="text" class="border-2 rounded-lg border-gray-400  px-2 py-3 w-80" placeholder="Nomor Whatsapp" />
                <button @click="getOtp" class="rounded-full focus:border-2 focus:border-white w-28 text-white  h-12 bg-primaryColors" >Verifikasi</button>
            </div>
        </div>
    </div>
</template>
<script>
import { password } from '@/stores/password.js';
const store = password()

export default {
    name : "ResetPasswordView",
    data(){
        return{
            kode_sekolah : '2020123',
            nis : '202202112005',
            nomor_wa : '081393597900',
        }
    },
    methods : {
        async getOtp(){
            /* set form data */
            const data = {
                kode_sekolah : this.kode_sekolah,
                nis : this.nis,
                no_wa : this.nomor_wa
            }
            
            let response = await store.sendOtp(data)
            var state = JSON.parse(response)

            if(state.success){
                this.$snackbar.add({
                    type : 'success',
                    text : state.data
                })
                this.loading = state.loading
                this.$router.push({name : 'verifyOtp'})
            }else{
                this.isLoading = state.loading
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
            // state.success ? this.$router.push({name : 'verify-otp'}) : ''
            // this.isLoading = state.loading
            // this.$snackbar.add({
            //     type : 'error',
            //     text : state.error
            // }) 

        }
    }
}  
</script>