<template>
  <button 
    class="rounded-full  px-4 text-[13px] font-mulish border-2 border-gray-300 text-white" 
    type="button" 
    @click="isClicked = !isClicked" 
    :class="isClicked  ? 'bg-red-600' : 'bg-green-600' " >
    <!-- {{ check }} -->
    {{ isClicked  ? 'Batalkan' : 'Bayar'  }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    value: Object,
    check : Boolean
  },
  data: () => ({
    isClicked: null,
  }),
  mounted : function () {
    this.isClicked = this.check
  },  
}
</script>

