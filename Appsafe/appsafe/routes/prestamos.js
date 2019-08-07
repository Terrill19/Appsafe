const express=require('express');
const router=express.Router();

const Prestamo=require('../models/prestamo');

//Get

router.get('/app/prestamos',(req,res)=>{
    Prestamo.find({},(err,prestamos)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        if(!prestamos){
            res.status(404).json({
                menssage:'No existen prestamos'
            })
        }
        res.status(200).json({
            prestamos
        })
    })
})

// Get id
router.get('/app/prestamo/:id',(req,res)=>{
    let id=req.params.id;
    Prestamo.findById(id,(err,prestamo)=>{
        if(err){
            res.status(.500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        if(!prestamo){
            message:'No existe el prestamo'
        }
        res.status(200).json({
            prestamo
        })
    })
})

//POST

router.post('/app/prestamos', (req, res) => {
    let prestamo = new Prestamo({
        hora_entrada: req.body.hora_entrada,
        hora_salida:req.body.hora_salida,
        fecha_prestamo: req.body.fecha_prestamo
    });
    prestamo.save((err, prestamoStored) => {
        if (err) {
            res.status(500)
                .json({
                    message: `Error al guardar el prestamo ${err}`
                })
        } else {
            res.status(200)
                .json({
                    prestamo: prestamoStored
                })
        }
    })

});

// DELETE

router.delete('/app/prestamo/:id',(req,res)=>{
    let id=req.params.id;
    Prestamo.findById(id,(err,prestamo)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
       Prestamo.deleteOne(err=>{
           if(err){
               res.status(500).json({
                   message:`Error al eliminar el prestamo ${err}`
               })
           }else{
               res.status(200).json({
                   message:'El prestamo ha sido eliminado con exito'
               })
           }
       })
    })
})

//UPDATE
router.put('/app/prestamo/:id',(req,res)=>{
    let id=req.params.id;
    let update=req.body;
    // updateOne
    Prestamo.findByIdAndUpdate(id,update,{new:true},(err,prestamoUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el prestamo ${err}`
            })
        }
        res.status(200).json({
            prestamo:prestamoUpdated
        })
    })
})
module.exports=router;