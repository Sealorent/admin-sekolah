<template>
    <div class="flex flex-col h-screen">
        <header class="bg-primaryColors  top-0 w-full">
            <div class="container flex flex-row items-center justify-between">
                <font-awesome-icon class="text-white" icon="arrow-left" @click="this.$router.push({name :'akun'})"/>
                <p class="text-center text-white font-[500px] font-mulish py-4">Edit Profil</p>
                <font-awesome-icon class="text-transparent" icon="pencil"/>
            </div>
        </header>
        <main class="flex-grow pt-10 relative ">
            <div class=" w-full justify-center">
                <img :src="imageProfile" alt="Logo" class=" mx-auto h-20 w-20 border-2 border-spacing-1 rounded-[50%]" />
                <input type="file" id="inputImage" ref="input" @change="onFilePicked"  style="display: none" accept="image/*">
                <p class="text-center text-green-700 font-[500px] font-montserrat py-4" @click="getImage()">Ganti Foto Profil</p>
            </div>
            <p class=" text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full  pl-4 mt-5">Data Pribadi</p>
            <div class="flex flex-col mx-2 mt-3">
                <div class="relative mt-4">
                    <input type="text" id="floating_outlined" v-model="nama_santri" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nama Lengkap</label>
                </div>
                <div class="relative mt-4">
                    <input type="text" id="floating_outlined" v-model="tempatlahir" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Tempat Lahir</label>
                </div>
                <div class="relative mt-4">
                    <input type="date" id="floating_outlined" v-model="tanggallahir" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Tanggal Lahir</label>
                </div>
                <p class="mt-4">Jenis Kelamin</p>
                <div class="flex between mt-2">
                    <div class="flex items-center mr-12">
                        <input type="radio" class="w-4 h-4 text-teal-600" name="gender" value="L" v-model="gender" :checked="gender == 'L'">
                        <label for="inline" class="ml-2 font-mulish text-lg" value="L">Laki Laki</label>
                    </div>
                    <div class="flex items-center mr-4">
                        <input type="radio" class="w-4 h-4 text-teal-600" name="gender" value="P" v-model="gender" :checked="gender == 'P'">
                        <label for="inline" class="ml-2 font-mulish text-lg">Perempuan</label>
                    </div>
                </div>
                <div class="relative mt-4">
                    <textarea type="text" id="floating_outlined" v-model="alamat" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer " rows="4" placeholder=" " ></textarea>  
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Alamat</label>
                </div>
            </div>
            <p class=" text-black font-[500px] font-montserrat py-1 bg-gray-300 w-full  pl-4 mt-3">Data Keluarga</p>
            <div class="flex flex-col  mt-4 mx-4 pb-20 ">
                <div class="relative mt-4">
                    <input type="text" id="floating_outlined" v-model="ayah" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nama Ayah</label>
                </div>
                <div class="relative mt-4">
                    <input type="text" id="floating_outlined" v-model="ibu" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nama Ibu</label>
                </div>
                <div class="relative mt-4">
                    <input type="text" id="floating_outlined" v-model="nomorwa" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-95 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">No. Whatsapp Orang Tua</label>
                </div>
                <div class="mt-4 flex justify-center">
                    <button @click="updateProfil" class="rounded-full border-2  text-white my-2 font-montserrat font-medium h-12 w-64 text-center bg-primaryColors">Simpan</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
/* state management */
import { profil } from '@/stores/profil.js'
const store = profil()


/* local storage */
import MainLocalStorage from '@/services/mainLocalStorage.js'
/* utils */
import DateFormat  from '@/utils/dateFormat.js';

export default {
    name: "EditProfil",
    data(){
        return {
            user : MainLocalStorage.getUser(),
            nama_santri : null,
            alamat : null,
            tempatlahir : null,
            tanggallahir : null,
            nomorwa : null,
            telegram : null,
            gender  : null,
            ayah : null,
            ibu : null,
            imageProfile : null,
            imageFile   : null,
            isloading : true,
        }
    },
    methods : {
        getImage(){
            this.$refs.input.click();
        },
        onFilePicked (event) {
            console.log(event.target.files);
            const files = event.target.files;
            this.imageFile = event.target.files[0];
            this.imageProfile = URL.createObjectURL(files[0]);
        },
        async updateProfil(){
            
            const data = {
                student_nis : MainLocalStorage.getAuth().nis,
                kode_sekolah : MainLocalStorage.getAuth().kode_sekolah,
                nama_santri : this.nama_santri,
                alamat : this.alamat,
                tempatlahir : this.tempatlahir,
                tanggallahir : this.tanggallahir,
                nomorwa : this.nomorwa,
                idtelegram : this.telegram,
                gender : this.gender,
                ayah : this.ayah,
                ibu : this.ibu,
                student_img : this.imageFile,
            }

            let response = await store.updateProfil(data)
            var state = JSON.parse(response)
            if(state.success){
                this.$router.push({name : 'profil'})
            }else{
                this.$snackbar.add({
                    type : 'error',
                    text : state.error
                })
            }
        }
    },
    computed : {
        formattedDate() {
            return DateFormat.fullYearInd(this.user.student_born_date)
        },
    },
    mounted(){
        console.log(MainLocalStorage.getProfil());
        this.imageProfile = MainLocalStorage.getProfil().student_img        
        this.gender = MainLocalStorage.getProfil().student_gender;
        this.nama_santri = MainLocalStorage.getProfil().nama;
        this.alamat = MainLocalStorage.getProfil().student_address;
        this.tempatlahir = MainLocalStorage.getProfil().student_born_place;
        this.tanggallahir = MainLocalStorage.getProfil().student_born_date;
        this.nomorwa = MainLocalStorage.getProfil().phone;
        this.ayah = MainLocalStorage.getProfil().student_name_of_father;
        this.ibu = MainLocalStorage.getProfil().student_name_of_mother;
        this.alamat = MainLocalStorage.getProfil().student_address
        this.ayah = MainLocalStorage.getProfil().student_name_of_father
        this.ibu = MainLocalStorage.getProfil().student_name_of_mother
        console.log(MainLocalStorage.getProfil().student_name_of_father);
    },
}
</script>