import { pool } from '../config/db.js'
import { checkRol } from './checker.js'

export const readUsers = async (req, res) =>{
    try {
        const {idUser} = req.params

        if(isNaN(idUser)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        if(!isAdmin){
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
        
        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }
        
        //verifica si es usuario no puede crear mas cuentas para otros usuarios.
        const rol = await pool.execute('SELECT role_type FROM users WHERE id_user = ?', [idUser])
        if( rol[0].length > 0 && rol[0][0].role_type != 1){
            return res.status(401).json({message:'There is already a user account and You can not access.. '})
        }      

        // verificamos esten todos los datos del formulario
        if(
            !name || 
            !lastName || 
            !email?.includes('@') || 
            !username || 
            !password ||
            !birthday || 
            !gender
        ){
            return res.status(400).json({ message: 'Error! missing data...' })
        }
        
        // Ingresar los datos a la db
        const sql = 'INSERT INTO users (name, last_name, email, username, password, date_birthday, gender, role_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        const result = await pool.execute(sql,[name, lastName, email, username, password, birthday, gender, 2])

        // Validar el id del registro insertado
        if (result[0].insertId <= 0) {
            return res.status(500).json({ message: 'Error when creating the user' })
        }
  
         // Traer el nombre del usuario insertado
        const [user] = await pool.execute('SELECT username FROM users WHERE id_user = ?', [result[0].insertId])
  
        // Mensaje al cliente
        res.status(201).json({ message: `Created user... Welcomen ${user[0].username}` })

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


//HAcer los cambios pide verificacion de credenciales
export const updateUser = async (req,res) =>{
    try {
        const { idUser,idOtro } = req.params
        const { usernamePass,passwordPass } = req.body
        const { 
            name, 
            last_name: lastName, 
            email, 
            username, 
            password, 
            date_birthday:birthday, 
            gender
        } = req.body
        let sql = ''
        let datos = []

        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        // verificamos esten todos los datos del formulario
        if(
            !name || 
            !lastName || 
            !email?.includes('@') || 
            !username || 
            !password || 
            !birthday || 
            !gender
        ){
            return res.status(400).json({ message: 'Error! missing data...' })
        }
        
        // confirmacion de cambio de datos 
        const [user] = await pool.execute('SELECT * FROM users WHERE username = ? AND password = ?',[usernamePass, passwordPass])

        if(user.length <= 0 || user[0].id_user !=idUser){
            return res.status(511).json({message:'Sorry, Verify your username and password... '})
        }


        // no es el usuario ni el administrador.
          const isAdmin = await checkRol(idUser,res)
          if(isAdmin){
              if(isNaN(idOtro)){ //Eres el administrador
                  return res.status(400).json({message: 'You have not indicated the user to updated' })
              }
              sql = 'UPDATE users SET name = ?, last_name = ?, email = ?,  username = ?, date_birthday = ?, gender = ? WHERE id_user = ?'
              datos =[name, lastName, email, username, birthday,gender,idOtro]
          }else{ // Actualizar sus propios datos
            if(idOtro > 0){
                return res.status(500).json({message: 'You can´t update' })
            }
             sql = 'UPDATE users SET name = ?, last_name = ?, email = ?, username = ?, password = ?, date_birthday = ?, gender = ? WHERE id_user = ?'
             datos = [name, lastName, email, username, password, birthday, gender,idUser]
          }


        const result =  await pool.execute(sql, datos)
        if (result[0].affectedRows <= 0 ) {
            return res.status(500).json({ message: 'Error when updating the user' })
        }

        res.status(201).json({ message: 'User successfully updated'})
    } catch (error) {
        console.log(error)
        let message = 'Something goes wrong'
        let statusCode = 500 
        // Validar si el error es por un username duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
        if (error?.errno === 1062) {
          message = 'Username already exists'
          statusCode = 400
        } 
        res.status(statusCode).json({ message })
    }
}

// Borrar las publicaciones asociadas a X usuario
// Debe derificar que si va a borrar con su username y password 
export const deleteUser = async (req,res) =>{
    try {
        const { idUser, idOtro } = req.params
        const { username, password } = req.body
        let sql = ''
        let datos = []

        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        if(!username && !password){
            return res.status(400).json({ message: 'Error! missing data...' })
        }
         // confirmacion de eliminar el usuario
         const [user] = await pool.execute('SELECT * FROM users WHERE username = ? AND password= ?',[username, password])

         if(user.length <= 0 || user[0].id_user !=idUser){
             return res.status(511).json({message:'Sorry, Verify your username and password... '})
         }
 
         // no es el usuario ni el administrador.
        const isAdmin = await checkRol(idUser,res)
        console.log(isAdmin);
        if(isAdmin){
            if(idOtro <= 0){ //Eres el administrador y quieres eliminar un usuario
                return res.status(400).json({message: 'You have not indicated the user to delete' })
            }
            sql = 'DELETE FROM users WHERE id_user = ?'
            datos =[idOtro]
        }else{ // Eliminar a si mismo.
            if(idOtro > 0){
                return res.status(400).json({ message: 'Sorry, You can not access..'})
            }
           sql = 'DELETE FROM users WHERE id_user = ?'
           datos = [idUser]
        }
 
        const result = await pool.execute(sql, datos)

        if(result[0].affectedRows <= 0){
            return res.status(500).json({ message: 'Error when deleted user' })
        }

        res.status(201).json({ message: 'User successfully deleted'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}
