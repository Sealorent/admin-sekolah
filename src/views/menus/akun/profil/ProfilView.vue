<template>
    <div class="flex flex-col h-100 ">
        <header class="bg-primaryColors top-0 w-full ">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'akun'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Profil</p>
                <font-awesome-icon class="text-white" icon="pencil" @click="this.$router.push({name:'editProfil'})"/>
            </div>
        </header>
        <main>
            <div class=" w-full justify-center pt-5">
                <img :src="imageProfile" alt="Logo" class=" mx-auto h-20 w-20 border-2 border-spacing-1 rounded-[50%]" />
                <p class="text-center text-black font-[500px] font-montserrat pt-2">{{profil.nama}}</p>
            </div>
            <p class=" text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full  pl-4 mt-4">Data Santri</p>
            <div class="flex flex-col  mt-4 ml-4">
                <p class="text-gray-400  font-[500px] font-montserrat py-1">NIS</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.nis ?? '-' }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Kelas</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.class_name ?? '-' }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">UNIT</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.majors_s_name ?? '-' }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Madin</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.majors_name ?? '-'}}</p>
            </div>
            <p class=" text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full  pl-4 mt-3">Data Pribadi</p>
            <div class="flex flex-col  mt-4 ml-4">
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Tempat Tanggal Lahir</p>
                <p class=" text-black font-[500px] font-montserrat">{{  formattedDate }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Jenis Kelamin</p>
                <p class=" text-black font-[500px] font-montserrat">{{ getFormatGender }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Alamat</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.student_address ?? '-' }}</p>
            </div>
            <p class=" text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full  pl-4 mt-3">Data Keluarga</p>
            <div class="flex flex-col  mt-4 ml-4 mb-10">
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Nama Ayah</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.student_name_of_father != '' ? profil.student_name_of_father : '-' }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">Nama Ibu</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.student_name_of_mother != '' ? profil.student_name_of_mother : '-' }}</p>
                <p class="text-gray-400  font-[500px] font-montserrat py-1">No. Whatsapp Orang Tua</p>
                <p class=" text-black font-[500px] font-montserrat">{{ profil.phone }}</p>
            </div>
        </main>
    </div>
</template>

<script>
/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'
import {auth} from '@/stores/auth.js'
const authStore = auth()
/* utils */
import DateFormat from '@/utils/dateFormat.js'

export default {
    name: 'ProfilView',
    data(){
        return {
            profil : [],
            imageProfile : null
        }
    },
    methods : {
        async getProfil(){
            const data = {
                kode_sekolah : MainLocalStorage.getAuth().kode_sekolah,
                nis : MainLocalStorage.getAuth().nis
            }
            let response  = await authStore.profil(data)
            let state = JSON.parse(response)
            this.profil = state.user
            this.getImageProfile()
        },
        getImageProfile(){
            this.imageProfile =  this.profil.student_img != null ? this.profil.student_img : 'src/assets/images/dummyProfile.png';
        }
    },
    mounted(){
        this.getProfil()
    },
    computed: {
        formattedDate() {
            return DateFormat.fullYearInd(this.profil.student_born_date)
        },
        getFormatGender(){
            return this.profil.student_gender == 'L' ? 'Laki-laki' : 'Perempuan'
        }
    },
}
</script>