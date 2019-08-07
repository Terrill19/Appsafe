const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PrestamoSchema=new Schema({
    id_usuario:[{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }],
    hora_entrada:{type:String},
    hora_salida:{type:String},
    fecha_prestamo:{type:Date}
},{versionKey:false})

module.exports=mongoose.model('Prestamo',PrestamoSchema);