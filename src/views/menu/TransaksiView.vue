<template>
    <div class="flex flex-col h-100 ">
        <header class="bg-primaryColors top-0 w-full">
            <p class="text-center text-white font-[500px] font-mulish py-4">Transaksi</p>
        </header>
        <main>
            <div class="container">
                <div class="flex flex-nowrap overflow-x-auto scrollbar-hidden pt-2">
                    <div class="flex space-x-4">
                        <ButtonFilterYear :title="title"  :value="selectedYear != null ? true : false" />
                        <ButtonFilter title="Selesai" :value="selesai" @click="toggleSelesai"  />
                        <ButtonFilter title="Menunggu Pembayaran" :value="pending" @click="togglePending" />
                    </div>
                </div>
                <div class="pt-4">
                    <div class="flex flex-col" v-for="item in listTransaksi" :key="item" >
                        <div class="flex flex-row py-3 border-t-2">
                            <div class="container w-20 flex items-center">
                                <font-awesome-icon :icon="['fas', 'money-bill']" class="text-primaryColors align-middle h-8" />
                            </div>
                            <div class="container">
                                <p>{{ item.noref }}</p>
                                <p :class="item.status == 'PENDING' ? 'text-yellow-400' : 'text-green-500' ">{{ item.status }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col" v-for="item in listTabungan" :key="item">
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
/* utils */
import DateFormat from '@/utils/dateFormat.js';

export default {
    name : 'TransaksiView',
    components : {
        ButtonFilter,
        ButtonFilterYear,
        MenuBottomBar
    },
    data(){
        return {
            listTransaksi : [],
            listTabungan : [],
            selectedYear : null,
            selesai : false,
            pending : false,
            title : 'Semua Tahun'
        }
    },
    methods : {
        async getHistoryTransaksi(){
            let response = await getTransaksi.getHistoryTransaksi()
            var state = JSON.parse(response)
            console.log(state.data.history);
            this.listTransaksi = state.data.list_transaksi
            this.listTabungan = state.data.history
        },
        dateFormatInd(date){
            return DateFormat.fullYearInd(date)
        },
        togglePending(){
            
        },
        toggleSelesai(){

        }
    },
    mounted(){
        this.getHistoryTransaksi()
    },
}    
</script>