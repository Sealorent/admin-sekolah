class a{setSessionLogin(e,t){localStorage.setItem("login",!0),localStorage.setItem("auth",JSON.stringify(e)),localStorage.setItem("user",JSON.stringify(t))}setProfil(e){localStorage.setItem("profil",JSON.stringify(e))}setPeriod(e){localStorage.setItem("period",JSON.stringify(e))}getProfil(){return JSON.parse(localStorage.getItem("profil"))}getPeriod(){return JSON.parse(localStorage.getItem("period"))}getUser(){return JSON.parse(localStorage.getItem("user"))}getAuth(){return JSON.parse(localStorage.getItem("auth"))}logOut(){localStorage.clear()}setDetailKonfirmasi(e){localStorage.setItem("konfirmasi",JSON.stringify(e))}getDetailKonfirmasi(){return JSON.parse(localStorage.getItem("konfirmasi"))}setParamsChangePassword(e){localStorage.setItem("params",JSON.stringify(e))}getParamsChangePassword(){return JSON.parse(localStorage.getItem("params"))}setNoIpaymu(e){localStorage.setItem("noIpaymu",JSON.stringify(e))}getNoIpaymu(){return JSON.parse(localStorage.getItem("noIpaymu"))}setInformation(e){localStorage.setItem("information",JSON.stringify(e))}getInformation(){return JSON.parse(localStorage.getItem("information"))}}const o=new a;export{o as M};
