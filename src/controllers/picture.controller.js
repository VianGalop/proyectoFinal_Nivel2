import path from 'node:path'
import fs from 'node:fs'
import { pool } from '../config/db.js'

export const getImagenName = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT profile_picture FROM users')
    const imageNames = result.map(row => row.imagen)
    const response = { imageNames }
    res.json(response)
  } catch (error) {
    res.status(500).json({ messge: error.message })
  }
}

export const getImagenByName = (req, res) => {
  try {
    const { filename } = req.params
    const absolutePath = path.resolve(`./uploads/${filename}`)

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).json({ message: 'Imagen no encontrada' })
      } else {
        res.sendFile(absolutePath)
      }
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}

export const uploadImg = async (req, res, filename) => {
  // const { filename } = req.file
  // res.json({ message: 'Imagen subida exitosamente' })
  try {
    const { picture } = req.file
    if (!picture) {
      return res.status(400).json({ message: 'Falta datos' })
    }

    const [result] = await pool.query('INSERT INTO users(profile_picture) VALUES (?)', [picture])
    if (result) {
      res.json({ message: 'Archivo subido corectamente' })
    } else {
      res.status(500).json({ message: 'Error al subir el archivo' })
    }
  } catch (error) {

  }
}

export const deleteImg = (req, res) => {
  try {
    const { picture } = req.params
    const absolutePath = path.resolve(`./uploads/${filename}`)

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).json({ message: 'Imagen no encontrado' })
      } else {
        res.sendFile(absolutePath)
        // Borrado archivo
        fs.unlinkSync(absolutePath)
        //res.status(200).json({ message: 'Imagen Borrado' })
      }
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}
