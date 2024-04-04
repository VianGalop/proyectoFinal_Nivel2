import { pool } from  '../config/db.js'

export const checkRol = async (idUser, res) =>{
    //verifica el rol que tiene.
    const rol = await pool.execute('SELECT role_type FROM users WHERE id_user = ?', [idUser])
    
    if(rol.length <= 0){
        return res.status(401).json({message:'No user was found'})
    }
    
    if( rol[0][0].role_type != 1){
        return false
    }
    return true
}
