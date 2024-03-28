import { uploadPicture } from '../config/multer.js'
import express from 'express'
import { getImagenByName, uploadImg, deleteImg, getImagenName } from '../controllers/picture.controller.js'

const handleError = (err, req, res, next) => {
  console.log(err)
  res.status(400).json({ error: 'Solo se admiten imagenes' })
}

const router = express.Router()

// ver todas las imagenes
router.get('/', getImagenName)

// Borra el archivo
router.delete('/:filename', deleteImg)

// Ruta para manejar la carga de archivos cuando no es una imagen
// single(nombreCampoForm)
router.post('/upload', uploadPicture.single('picture'), handleError, uploadImg)

// Mostrar la imagen
router.get('/:filename', getImagenByName)

export default router
