//import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //import body-parser

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "siswa";

let dbo = null;
MongoClient.connect(DBurl, (err,db) => {
    if(err) throw err;
    dbo = db.db(DBname);
})

app.use(bodyParser.urlencoded({extended: false})) //harus berasa diatas semua endpoint

//method get
app.get('/siswa', (request, response)=>{
    dbo.collection("input").find().toArray((err, res) =>{
        if(err) throw err;
        response.json(res);
    })
    // let namaSiswa = request.params.nama;
    // response.end("Menampilkan nama siswa "+ namaSiswa);
})

//method post
app.post('/siswa',(request, response)=>{
    let namaSiswa = request.body.nama;
    let alamatSiswa = request.body.alamat;
    dbo.collection("input").insert({
        nama : namaSiswa,
        alamat : alamatSiswa
    }, (err, res)=>{
        if(!(err)){
            response.json(res);
            response.end("data berhasil masuk");
        }else{
            throw err;
        }
    })
})
    // response.end('Menampilkan siswa baru ' + namaSiswa + ', yang beralamat di ' + alamat);

//endpoint delete
app.delete('/siswa/:id',(request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("input").deleteOne({
        _id : id_object
    }, (err, res) =>{
        if(err) throw err;
        response.end("data brhasil dihapus");
    })
})

//endpoint update
app.put('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa = request.body.jurusan;
    dbo.collection("input").updateOne({
        _id : id_object
    }, {$set:{
        nama : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa
    }},
    (err,res)=>{
        if(err) throw err;
        response.end("data berhasil diupdate");
    })
})


//inisialisasi port
app.listen('1000', (e)=>{
    console.log(e);
})