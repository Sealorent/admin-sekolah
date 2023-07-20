<template>
    <div class="flex flex-col h-screen">
        <header class="bg-primaryColors w-full top-0">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'akun'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Kebijakan Privasi</p>
                <font-awesome-icon class="text-transparent" icon="pencil"/>
            </div>
        </header>
        <main class="flex-grow ">
            <iframe class="w-full h-full" src="https://adminsekolah.net/kebijakan-privasi/"/>
        </main>
    </div>
</template>
<script>
    export default{
        name: "KebijakanPrivasiView",
    }
</script>