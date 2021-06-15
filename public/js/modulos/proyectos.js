import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

       //console.log(urlProyecto);

       

        Swal.fire({
            title: 'Estas seguro de Eliminar este proyecto?',
            text: "Si eliminas no podras recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {     
            if (result.isConfirmed) {
                // enviar peticion a axios

                const url = `${location.origin}/proyectos/${urlProyecto}`;
                
                axios.delete(url, {params: {urlProyecto}})
                    .then(function(respuesta){
                        console.log(respuesta);

                            Swal.fire( 
                                'Eliminado!',
                                respuesta.data,
                                'Exitosamente'
                            );

                                    // redireccionar al inicio
                                    // redireccionar al inicio
                            setTimeout(() => {
                                window.location.href = '/'
                            }, 300);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No  se pudo eliminar el proyecto'
                        }) 
                    })
                }
            })
         }
    )}

export default btnEliminar;
