
<template>
    <div class="w-full h-100 ">
        <header class="">
            <div class="flex flex-row justify-between">
                <font-awesome-icon class="m-4 text-primaryColors" icon="arrow-left" @click="$router.push({name : 'login'})" />
                <p class="m-4"></p>
            </div>
        </header>
        <div class="container">
            <img src="@/assets/images/forgotpassword.svg" alt="">
            <div class="container flex flex-col items-center justify-center gap-y-2">
                <input v-model="kode_sekolah" type="text" class="px-2 py-3 border-2 border-gray-400 rounded-lg w-80 " placeholder="Kode Sekolah" />
                <input v-model="nis" type="text" class="px-2 py-3 border-2 border-gray-400 rounded-lg w-80" placeholder="NIS Siswa" />
                <!-- <input v-model="nomor_wa" type="text" class="px-2 py-3 border-2 border-gray-400 rounded-lg w-80" placeholder="Nomor Whatsapp" /> -->
                <button @click="toChangePassword" class="h-12 text-white rounded-full focus:border-2 focus:border-white px-10 bg-primaryColors" >Change Password</button>
                <!-- <button @click="getOtp" class="h-12 text-white rounded-full focus:border-2 focus:border-white w-28 bg-primaryColors" >Verifikasi</button> -->
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
            nis : '20240202',
            // nomor_wa : '081393597900',
        }
    },
    methods : {
        async toChangePassword(){
            /* set form data */
            const data = {
                kode_sekolah : this.kode_sekolah,
                nis : this.nis,
                // no_wa : this.nomor_wa
            }
            await store.setData(data);
            this.$router.push({name : 'changePassword'})
        },
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
        }
    }
}  
</script>