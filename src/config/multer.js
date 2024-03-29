import multer from 'multer'

// Configuración de Multer, cb es una funcion Callback
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`) // Indicamos con file.originalname para tome el nombre original del archivo
  }
})

// Configurar la carga de los archivos
export const uploadImagen = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { // tipo archivo que recibe
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten imagenes'))
    }
  }
})

/* export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()
    )
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Solo se permiten archivos PDF'))
    }
  }
}) */