const express=require('express');
const router=express.Router();

const Vigilante=require('../models/vigilante');

// Get
router.get('/app/vigilantes',(req,res)=>{
    Vigilante.find({},(err,vigilante)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar el vigilante ${err}`
            })
        }
        if(!vigilante){
            res.status(404).json({
                message:'No existen el vigilante'
            })
        }
        res.status(200).send({vigilante})
    })
})

//Get id

router.get('/app/vigilantes/:id',(req,res)=>{
    Vigilantes.findById(id,(err,vigilante)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar los vigilantes ${err}`
            })
        }
        if(!vigilantes){
            res.status(404).json({
                message:'No existen vigilantes'
            })
        }
        res.status(200).send({vigilantes})
    })
})


//POST

router.post('/app/vigilantes', (req, res) => {
    let vigilante = new Vigilante({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular
    });
    vigilante.save((err, vigilanteStored) => {
        if (err) {
            res.status(500)
                .json({
                    message: `Error al guardar el vigilante ${err}`
                })
        } else {
            res.status(200)
                .json({
                    vigilante: vigilanteStored
                })
        }
    })

});

// DELETE

router.delete('/app/vigilante/:id',(req,res)=>{
    let id=req.params.id;
    Vigilante.findById(id,(err,vigilante)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
       Vigilante.deleteOne(err=>{
           if(err){
               res.status(500).json({
                   message:`Error al eliminar el vigilante ${err}`
               })
           }else{
               res.status(200).json({
                   message:'El vigilante ha sido eliminado con exito'
               })
           }
       })
    })
})

//UPDATE
router.put('/app/vigilante/:id',(req,res)=>{
    let id=req.params.id;
    let update=req.body;
    // updateOne
    Vigilante.findByIdAndUpdate(id,update,{new:true},(err,vigilanteUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el vigilante ${err}`
            })
        }
        res.status(200).json({
            vigilante:vigilanteUpdated
        })
    })
})
//Exports
module.exports=router;