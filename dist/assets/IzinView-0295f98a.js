import{i as D}from"./izin-7403470b.js";import{m as f}from"./mainLocalStorage-8f3300f3.js";import{a as I,B as P,A as m}from"./arrayPeriod-d5354f41.js";import{F as p}from"./dateFormat-14868802.js";import{q as z}from"./style-05dc6766.js";import{L as C}from"./LoadingContainer-cfea96ab.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";import{r as d,o as a,c as r,x as L,z as g,a as e,b as c,F as h,u as x,t as n,y}from"./index-daccb512.js";import"./mainRepositories-3199904c.js";import"./flowbite-vue-29b55b18.js";const F=D(),S={name:"IzinView",components:{ButtonFilterYear:I,VueBottomSheet:z,ButtonFilter:P,LoadingCircle:C},data(){return{listIzin:[],sendData:null,selectedPeriod:[],listPeriod:m.getList(),arrDetail:null,message:null,title:"Pilih Tahun",isLoading:!1}},methods:{changeDate(s){return p.fullYearInd(s)},setData(){this.sendData=JSON.stringify({nis:f.getAuth().nis,kode_sekolah:f.getAuth().kode_sekolah,period_id:this.selectedPeriod==null||this.selectedPeriod<1?m.getArray():this.selectedPeriod.map(s=>parseInt(s))})},async getListIzin(){this.isLoading=!0,this.setData();const s=await F.listIzin(this.sendData),i=JSON.parse(s);i.error==null?(this.listIzin=i.data,this.message=i.error,this.isLoading=i.loading):(this.listIzin=[],this.isLoading=i.loading,this.message=i.error)},loadData(){this.getListIzin(),this.closeFilter()},setSelectedPeriod(s){this.selectedPeriod.length<0?this.selectedPeriod.push(s):this.selectedPeriod.includes(s)?this.selectedPeriod.splice(this.selectedPeriod.indexOf(s),1):this.selectedPeriod.push(s)},detail(s){this.arrDetail=s,this.openDetail()},batal(){this.selectedPeriod=[],this.loadData()},openFilter(){this.$refs.myBottomSheet.open()},closeFilter(){this.$refs.myBottomSheet.close()},openDetail(){this.$refs.detailIzin.open()},closeDetail(){this.$refs.detailIzin.close()},formatDateInd(s){return p.fullYearInd(s)}},mounted(){this.getListIzin(),console.log(this.listPeriod)}},j={class:"flex flex-col h-100"},A={class:"bg-primaryColors top-0 sticky w-full"},V={class:"container flex flex-row items-center justify-between"},N=e("p",{class:"text-center text-white font-[20px] font-mulish py-4"},"Izin",-1),T=e("p",null,null,-1),Y={class:"flex-grow pt-4"},J={class:"container flex flex-col gap-y-5"},O={class:"flex flex-row justify-between items-center"},K=e("p",{class:"font-mulish"},"Tahun Ajaran",-1),q={class:"flex flex-col"},E=["onClick"],G={class:"flex flex-col py-2"},H={class:"font-mulish"},M={class:"font-mulish text-gray-400"},Q={class:"flex items-center"},R={class:"font-mulish"},U={class:"flex items-center justify-center"},W={class:"fixed bottom-0 w-full flex justify-center my-2"},X=e("p",{class:"text-[15px] font-mulish text-primaryColors"},"Izin Keluar",-1),Z={class:"container"},$=e("p",{class:"text-gray-400 mb-3 font-mulish"},"Pilih Tahun Ajaran",-1),ee={class:"grid grid-cols-3 gap-3 pt-4"},te={class:"flex flex-row justify-end text-end pt-10"},se={key:0,class:"container"},ie={class:"flex flex-col"},oe={class:"mb-3"},le=e("p",{class:"font-mulish uppercase text-gray-500"},"Tanggal",-1),ne={class:"font-mulish capitalize"},ae={class:"mb-3"},re=e("p",{class:"font-mulish uppercase text-gray-500"},"Jam",-1),ce={class:"font-mulish"},de={class:"mb-3"},he=e("p",{class:"font-mulish uppercase text-gray-500"},"Keperluan",-1),ue={class:"font-mulish"},_e={class:"mb-3"},fe=e("p",{class:"font-mulish uppercase text-gray-500"},"Status",-1),me={class:"font-mulish"};function pe(s,i,ge,xe,o,l){const v=d("LoadingCircle"),u=d("font-awesome-icon"),w=d("ButtonFilterYear"),b=d("ButtonFilter"),_=d("vue-bottom-sheet");return a(),r(h,null,[o.isLoading?(a(),L(v,{key:0})):g("",!0),e("div",j,[e("header",A,[e("div",V,[c(u,{class:"text-white",icon:"arrow-left",onClick:i[0]||(i[0]=t=>this.$router.push({name:"home"}))}),N,T])]),e("main",Y,[e("div",J,[e("div",O,[K,c(w,{title:o.title,value:o.selectedPeriod.length>0,onClick:l.openFilter},null,8,["title","value","onClick"])]),e("div",q,[(a(!0),r(h,null,x(o.listIzin,t=>(a(),r("div",{class:"flex flex-row justify-between border-t-2 w-full",key:t,onClick:k=>l.detail(t)},[e("div",G,[e("p",H,n(l.changeDate(t.tanggal)+" , "+t.detail.waktu),1),e("p",M,n(t.detail.note),1)]),e("div",Q,[e("p",R,n(t.detail.status),1)])],8,E))),128)),e("div",U,n(o.message),1)])])]),e("div",W,[e("button",{onClick:i[1]||(i[1]=t=>s.$router.push({name:"addIzin"})),class:"rounded-full w-56 bg-white shadow-lg border-2 gap-x-2 py-2 flex items-center justify-center"},[c(u,{class:"text-primaryColors",icon:"add"}),X])])]),c(_,{ref:"myBottomSheet"},{default:y(()=>[e("div",Z,[$,e("div",ee,[(a(!0),r(h,null,x(o.listPeriod,t=>(a(),r("div",{key:t},[c(b,{title:t.label,value:o.selectedPeriod!=null?o.selectedPeriod.includes(t.id):"",onClick:k=>l.setSelectedPeriod(t.id)},null,8,["title","value","onClick"])]))),128))]),e("div",te,[e("button",{class:"font-mulish text-blue-500",onClick:i[2]||(i[2]=(...t)=>l.batal&&l.batal(...t))},"Batal"),e("button",{class:"ms-12 font-mulish text-blue-500",onClick:i[3]||(i[3]=(...t)=>l.loadData&&l.loadData(...t))},"Terapkan")])])]),_:1},512),c(_,{ref:"detailIzin"},{default:y(()=>[o.arrDetail!=null?(a(),r("div",se,[e("div",ie,[e("div",oe,[le,e("p",ne,n(l.formatDateInd(o.arrDetail.tanggal)),1)]),e("div",ae,[re,e("p",ce,n(o.arrDetail.waktu),1)]),e("div",de,[he,e("p",ue,n(o.arrDetail.note),1)]),e("div",_e,[fe,e("p",me,n(o.arrDetail.detail.status),1)])])])):g("",!0)]),_:1},512)],64)}const Be=B(S,[["render",pe]]);export{Be as default};
