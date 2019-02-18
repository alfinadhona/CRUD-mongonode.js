//Create Server

const express = require('express'); //import module express
const app = express(); //eksekusi module express

//eksekusi express dengan memanggil variabel app
app.get('/test', function(request, respone){ //simbol / yang berarti "root" atau halaman utama, function req(request) dan res(response)
    respone.send("dhdhhdhddh") //mengirimkan respone dari http dan dikembalikan
})

app.listen('8888'); //definisi halaman port