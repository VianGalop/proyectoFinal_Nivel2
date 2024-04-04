import { pool } from '../config/db.js'
import fs from 'node:fs/promises'
import path from 'node:path'

export const readUsers = async (req, res) =>{
    try {
        const {idUser} = req.params

        if(isNaN(idUser)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const rol = await pool.execute('SELECT role_type FROM users WHERE id_user = ?', [idUser])
        if(rol.length <= 0){
            return res.status(401).json({message:'No user was found'})
        }
        if( rol[0][0].role_type != 1){
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
export const createUser = async (req,res) => {
    try {
        const { idUser,} = req.params
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

        
        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        
        //verifica si es usuario no puede crear mas cuentas para otros usuarios.
        const rol = await pool.execute('SELECT role_type FROM users WHERE id_user = ?', [idUser])
        if(rol.length > 0 && rol[0].role_type != 1){
            return res.status(401).json({message:'There is already a user account'})
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
        const result = await pool.execute(sql,[name, lastName, email, username, password, filename, birthday, gender, 2])

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

        // Validar si el error es por un username duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
        if (error?.errno === 1062) {
          message = 'Username already exists'
          statusCode = 400
        }
        
        /* fs.unlinkSyn(`/uploads/${req.file.filename}`)  */ 
        res.status(statusCode).json({ message })
    }
}



export const updateUser = async (req,res) =>{
    try {
        const { idUser } = req.params
        const { usernamePass, passwordPass } = req.body
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

        if(isNaN(idUser)){
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
        
        // confirmacion de cambio de datos 
        const [user] = await pool.execute('SELECT * FROM users WHERE username = ? AND password= ?',[usernamePass, passwordPass])

        if(user.length <= 0){
            return res.status(511).json({message:'Sorry, You can not access.. Verify your username and password'})
        }

        // no es el usuario ni el administrador.
        if(user[0].idUser != idUser && user[0].role_type != 1){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }

        const sql = 'UPDATE users SET name = ?, last_name = ?, email = ?, username = ?, password = ?, profile_picture = ?, date_birthday = ?, gender = ? WHERE id_user = ?'
        const result =  await pool.execute(sql, [name, lastName, email, username, password, filename, birthday, gender, idUser])

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
        const { idUser } = req.params
        const { username, passwords } = req.body

        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }

         // confirmacion de eliminar el usuario
         const [user] = await pool.execute('SELECT * FROM users WHERE username = ? AND password= ?',[username, password])

         if(user.length <= 0){
             return res.status(511).json({message:'Sorry, You can not access.. Verify your username and password'})
         }
 
         // no es el usuario ni el administrador.
         if(user[0].idUser != idUser && user[0].role_type != 1){
             return res.status(400).json({ message: 'Sorry, You can not access..'})
         }

        const sql = 'DELETE FROM users WHERE id_user = ?'
        const result = await pool.execute(sql, [idUser])

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