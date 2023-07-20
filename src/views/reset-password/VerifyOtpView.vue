<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>

<template>
    <div class="h-100 flex flex-col gap-y-5 items-center justify-center">
        <p class="font-mulish text-2xl mt-20">Verifikasi Kode OTP</p>
        <div class="container text-center">
            <p class="font-mulish text-sm">Kami Sudah Mengirimkan Kode OTP ke Whatsapp Anda</p>
        </div>
        <div class="container ">
            <div class="flex flex-row justify-center ">
                <v-otp-input
                    ref="otpInput"
                    v-model:value="bindModal"
                    input-classes="otp-input"
                    separator="-"
                    :num-inputs="6"
                    :should-auto-focus="true"
                    input-type="letter-numeric"
                    :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                    :placeholder="[' ', ' ', ' ', ' ', ' ', ' ']"
                    @on-change="handleOnChange"
                    @on-complete="handleOnComplete"
                />
            </div>
        </div>
        <div class="flex justify-center mt-10">
            <button @click="verifikasiOtp" class="bg-primaryColors px-10 rounded-full py-2 text-white">Verifikasi</button>
        </div>
    </div>
</template>
<script>
import { password } from '@/stores/password.js';
const store = password()

export default {
    name : "VerifyOtpView",
    data(){
        return{
            bindModal : '',
            otp : '',
            isLoading : false,
            error : null,
        }
    },
    methods : {
        async verifikasiOtp(){
            const res = await store.verifyOtp(this.otp)
            const state = JSON.parse(res)
            if(state.success){
                this.$snackbar.add({
                    type : 'success',
                    text : state.data
                })
                this.loading = state.loading
                this.$router.push({name : 'changePassword'})
            }else{
                this.isLoading = state.loading
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
        },
        handleOnComplete(value) {
            this.otp = value;
        },
        handleOnChange(value) {
            this.otp = value;
        },
    }
}
</script>