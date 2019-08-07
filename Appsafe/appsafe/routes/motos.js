const express= require('express');
const router=express.Router();

//MODELS
const Moto=require('../models/moto');

//GET
router.get('/app/motos', (req, res) => {
    Moto.find({}, (err, motos) => {
        if (err) {
            res.status(500).json({
                menssage: `Error al mostrar las motos ${err}`
            })
        }
        if (!motos) {
            res.status(404).json({
                menssage: 'No existen registros'
            })
        }
        res.status(200).send({ motos })
    })
});

//GET_id
router.get('/app/motos/:id', (req, res) => {
    let id = req.params.id;
    Moto.findById(id, (err, moto) => {
        if (err) {
            res.status(500).json({
                menssage: `Error al mostrar la moto ${err}`
            })
        }
        if (!moto) {
            res.status(404)
                .json({ menssage: 'No existe la moto' })
        }
        res.status(200)
            .json({
                moto
            })
    })
});

//POST

router.post('/app/motos', (req, res) => {
    let moto = new Moto({
        id_registro: req.body.id_registro,
        id_usuario: req.body.id_usuario,
        id_vigilante: req.body.id_vigilante,
        tipo: req.body.tipo,
        placa:req.body.placa,
        modelo:req.body.modelo,
        color:req.body.color,
        marca:req.body.marca
    });
    moto.save((err, motoStored) => {
        if (err) {
            res.status(500)
                .json({
                    message: `Error al guardar el moto ${err}`
                })
        } else {
            res.status(200)
                .json({
                    moto: motoStored
                })
        }
    })

});

// DELETE

router.delete('/app/moto/:id',(req,res)=>{
    let id=req.params.id;
    Moto.findById(id,(err,moto)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
       Moto.deleteOne(err=>{
           if(err){
               res.status(500).json({
                   message:`Error al eliminar la moto ${err}`
               })
           }else{
               res.status(200).json({
                   message:'la moto ha sido eliminada con exito'
               })
           }
       })
    })
})

//UPDATE
router.put('/app/moto/:id',(req,res)=>{
    let id=req.params.id;
    let update=req.body;
    // updateOne
    Moto.findByIdAndUpdate(id,update,{new:true},(err,motoUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar la moto ${err}`
            })
        }
        res.status(200).json({
            moto:motoUpdated
        })
    })
})
module.exports = router;