<template>
    <div class="flex flex-col h-100 ">
        <header class="bg-primaryColors top-0 w-full sticky flex flex-row items-center justify-between px-5">
            <p></p>
            <p class="text-center text-white font-[500px] font-mulish py-4">Transaksi</p>
            <font-awesome-icon class="text-white" icon="receipt" @click="this.$router.push({name:'getPdf', params: { type : 'kwitansi' }})"/>
        </header>
        <main>
            <div class="flex flex-nowrap overflow-x-auto scrollbar-hidden pt-2">
                <div class="flex space-x-4">
                    <ButtonFilterYear :title="title"  :value="selectedPeriod.length > 0 ? true : false" @click="open" />
                    <ButtonFilter title="Selesai" :value="selesai" @click="toggleSelesai"  />
                    <ButtonFilter title="Menunggu Pembayaran" :value="pending" @click="togglePending" />
                </div>
            </div>
            <div class="container">
                <div class="pt-4">
                    <!-- <div class="flex flex-col" v-for="item in listTransaksi" :key="item" >
                        <div class="flex flex-row py-3 border-t-2">
                            <div class="container w-20 flex items-center">
                                <font-awesome-icon :icon="['fas', 'money-bill']" class="text-primaryColors align-middle h-8" />
                            </div>
                            <div class="container">
                                <p>{{ item.noref }}</p>
                                <p :class="item.status == 'PENDING' ? 'text-yellow-400' : 'text-green-500' ">{{ item.status }}</p>
                            </div>
                        </div>
                    </div> -->
                    <div class="flex flex-col" v-for="item in listHistory" :key="item">
                        <div class="flex flex-row py-3 border-t-2">
                            <div class="container w-20 flex items-center">
                                <font-awesome-icon :icon="['fas', 'money-bill']" class="text-primaryColors align-middle h-8" />
                            </div>
                            <div class="container">
                                <p>{{ item['no ref'] }}</p>
                                <p>{{ dateFormatInd(item.tanggal) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- bottom bar -->
        <footer class=" bg-primaryColors flex bottom-0 fixed w-full">
            <MenuBottomBar/>
        </footer>
        
        <vue-bottom-sheet ref="listPeriod">
            <div class="container">
                <p class="text-gray-400 mb-3 font-mulish">Pilih Tahun Ajaran</p>
                <div class="grid grid-cols-3 gap-3 pt-4" >
                    <div v-for="item in listPeriod" :key="item">
                        <ButtonFilter :title="item.label" :value="selectedPeriod != null ? selectedPeriod.includes(item.id) : ''" @click="setSelectedPeriod(item.id)"/>
                    </div>
                </div>
                <div class="flex flex-row justify-end text-end pt-10">
                    <button class="font-mulish text-blue-500">Batal</button>
                    <button class="ms-12 font-mulish text-blue-500" @click="loadData">Terapkan</button>
                </div>
            </div>
        </vue-bottom-sheet>
    </div>
</template>
<script>
/* state */
import { transaksi } from '@/stores/transaksi.js';
const getTransaksi = transaksi()
/* component */
import ButtonFilter from '@/components/ButtonFilter.vue';
import ButtonFilterYear from '@/components/ButtonFilterYear.vue'
import MenuBottomBar from '@/components/MenuBottomBar.vue'
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";

/* utils */
import DateFormat from '@/utils/dateFormat.js';
import ArrayPeriod from '@/utils/arrayPeriod.js'

export default {
    name : 'TransaksiView',
    components : {
        ButtonFilter,
        ButtonFilterYear,
        MenuBottomBar,
        VueBottomSheet
    },
    data(){
        return {
            listTransaksi : [],
            listHistory : [],
            listPeriod : ArrayPeriod.getList(),
            selectedPeriod : [],
            selesai : false,
            pending : false,
            title : 'Semua Tahun'
        }
    },
    methods : {
        async getHistoryTransaksi(){
            let response = await getTransaksi.getHistoryTransaksi()
            var state = JSON.parse(response)
            console.log('getHistoryTransaksi');
            console.log(state);
            this.listTransaksi = state.data.list_transaksi
            this.listHistory = state.data.history
        },
        dateFormatInd(date){
            return DateFormat.fullYearInd(date)
        },
        togglePending(){
            
        },
        toggleSelesai(){

        },
        open(){
            this.$refs.listPeriod.open()
        },
        close(){
            this.$refs.listPeriod.close()
        },
    },
    mounted(){
        this.getHistoryTransaksi()
    },
}    
</script>