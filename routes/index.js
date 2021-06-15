const express = require('express');
const router = express.Router();

//importar express validator
const { body } = require('express-validator/check');

//importar el controlador
const proyectoController = require('../controllers/proyectoController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function(){
    //ruta para el home
    router.get('/', authController.usuarioAutenticado, proyectoController.proyectosHome);
    router.get('/nuevo-proyecto', authController.usuarioAutenticado, proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto', authController.usuarioAutenticado,
                body('nombre').not().isEmpty().trim().escape(),  
                proyectoController.nuevoProyecto);

    //listar proyectos
    router.get('/proyectos/:url', authController.usuarioAutenticado, proyectoController.proyectoPorUrl);

    //Actualizar el proyecto
    router.get('/proyecto/editar/:id', authController.usuarioAutenticado, proyectoController.formularioEditar);

    router.post('/nuevo-proyecto/:id', authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),  
    proyectoController.actualizarProyecto);

    // eliminar Proyecto
    router.delete('/proyectos/:url', authController.usuarioAutenticado, proyectoController.eliminarProyecto);
    
    //Tareas
    router.post('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea);

    //Actualizar Tarea
    router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea);

    //Eliminar Tarea
    router.delete('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea);

    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

    // iniciar sesión
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    // reestablecer contraseña
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);

 
    return router;


}
