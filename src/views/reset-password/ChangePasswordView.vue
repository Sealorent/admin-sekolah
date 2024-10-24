<template>
    <div class="h-100 w-full ">
        <header class="">
            <div class="flex flex-row justify-between">
                <font-awesome-icon class="text-primaryColors m-4" icon="arrow-left" @click="$router.push({name : 'login'})" />
                <p class="m-4"></p>
            </div>
        </header>
        <div class="container">
            <img src="@/assets/images/secureData.svg" alt="">
            <div class="container flex flex-col justify-center items-center gap-y-2">
                <PasswordContainer title="Password Lama" v-model:value="oldPassword" />
                <PasswordContainer title="Password Baru" v-model:value="newPassword" />
                <PasswordContainer title="Konfirmasi Password Baru" v-model:value="confirmPassword" />
                <button @click="changePassword" class="rounded-full focus:border-2 focus:border-white px-10 my-5 text-white  h-12 bg-primaryColors" >Rubah Password</button>
            </div>
        </div>
    </div>
</template>
<script>
/* state */
import { password } from "@/stores/password.js";
const passwordStore = password();

/* components */
import PasswordContainer from "@/components/PasswordContainer.vue";

export default {
    name : "ChangePasswordView",
    components : {
        PasswordContainer
    },
    data(){
        return{
            newPassword : '',
            confirmPassword : '',
            oldPassword : ''
        }
    },
    methods : {
        async changePassword(){
            if(this.checkPassword().success == false){
                this.$snackbar.add({
                    type : 'error',
                    text : this.checkPassword().error
                })
            }else{
                let res = await passwordStore.resetPassword(
                    this.oldPassword,
                    this.newPassword,
                );
                console.log('result change password', res);
                let state = JSON.parse(res)
                console.log('state', state);
                if(state.success){
                    this.$snackbar.add({
                        type : 'success',
                        text : state.data.message
                    })
                    this.$router.push({name : 'login'})
                }else{
                    this.$snackbar.add({
                        type : 'error',
                        text : state.error
                    })
                }
            }
        },
        checkPassword(){
            if(this.newPassword != this.confirmPassword){
                return {
                    success : false,
                    error : 'Password Tidak Sama'
                }
            }else if(this.newPassword == '' && this.confirmPassword == ''){
                return {
                    success : false,
                    error : 'Password tidak boleh kosong'
                }
            }else{
                return {
                    success : true,
                    error : null
                }
            }
        }
    }
}

</script>