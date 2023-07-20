<template>
    <div class="relative w-full">
        <div class="relative mt-4 ">
            <div class="absolute inset-y-0 right-0 flex items-center pe-2">
                <button @click="isClicked = !isClicked">
                    <font-awesome-icon :icon="['fas', isClicked ?  'eye' : 'eye-slash']"  class="ps-10" />
                </button>
            </div>
            <input :type="isClicked ? 'text' : 'password'" :value="value"
                @input="$emit('update:value', $event.target.value)"   class="font-mulish block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="" class="absolute text-sm text-gray-500  font-mulish duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">{{ title }}</label>
            <!-- <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Floating outlined</label> -->
        </div>
    </div>
</template>
<script>
export default{
    name: "PasswordContainer",
    data(){
        return{
            isClicked: false,
        }
    },
    props:{
        title: String,
        value: String,
    },
    emits: ['update:value']
}
</script>
<style>
label:hover{
    
}
</style>