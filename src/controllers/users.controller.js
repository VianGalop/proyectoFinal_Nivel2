import { pool } from '../config/db.js'

export const createUser = async (req,res) => {
    try {
        const { role} = req.params.role
        const { 
                name, 
                last_name: lastName, 
                email, 
                username, 
                password, 
                date_birthday:birthday, 
                gender
            } = req.body
        const { picture }  = req.file
        
        // verificamos esten todos los datos del formulario
        if(
            !role ||
            !name || 
            !lastName || 
            !email?.includes('@') || 
            !username || 
            !password || 
            !picture || 
            !birthday || 
            !gender
        ){
            return res.status(400).json({ message: 'Error! missing data...' })
        }

          // Ingresar los datos a la db
        const sql = 'INSERT INTO users (name, last_name, email, username, password, profile_picture, date_birthday, gender, role_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const [result] = await pool.execute(sql,[name, lastName, email, username, password, picture, birthday, gender, role])

        // Validar el id del registro insertado
        if (!result.insertId) {
            return res.status(500).json({ message: 'Error when creating the user' })
        }
  
         // Traer el usuario insertado
        const [user] = await pool.execute('SELECT username FROM users WHERE id_user = ?', [result.insertId])
  
      // Mensaje al cliente
      res.status(201).json({ message: 'Created user.', user })

    } catch (error) {
        console.log(error)
        let message = 'Error interno'
        let statusCode = 500
    
        // Validar si el error es por un username duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
        if (error?.errno === 1062) {
          message = 'Username already exists'
          statusCode = 400
          await fs.unlink(`uploads/${req.file.filename}`)
        }
    
        res.status(statusCode).json({ message })
    }
}

export const readUsers = async (req, res) =>{
    try {
        const {role} = req.params.role
        if(!role){

        }
        if(role != '2'){

        }

    } catch (error) {
        
    }
}

export const updateUser = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const deleteUser = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}