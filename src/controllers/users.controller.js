import { pool } from '../config/db.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const createUser = async (req,res) => {
    try {
        const { role} = req.params
        const { 
                name, 
                last_name: lastName, 
                email, 
                username, 
                password, 
                date_birthday:birthday, 
                gender
            } = req.body
        const { filename }  = req.file

        if(isNaN(role)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        // verificamos esten todos los datos del formulario
        if(
            !name || 
            !lastName || 
            !email?.includes('@') || 
            !username || 
            !password || 
            !filename || 
            !birthday || 
            !gender
        ){
            return res.status(400).json({ message: 'Error! missing data...' })
        }
        
        // Ingresar los datos a la db
        const sql = 'INSERT INTO users (name, last_name, email, username, password, profile_picture, date_birthday, gender, role_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const result = await pool.execute(sql,[name, lastName, email, username, password, filename, birthday, gender, role])

        // Validar el id del registro insertado
        if (result[0].insertId <= 0) {
            /* fs.unlinkSyn(`/uploads/${req.file.filename}`) */
            deleteImg(filename);
            return res.status(500).json({ message: 'Error when creating the user' })
        }
  
         // Traer el nombre del usuario insertado
        const [user] = await pool.execute('SELECT username FROM users WHERE id_user = ?', [result[0].insertId])
  
        // Mensaje al cliente
        res.status(201).json({ message: 'Created user... Welcomen', user })

    } catch (error) {
        console.log(error)
        let message = 'Something goes wrong'
        let statusCode = 500
        deleteImg(req.file.filename);  
        // Validar si el error es por un username duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
        if (error?.errno === 1062) {
          message = 'Username already exists'
          statusCode = 400
        }
        
        /* fs.unlinkSyn(`/uploads/${req.file.filename}`)  */ 
        res.status(statusCode).json({ message })
    }
}

export const readUsers = async (req, res) =>{
    try {
        const {role} = req.params

        if(isNaN(role) || role != 1){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }

        // Consulta a DB
        const [rows] = await pool.execute('SELECT * FROM users')

        // Verificar que haya datos
        if(rows.length <= 0){
            return res.status(404).json({ message: 'Users not found' })
        }

        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const updateUser = async (req,res) =>{
    try {
        const { role, id } = req.params
        const { 
            name, 
            last_name: lastName, 
            email, 
            username, 
            password, 
            date_birthday:birthday, 
            gender
        } = req.body
        const { filename }  = req.file

        if(isNaN(role)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        // verificamos esten todos los datos del formulario
        if(
            !name || 
            !lastName || 
            !email?.includes('@') || 
            !username || 
            !password || 
            !filename || 
            !birthday || 
            !gender
        ){
            // await fs.unlink(`/uploads/${req.file.filename}`)
            return res.status(400).json({ message: 'Error! missing data...' })
        }
        
        const sql = 'UPDATE users SET name = ?, last_name = ?, email = ?, username = ?, password = ?, profile_picture = ?, date_birthday = ?, gender = ? WHERE id_user = ?'
        const result =  await pool.execute(sql, [name, lastName, email, username, password, filename, birthday, gender, id])

        if (result[0].affectedRows <= 0 ) {
            return res.status(500).json({ message: 'Error when updating the user' })
        }

        res.status(201).json({ message: 'User successfully updated'})
    } catch (error) {
        console.log(error)
        let message = 'Something goes wrong'
        let statusCode = 500
        // deleteImg(req.file.filename);  
        // Validar si el error es por un username duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
        if (error?.errno === 1062) {
          message = 'Username already exists'
          statusCode = 400
        }
        /* fs.unlinkSyn(`/uploads/${req.file.filename}`)  */ 
        res.status(statusCode).json({ message })
    }
}

// Borrar las publicaciones asociadas a X usuario ??? //PENDIENTE
export const deleteUser = async (req,res) =>{
    try {
        const { role, id } = req.params

        if(isNaN(role) || isNaN(id)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }

        const sql = 'DELETE FROM users WHERE id_user = ?'
        const result = await pool.execute(sql, [id])

        if(result[0].affectedRows <= 0){
            return res.status(500).json({ message: 'Error when deleted user' })
        }

        res.status(201).json({ message: 'User successfully deleted'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

function deleteImg(filename){
        const absolutePath = path.resolve(`./uploads/${filename}`)

        fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            // res.status(404).json({ message: 'Imagen no encontrado' })}
            console.log("Imagen no encontrada");
        } else {
            //res.sendFile(absolutePath)
            // Borrado archivo
            fs.unlinkSync(absolutePath)
            console.log("Borrando Imagen");
            //res.status(200).json({ message: 'Imagen Borrado' })
        }
        })
}