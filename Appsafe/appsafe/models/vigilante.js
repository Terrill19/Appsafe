const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const VigilanteSchema=new Schema({
    nombre:{type:String},
    apellido:{type:String},
    cedula:{type:String},
    direccion:{type:String},
    celular:{type:String}
},{versionKey:false})

module.exports=mongoose.model('Vigilante',VigilanteSchema)