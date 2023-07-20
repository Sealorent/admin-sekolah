<template>
    <div class="flex flex-col h-100" >
        <main class="flex-grow py-20">
            <div class="container pt-2">
                <div class="w-full flex flex-row justify-center">
                    <img src="@/assets/images/adminsekolah.png" alt="" class="w-20">
                </div>
                <p class="text-center text-[15px]  font-mulish font-[600] pt-6">Assalamu'alaikum Selamat Datang Di</p>
                <p class="text-center text-[20px] font-mulish font-bold">Admin Sekolah</p>
                <div class="flex flex-col item-center gap-y-2 container pt-10">
                    <input v-model="kode_sekolah" type="text" class=" font-mulish border-2 rounded-lg border-gray-400  px-2 py-3 mb-3" placeholder="Kode Sekolah" />
                    <input v-model="nis" type="text" class="font-mulish border-2 rounded-lg border-gray-400  px-2 py-3" placeholder="NIS" />
                    <PasswordContainer v-model:value="password" title="Password" />
                    <small class="text-end text-primaryColors"><button @click="this.$router.push('/resetPassword')"> Lupa Password ?</button></small>
                    <button @click="loginRequest" class="rounded-full border-2 w-full text-white  h-12 bg-primaryColors" >Lanjut</button>
                    <a href="" class="font-mulish text-red-500 text-center text-md">{{ error }}</a>
                    <a href="" class="font-mulish text-primaryColors text-center text-md">Hapus Riwayat</a>
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
            nis : '202202112005',
            password : '123456',
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
        }
    },

}
</script>