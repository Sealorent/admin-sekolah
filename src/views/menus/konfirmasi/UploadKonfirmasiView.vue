<template>
    <LoadingCircle v-if="isLoading"/>
    <div class="flex flex-col h-100 w-screen" >
        <header class="bg-primaryColors top-0 sticky w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'home'})"/>
                <p class="text-center text-white font-[20px] font-mulish py-4">Upload Bukti</p>
                <p></p>
            </div>
        </header>
        <main class="flex-grow mt-4">
            <div class="container">
                <textarea placeholder="Masukkan keterangan..." v-model="keterangan" name="" id="" class="w-full block px-2.5  py-4  text-gray-900 bg-transparent rounded-lg border-1 border-blue-600  focus:ring-0 focus:border-blue-600">
                </textarea>
            </div>
            <div class="grid grid-cols-2 gap-4 w-full container mt-4 h-32 ">
                <div class="container bg-white shadow flex items-center rounded-xl" >
                    <img :src="imageBukti" alt="" v-if="imageBukti != null" >
                    <p class="mx-auto" v-if="imageBukti == null"><font-awesome-icon  class="text-primaryColors " icon="camera" /></p>
                </div>
                <div class="container flex items-center align-middle">
                    <button class="mx-auto rounded-full bg-primaryColors" @click="getImage">
                        <div class="flex flex-row space-x-3 px-8 py-1">
                            <input type="file" id="inputImage" ref="input" @change="onFilePicked"  style="display: none" accept="image/*;capture=camera">
                            <font-awesome-icon :icon="['fas', 'camera']"  class="text-white mt-1"/>
                            <p class="font-mulish pb-1 text-white">Upload</p>
                        </div>
                    </button> 
                </div>
            </div>
            <div class='fixed bottom-0 w-full flex justify-center container'>
                <button class="rounded-full w-full shadow-xl mb-3 bg-primaryColors"  v-on:click="uploadBukti">
                    <p class="text-[15px] py-2 font-mulish text-white">Kirim Bukti</p>
                </button>
            </div>
        </main>
    </div>
    
</template>
<script>
/* state */
import { konfirmasi } from '@/stores/konfirmasi.js';
const konfirmasiStore = konfirmasi()

/* local storage */
import mainLocalStorage from '@/services/mainLocalStorage.js';

/* components */
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

export default {
    name : 'uploadBuktiBayar',
    components : {
    LoadingCircle
},
    data() {
        return {
            imageFile : null,
            imageBukti : null,
            keterangan : null,
            isLoading : false,
        };
    },
    mounted(){

    },
    methods :{

        onFilePicked (event) {
            this.imageFile = event.target.files[0];
            this.imageBukti = URL.createObjectURL(event.target.files[0]);
        },

        getImage(){
            this.$refs.input.click();
        },
        

        async uploadBukti(){
            this.isLoading = true
            if(this.imageFile == null){
                this.$snackbar.add({
                    type : 'error',
                    text : 'Silahkan upload bukti pembayaran'
                })
                this.isLoading = false
            }else{
                const data = {
                    nis : mainLocalStorage.getAuth().nis,
                    kode_sekolah : mainLocalStorage.getAuth().kode_sekolah,
                    keterangan  : this.keterangan,
                    image : this.imageFile
                }

                const response = await konfirmasiStore.uploadBukti(data)
                const state = JSON.parse(response)
                if(state.error == null){
                    this.$snackbar.add({
                        type : 'success',
                        text : 'Berhasil mengirim bukti pembayaran'
                    })
                    this.$router.push({name : 'konfirmasi'})
                }else{
                    console.log(state.error);
                }
            }
            
        },
    }
}
</script>
