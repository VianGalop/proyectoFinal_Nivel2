import {pool} from '../config/db.js'

export const checkUser = async (req,res) =>{
    /*  SELECT id_user FROM users WHERE username =? AND password = ?   */
   try {
        const { username, password } = req.body
        // console.log(username, password);

        if(!username || !password){
            return res.status(400).json({message:'Error, incorrect data...'})
        }

        const result = await pool.execute('SELECT id_user,role_type FROM users WHERE username =? AND password = ?',[username,password])

        if(result[0].length === 0){
            return res.status(511).json({message:'Sorry, You can not access..'})
        }
        // console.log(result[0][0].id_user);
        // console.log(result[0][0].role_type);
        res.status(200).json({message:`Open Session... Bienvenido: ${username}`})
   } catch (error) {
        console.log(error)
        res.status(500).json({message:'Not Found'})
   }

}