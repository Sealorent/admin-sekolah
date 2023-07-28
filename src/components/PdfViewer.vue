<style>
/* Apply these styles to the container of the iframe */
.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* Optional: If you want to restrict the iframe from overflowing */
  overflow: hidden;
}

/* Make the iframe fill its container */
.iframe-container iframe {
  position: absolute;
  top: 0;
  bottom : 0;
  width: 100%;
  height: 100%;
  border: none; /* Optional: To remove the default iframe border */
}

.bottom-sheet__card{
    height: 60% !important;
}
</style>
<template>
    <div class="flex flex-col h-screen">
        <header class="bg-primaryColors top-0 w-full sticky flex flex-row items-center justify-between px-5">
            <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'transaksi'})"/>
            <p class="text-center text-white font-[500px] font-mulish py-4">Kwitansi</p>
            <p></p>
        </header>
        <main class="flex-grow ">
            <p class="flex h-screen items-center justify-center text-red-500 font-semibold">{{ message }}</p>
            <div class="iframe-container">
                <iframe :src="file" frameborder="0"></iframe>
            </div>
        </main>
    </div>
    <LoadingCircle v-if="isLoading" />

</template>

<script>
import { pdf } from '@/stores/getPdf.js'
const pdfStore = pdf()
/* components */
import LoadingCircle from '@/components/loader/LoadingContainer.vue'

export default {
    name : 'PdfViewer',
    components : {
        LoadingCircle
    },
    data (){
        return {
            file : null,
            message : null,
            set : null
        }
    },
    methods : {
        async getPDF(){
            this.isLoading = true
            const response = await pdfStore.getPdf()
            const state = JSON.parse(response)
            console.log(state);
            if(state.success){
                this.isLoading = state.loading
                this.file = state.data
            }else{
                this.message = state.error
                this.isLoading = state.loading
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
        }
    },
    mounted(){
        this.getPDF()
        console.log(this.message);
        console.log(this.set);
    },

}
</script>
