const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UsuarioSchema=new Schema({
    nombre:{type:String},
    apellido:{type:String},
    cedula:{type:String},
    direccion:{type:String},
    celular:{type:String},
    correo:{type:String},
    carrera:{type:String},
    semestre:{type:String}
},{versionKey:false})

module.exports=mongoose.model('Usuario',UsuarioSchema);