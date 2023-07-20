<template>
  <div class="flex flex-col">

  <button 
    class="rounded-full  px-4 text-[14px] py-1 font-mulish border-2 border-gray-300 text-white" 
    type="button" 
    :class="nominal != null ? 'bg-red-600' : 'bg-green-600' " >
    {{ nominal != null  ? 'Batalkan' : 'Bayar'  }}
  </button>
    {{ nominal != null ? rupiah(nominal) : '' }}
    <!-- {{ rupiah(nominal) }} -->
  </div>

</template>

<script>
import Rupiah from '@/utils/rupiah.js'

export default {
  name: 'CustomButton',
  props: {
    // value: Object,
    check : Boolean,
    nominal : String
  },
  data: () => ({
    isClicked: null,
  }),
  methods : {
        rupiah(number){
            return Rupiah.format(number)
        },
  },
  mounted : function () {
    this.isClicked = this.check
  },  
}
</script>


