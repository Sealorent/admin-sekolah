import{M as l}from"./mainLocalStorage-1cdc50c7.js";import{F as c}from"./dateFormat-14868802.js";import{_ as m}from"./_plugin-vue_export-helper-c27b6911.js";import{r as f,o as d,c as p,a as t,b as _,t as a}from"./index-c4694308.js";const h={name:"DetailKonfirmasiView",data(){return{dataKonfirmasi:l.getDetailKonfirmasi()}},methods:{changeDate(o){return c.fullYearInd(o)}},mounted(){console.log(this.dataKonfirmasi),console.log(localStorage.getItem("konfirmasi"))}},u={class:"flex flex-col h-100"},x={class:"bg-primaryColors top-0 sticky w-full"},g={class:"container flex flex-row items-center justify-between"},w=t("p",{class:"text-center text-white font-[20px] font-mulish py-4"},"Detail Konfirmasi",-1),b=t("p",null,null,-1),y={class:"flex-grow pt-4"},K={class:"container"},k={class:"container bg-white border-2 p-5"},v={class:"font-mulish text-[15px]"},D={class:"font-mulish text-[14px] pt-2 pb-4"},C=["src"],B={class:"flex flex-row space-x-4 items-center container mt-2"},V=t("button",{class:"bg-primaryColors rounded-full font-mulish text-sm py-1 text-white w-full"},"Batalkan",-1);function $(o,e,I,S,s,i){const n=f("font-awesome-icon");return d(),p("div",u,[t("header",x,[t("div",g,[_(n,{class:"text-white",icon:"arrow-left",onClick:e[0]||(e[0]=r=>this.$router.push({name:"konfirmasi"}))}),w,b])]),t("main",y,[t("div",K,[t("div",k,[t("p",v,a(i.changeDate(s.dataKonfirmasi.tanggal)),1),t("p",D,a(s.dataKonfirmasi.detail.catatan),1),t("img",{src:s.dataKonfirmasi.detail.gambar,alt:"",srcset:"",style:{height:"450px",width:"100%"}},null,8,C),t("div",B,[V,t("button",{onClick:e[1]||(e[1]=r=>o.$router.push({name:"konfirmasi"})),class:"bg-primaryColors rounded-full font-mulish text-sm py-1 text-white w-full"},"Kembali")])])])])])}const E=m(h,[["render",$]]);export{E as default};
