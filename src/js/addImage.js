import { Dropzone } from 'dropzone'

// alert('funciona')

Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus imagenes aquí',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    paralleUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El límite es 1 archivo'
}