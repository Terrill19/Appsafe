const express= require('express');
const router=express.Router();

//MODELS
const Registro=require('../models/registro');

//GET
router.get('/app/registros', (req, res) => {
    Registro.find({}, (err, registros) => {
        if (err) {
            res.status(500).json({
                menssage: `Error al mostrar los registros ${err}`
            })
        }
        if (!registros) {
            res.status(404).json({
                menssage: 'No existen registros'
            })
        }
        res.status(200).send({ registros })
    })
});

//GET_id
router.get('/app/registros/:id', (req, res) => {
    let id = req.params.id;
    Registro.findById(id, (err, registro) => {
        if (err) {
            res.status(500).json({
                menssage: `Error al mostrar el registro ${err}`
            })
        }
        if (!registro) {
            res.status(404)
                .json({ menssage: 'No existe el registro' })
        }
        res.status(200)
            .json({
                registro
            })
    })
});

//POST

router.post('/app/registros', (req, res) => {
    let registro = new Registro({
        hora_entrada: req.body.hora_entrada,
        hora_salida: req.body.hora_salida,
        fecha: req.body.fecha
    });
    registro.save((err, registroStored) => {
        if (err) {
            res.status(500)
                .json({
                    message: `Error al guardar el registro ${err}`
                })
        } else {
            res.status(200)
                .json({
                    registro: registroStored
                })
        }
    })

});

// DELETE

router.delete('/app/registro/:id',(req,res)=>{
    let id=req.params.id;
    Registro.findById(id,(err,registro)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
       Registro.deleteOne(err=>{
           if(err){
               res.status(500).json({
                   message:`Error al eliminar el registro ${err}`
               })
           }else{
               res.status(200).json({
                   message:'El registro ha sido eliminado con exito'
               })
           }
       })
    })
})

//UPDATE
router.put('/app/registro/:id',(req,res)=>{
    let id=req.params.id;
    let update=req.body;
    // updateOne
    Registro.findByIdAndUpdate(id,update,{new:true},(err,registroUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el registro ${err}`
            })
        }
        res.status(200).json({
            registro:registroUpdated
        })
    })
})
module.exports = router;