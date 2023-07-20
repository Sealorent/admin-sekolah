<template>
    <button class="rounded-full flex flex-shrink-0  items-center whitespace-nowrap text-primaryColors p-2  text-[13px] font-mulish border-2 border-gray-300 ms-1 " :class="value == true ? 'bg-green-300 font-bold' : 'bg-teal-50' " onchange="onChange($event)" >
    <span class="mr-2" v-if="value">
        <font-awesome-icon :icon="['fas', 'check']" class="text-primaryColors align-middle mb-1" />
    </span>
    <span class="whitespace-nowrap">
        {{ title }}
    </span>
    </button>
</template>
<script>
export default {
    name: 'ButtonFilter',
    props: {
        title: {
            type: String,
        },
        value :{
            type: Boolean,
        }
    },
    // emits: ['update:value']
}
</script>