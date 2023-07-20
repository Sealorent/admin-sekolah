<template>
    <div class="container bg-gray-200 opacity-25 fixed inset-0 flex items-center justify-center z-50">
        <div class="flex flex-col items-center justify-center">
            <Spinner class=" text-blue-500" size="12" color="blue"/>
            <p class="font-mulish ">Loading...</p>
        </div>
    </div>
</template>
<script>
import { Spinner } from 'flowbite-vue';
export default {
    name : "LoadingContainer",
    components : {
        Spinner
    }
}
</script>