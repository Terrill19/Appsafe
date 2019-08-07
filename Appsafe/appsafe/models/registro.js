const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const RegistroSchema=new Schema({
    id_vigilante:[{
        type:Schema.Types.ObjectId,
        ref:'Vigilante'
    }],
    hora_entrada:{type:String},
    hora_salida:{type:String},
    fecha:{type:String}
},{versionKey:false})

module.exports=mongoose.model('Registro',RegistroSchema)