import { Dropzone } from 'dropzone'

// alert('funciona')

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//console.log(token)

Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus imagenes aquí',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    paralleUploads: 1,
    autoProcessQueue: true,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El límite es 1 archivo',
    headers: {
        'CSRF-Token':token
    }
}