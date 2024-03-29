import { uploadImagen } from '../config/multer.js'
import express from 'express'
import { getImagenByName, subirImagen, borradoImg, getImagenName } from '../controllers/picture.controller.js'

const handleError = (err, req, res, next) => {
  console.log(err)
  res.status(400).json({ error: 'Solo se admiten imagenes' })
}

const router = express.Router()

// ver todas las imagenes
router.get('/', getImagenName)

// Borra el archivo
router.delete('/:filename', borradoImg)

// Ruta para manejar la carga de archivos cuando no es una imagen
// single(nombreCampoForm)
router.post('/upload', uploadImagen.single('picture'), handleError, subirImagen)

// Mostrar la imagen
router.get('/:filename', getImagenByName)

export default router
