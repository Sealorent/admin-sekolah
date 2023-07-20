<template>
    <LoadingCircle v-if="isLoading"/>
    <div class="flex flex-col h-100">
        <header class="bg-primaryColors ">
            <div class="flex flex-row justify-between">
                <font-awesome-icon class="text-white m-4" icon="arrow-left" @click="$router.go(-1)" />
                <p class="text-center text-white font-[500px] font-montserrat py-4">Izin Keluar</p>
                <p class="m-4"></p>
            </div>
        </header>
        <main class="flex-grow mt-4  h-10 mx-4">
            <input type="date" name="" id="" v-model="date" class="block px-2.5 py-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-green-600  focus:ring-0 focus:border-green-600">
            <input type="time" name="" id="" v-model="start" class="block px-2.5 mt-4 py-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-green-600  focus:ring-0 focus:border-green-600">
            <input type="time" name="" id="" v-model="end" class="block px-2.5 mt-4 py-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-green-600  focus:ring-0 focus:border-green-600">
            <textarea placeholder="Keperluan"  v-model="keterangan" class="block px-2.5 mt-4 py-4 w-full text-gray-900 bg-transparent rounded-lg border-1 border-green-600  focus:ring-0 focus:border-green-600"></textarea>
            <div class="flex flex-col items-center mt-4">
                <button class="text-lg bg-primaryColors rounded-2xl w-full py-1 text-white" @click="ajukanIzin()">Ajukan Izin</button>
            </div>
        </main>
    </div>
</template>

<script>

/* state */
import { izin } from '@/stores/izin.js';
const izinStore = izin()

/* components */
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

/* local */
import mainLocalStorage from '@/services/mainLocalStorage.js';

export default {
    name : "AddIzinView",
    components : {
        LoadingCircle
    },
    data (){
        return {
            date : new Date().toISOString().slice(0,10),
            start : '',
            end : '',
            keterangan : '',
            isLoading : false
        }
    },
    methods : {
        async ajukanIzin(){
            this.isLoading = true
            var data = JSON.stringify({
                "kode_sekolah": mainLocalStorage.getAuth().kode_sekolah,
                "nis": mainLocalStorage.getAuth().nis,
                "status": "Diajukan",
                "tanggal": this.date,
                "waktu": this.start + "-" + this.end,
                "keperluan": this.keterangan
            });
            const res = await izinStore.addIzin(data)
            const state = JSON.parse(res)
            if(state.error == null){
                this.isLoading = state.loading
                this.$router.push({name : 'izin'})
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