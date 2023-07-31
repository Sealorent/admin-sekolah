import{M as i}from"./mainLocalStorage-1cdc50c7.js";import{a as p}from"./auth-87b2ab7a.js";import{F as _}from"./dateFormat-14868802.js";import{_ as m}from"./_plugin-vue_export-helper-c27b6911.js";import{r as d,o as x,c as h,a as t,b as f,t as s}from"./index-c4694308.js";import"./mainRepositories-374c5722.js";const u=p(),g={name:"ProfilView",data(){return{profil:[],imageProfile:null}},methods:{async getProfil(){const n={kode_sekolah:i.getAuth().kode_sekolah,nis:i.getAuth().nis};let e=await u.profil(n),r=JSON.parse(e);this.profil=r.user,this.getImageProfile()},getImageProfile(){this.imageProfile=this.profil.student_img!=null?this.profil.student_img:"src/assets/images/dummyProfile.png"}},mounted(){this.getProfil()},computed:{formattedDate(){return _.fullYearInd(this.profil.student_born_date)},getFormatGender(){return this.profil.student_gender=="L"?"Laki-laki":"Perempuan"}}},y={class:"flex flex-col h-100"},b={class:"bg-primaryColors top-0 w-full"},k={class:"container flex flex-row items-center justify-between"},w=t("p",{class:"text-center text-white font-[500px] font-mulish py-4"},"Profil",-1),P={class:"w-full justify-center pt-5"},v=["src"],N={class:"text-center text-black font-[500px] font-montserrat pt-2"},D=t("p",{class:"text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full pl-4 mt-4"},"Data Santri",-1),I={class:"flex flex-col mt-4 ml-4"},S=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"NIS",-1),L={class:"text-black font-[500px] font-montserrat"},j=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Kelas",-1),A={class:"text-black font-[500px] font-montserrat"},C=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"UNIT",-1),F={class:"text-black font-[500px] font-montserrat"},T=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Madin",-1),V={class:"text-black font-[500px] font-montserrat"},B=t("p",{class:"text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full pl-4 mt-3"},"Data Pribadi",-1),K={class:"flex flex-col mt-4 ml-4"},M=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Tempat Tanggal Lahir",-1),G={class:"text-black font-[500px] font-montserrat"},J=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Jenis Kelamin",-1),O={class:"text-black font-[500px] font-montserrat"},E=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Alamat",-1),U={class:"text-black font-[500px] font-montserrat"},W=t("p",{class:"text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full pl-4 mt-3"},"Data Keluarga",-1),Y={class:"flex flex-col mt-4 ml-4 mb-10"},q=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Nama Ayah",-1),z={class:"text-black font-[500px] font-montserrat"},H=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"Nama Ibu",-1),Q={class:"text-black font-[500px] font-montserrat"},R=t("p",{class:"text-gray-400 font-[500px] font-montserrat py-1"},"No. Whatsapp Orang Tua",-1),X={class:"text-black font-[500px] font-montserrat"};function Z(n,e,r,$,o,a){const l=d("font-awesome-icon");return x(),h("div",y,[t("header",b,[t("div",k,[f(l,{class:"text-white",icon:"arrow-left",onClick:e[0]||(e[0]=c=>this.$router.push({name:"akun"}))}),w,f(l,{class:"text-white",icon:"pencil",onClick:e[1]||(e[1]=c=>this.$router.push({name:"editProfil"}))})])]),t("main",null,[t("div",P,[t("img",{src:o.imageProfile,alt:"Logo",class:"mx-auto h-20 w-20 border-2 border-spacing-1 rounded-[50%]"},null,8,v),t("p",N,s(o.profil.nama),1)]),D,t("div",I,[S,t("p",L,s(o.profil.nis??"-"),1),j,t("p",A,s(o.profil.class_name??"-"),1),C,t("p",F,s(o.profil.majors_s_name??"-"),1),T,t("p",V,s(o.profil.majors_name??"-"),1)]),B,t("div",K,[M,t("p",G,s(a.formattedDate),1),J,t("p",O,s(a.getFormatGender),1),E,t("p",U,s(o.profil.student_address??"-"),1)]),W,t("div",Y,[q,t("p",z,s(o.profil.student_name_of_father!=""?o.profil.student_name_of_father:"-"),1),H,t("p",Q,s(o.profil.student_name_of_mother!=""?o.profil.student_name_of_mother:"-"),1),R,t("p",X,s(o.profil.phone),1)])])])}const at=m(g,[["render",Z]]);export{at as default};
