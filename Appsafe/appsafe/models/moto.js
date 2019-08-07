const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const MotoSchema=new Schema({
    id_registro:[{
        type:Schema.Types.ObjectId,
        ref:'Registro'
    }],
    id_usuario:[{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }],
    id_vigilante:[{
        type:Schema.Types.ObjectId,
        ref:'Vigilante'
    }],
    tipo:{type:String},
    placa:{type:String},
    modelo:{type:String},
    color:{type:String},
    marca:{type:String}
},{versionKey:false})

module.exports=mongoose.model('Moto',MotoSchema);