const express = require('express');
const router = express.Router();

//MODELS
const Usuario = require('../models/usuario');

//GET
router.get('/app/usuarios', (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        if (err) {
            res.status(500).json({
                menssage: `Error al mostrar los usuarios ${err}`
            })
        }
        if (!usuarios) {
            res.status(404).json({
                menssage: 'No existen usuarios'
            })
        }
        res.status(200).send({ usuarios })
    })
});

//GET_id
router.get('/app/usuarios/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            res.status(500).json({
                menssage: `Error al mostrar el usuario ${err}`
            })
        }
        if (!usuario) {
            res.status(404)
                .json({ menssage: 'No existe el usuario' })
        }
        res.status(200)
            .json({
                usuario
            })
    })
});

//POST

router.post('/app/usuarios', (req, res) => {
    let user = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.apellido,
        direccion: req.body.direccion,
        celular: req.body.celular,
        correo: req.body.correo,
        carrera: req.body.carrera,
        semestre: req.body.semestre
    });
    user.save((err, usuarioStored) => {
        if (err) {
            res.status(500)
                .json({
                    message: `Error al guardar el usuario ${err}`
                })
        } else {
            res.status(200)
                .json({
                    usuario: usuarioStored
                })
        }
    })

});

// DELETE

router.delete('/app/usuario/:id',(req,res)=>{
    let id=req.params.id;
    Usuario.findById(id,(err,usuario)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
       Usuario.deleteOne(err=>{
           if(err){
               res.status(500).json({
                   message:`Error al eliminar el usuario ${err}`
               })
           }else{
               res.status(200).json({
                   message:'El usuario ha sido eliminado con exito'
               })
           }
       })
    })
})

//UPDATE
router.put('/app/usuario/:id',(req,res)=>{
    let id=req.params.id;
    let update=req.body;
    // updateOne
    Usuario.findByIdAndUpdate(id,update,{new:true},(err,usuarioUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el usuario ${err}`
            })
        }
        res.status(200).json({
            usuario:usuarioUpdated
        })
    })
})
module.exports = router;

