<template>
    <div class="flex flex-col h-100">
        <header class="bg-primaryColors w-full top-0">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'akun'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Edit Password</p>
                <font-awesome-icon class="text-transparent" icon="pencil"/>
            </div>
        </header>
        <main class="flex-grow container py-20">
            <PasswordContainer v-model:value="oldPassword" title="Password Lama" />
            <PasswordContainer title="Password Baru" v-model:value="newPassword" />
            <PasswordContainer title="Konfirmasi Password Baru" v-model:value="confirmPassword" />
        </main>
        <div class="bottom-0 flex w-full items-center justify-center ">
            <button @click="updatePassword" class="rounded-full border-2  text-white my-2 font-montserrat font-medium h-12 w-64 text-center bg-primaryColors">Simpan</button>
        </div>
    </div>
</template>
<script>
/* state */
import { password } from "@/stores/password.js";
const passwordStore = password(); 

/* local storage */
import MainLocalStorage from "@/services/mainLocalStorage.js";
/* components */
import PasswordContainer from "@/components/PasswordContainer.vue";

export default{
    name: "EditPasswordView",
    components: {
        PasswordContainer,
    },
    data(){
        return{
            oldPassword: '1234567',
            newPassword: '123456',
            confirmPassword: '123456',
        }
    },
    methods: {
        async updatePassword(){
            const data = {
                password_lama : this.oldPassword,
                password_baru : this.newPassword,
                konfirmasi_password : this.confirmPassword,
                student_nis : MainLocalStorage.getAuth().nis,
                kode_sekolah : MainLocalStorage.getAuth().kode_sekolah,
            }
            let response = await passwordStore.editPassword(data)
            let state = JSON.parse(response)
            if(state.success){
                this.$snackbar.add({
                    type : 'success',
                    text : state.data.message
                })
                this.$router.push({name : 'akun'})
            }else{
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
        }
    }
}
</script>