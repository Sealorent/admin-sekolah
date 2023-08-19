<template>
    <div class="container">
        <div class="grid grid-cols-4 pb-2">
            <button class="pt-3 text-center" v-for="item in menu" :key="item" @click="this.$router.push({name:item.route})" >
                <font-awesome-icon :icon="['fas', item.icon ]" size="xl" class="text-white" :style="routeName == item.route ? fill : transparent "/>
                <p class="pt-2 text-sm text-white font-mulish" :class="routeName == item.route ? 'text-opacity-100' : 'text-opacity-60' ">{{ item.name }}</p>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MenuBottomBar',
    data() {
        return {
            routeName : null,
            menu : [
                { route : 'home', icon : 'home', name : 'Beranda' },
                { route : 'transaksi', icon : 'file-invoice' , name : 'Transaksi' },
                { route : 'bantuan', icon : 'circle-question' , name : 'Bantuan' },
                { route : 'akun', icon : 'circle-user' , name : 'Akun' },
            ],
            transparent : {
                opacity : '0.3'
            },
            fill : {
                opacity : '1.0',
            }
        }
    },
    mounted(){
        this.routeName = this.$route.name
    }
}
</script>