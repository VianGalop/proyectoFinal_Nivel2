import {pool} from '../config/db.js'
import { checkRol } from './checker.js'

// usuario  -> ver sus publicaciones o la otros usuarios (por nombre usuario)
// admini -> ver todas las publicaciones 
export const getPublications = async (req,res) =>{
    try {
        // Verificar que es usuario_administrador
        const { idUser } = req.params
        const { username} = req.body
        let sql =''
        let datos = []

        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        console.log(isAdmin);
        // Es el admin y quiere quiere todas las publicaciones
        if(isAdmin){
            sql = 'SELECT * FROM publications'
            datos = []
        }else if(username.length > 0){ // Quiere ver de las publicaciones de otros...
            const consulta = await pool.execute('SELECT id_user FROM users WHERE username = ?',[username])
            if(consulta.length === 0){
                res.status(400).json({message:`The user ${username} was not found`})
            }
            sql = 'SELECT title, content, publication_date FROM publications WHERE user_id = ?'
            datos = [consulta[0][0].id_user]
        }else{ //ver sus propias publicaciones
            sql = 'SELECT title, content, publication_date FROM publications WHERE user_id = ?'
            datos = [idUser]
        }

        const [rows]  = await pool.execute(sql, datos)
        // Verificar que haya datos
        if(rows.length <= 0){
            return res.status(404).json({ message: 'Publication not found' })
        }
        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

// admin -> ver Publicaciones de x Categoria
//user -> puede ver las categorias de sus propias publicaciones
export const  getPublicationByCategory = async (req, res) =>{
    try {
        // Verificar que es usuario_administrador
        const {idUser, idC } = req.params
        let sql = ''
        let datos = []

        if (isNaN(idUser) || isNaN(idC)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)

        if(!isAdmin){  // Consulta a publicaciones por categoria que sean propias
          sql = 'SELECT c.name_category, p.title, p.content, p.publication_date FROM publications p INNER JOIN category_publication cp ON  p.id_publication= cp.publication_id INNER JOIN categories c ON c.id_category = cp.category_id WHERE c.id_category = ? AND p.user_id = ?';
          datos = [idC, idUser]

        }else{ // ver todas las publicaciones de X categoria
            sql = 'SELECT c.name_category, p.title, p.content, p.publication_date FROM publications p INNER JOIN category_publication cp ON  p.id_publication= cp.publication_id INNER JOIN categories c ON c.id_category = cp.category_id WHERE c.id_category = ?';
            datos = [ idC ]  
        }
       
        
        const [rows] = await pool.execute(sql,datos)  
        // Verificar que haya datos
        if(rows.length <= 0 ){
            return res.status(404).json({ message: 'No publications were found in that category' })
        }
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }     
}

export const getPublicationByTitle = async (req, res) =>{
    try {
        // Verificar que es usuario_administrador
        const { idUser, nameTitle } = req.params
        const { username } = req.body
        let sql = ''
        let datos = []
        
        if (isNaN(idUser) || !nameTitle){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }
        
          //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        //
        if(isAdmin){ // todas las publicaciones con el X titulo
            sql = 'SELECT * FROM publications p WHERE p.title = ?';
            datos = [nameTitle]            
        }else if(username.length > 0){ // quiere ver otras publicaciones de otros usuarios con X titulo
            console.log(username);
            const consulta = await pool.execute('SELECT id_user FROM users WHERE username = ?',[username])
            if(consulta.length <= 0){
                res.status(400).json({message:`The user ${username} was not found`})
            }
            sql = 'SELECT p.title, p.content, p.publication_date FROM publications p WHERE p.user_id = ? AND p.title = ?';
            datos = [consulta[0][0].id_user, nameTitle] 
        }else{ // Solo ver sus propias publicaciones con X titulo
            sql = 'SELECT p.title, p.content, p.publication_date FROM publications p WHERE p.user_id = ? AND p.title = ?';
            datos = [idUser, nameTitle]
            
        }

         const [rows] = await pool.execute(sql, datos)

        // Verificar que haya datos
        if(rows.length <= 0){
            return res.status(404).json({ message: 'Publication not found' })
        }
        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
} 


export const createPublication = async (req,res)=>{
    try {
        const { idUser} = req.params        
        const { title, content, arrayCategories } = req.body
        const publicationDate = new Date().toLocaleDateString('en-ZA');

        if( isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        // verificamos esten todos los datos del formulario
        if(!title || !content || !publicationDate || arrayCategories.length <=0){
            return res.status(400).json({ message: 'Error! missing data...' })
        }

        // verificar que las categorias existan
        for (let i = 0; i < arrayCategories.length; i++) {
            const sql2 = 'SELECT * FROM categories WHERE id_category = ?'
            const [intermedi] = await pool.execute(sql2,[ arrayCategories[i]])

            if(intermedi.length <= 0){
                return res.status(400).json({ message :'The indicated category does not exist, check your data....'})
            }
        } 

        // Ingresar los datos a la db
        const sql = 'INSERT INTO publications (title, content,  publication_date, user_id) VALUES ( ?, ?, ?, ?)'
        const [result] = await pool.execute(sql,[title, content, publicationDate, idUser])

        // Validar el id del registro insertado
        if (result.insertId <= 0) {
            return res.status(500).json({ message: 'Error when creating the publication' })
        }

        // ligamos la publicacion a cada categoria mediante la tabla pívote
        for (let i = 0; i < arrayCategories.length; i++) {
            const sql2 = 'INSERT INTO category_publication(category_id, publication_id) VALUES(?,?)'
            const [intermedi] = await pool.execute(sql2,[ arrayCategories[i], result.insertId])

            if(intermedi.insertId <= 0){
                return res.status(500).json({ message: 'Error posting your category' })
            }
        }     
        // Mensaje al cliente
        res.status(201).json({ message: 'Created publication... ' })

    } catch (error) {
        console.log(error)
        if (error?.errno === 1452) {
            return res.status(400).json({ message :'The indicated category does not exist, check your data....'})
        } 
          
        return res.status(500).json({ message: 'Something goes wrong' })
    }
} 

//No permite cambiar de categoria
export const updatePublication = async (req,res) =>{
    try {
        const { idUser, idPub} = req.params
        const { title, content } = req.body
        const publicationDate = new Date().toLocaleDateString('en-ZA');

        if(isNaN(idUser) || isNaN(idPub)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        // verificamos esten todos los datos del formulario
        if(!title || !content || !publicationDate){
            return res.status(400).json({ message: 'Error! missing data...' })
        }
        
        // Ingresar los datos a la db
        const sql = 'UPDATE publications SET title = ?, content = ?, publication_date = ? WHERE id_publication= ? AND user_id = ?'
        const [result] = await pool.execute(sql,[title, content, publicationDate, idPub, idUser])

        // Validar el id del registro insertado
        if (result.affectedRows <= 0) {
            /* fs.unlinkSyn(`/uploads/${req.file.filename}`) */
            return res.status(500).json({ message: 'Error, when updating the publication' })
        }

        // Mensaje al cliente
        res.status(201).json({ message: 'Updated the publication'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const deletePublication = async (req,res) =>{
    try {
        const { idUser, idPub } = req.params
        let sql = ''
        let datos = [] 

        if(isNaN(idUser) || isNaN(idPub)){
            return res.status(404).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.        
        const isAdmin = await checkRol(idUser,res)

        // Verificamos que es el usuario que creo el comentario es quien elimina
        if(!isAdmin){
            sql = 'DELETE FROM publications WHERE user_id = ? AND id_publication = ? '
            datos = [idUser, idPub]
        }else{ // Caso contrario el que elimina es el comentario es el administrador
            sql = 'DELETE FROM publications WHERE id_publication = ?'
            datos = [idPub]
        }
        
        const [result] = await pool.execute(sql, datos)

        if(result.affectedRows <= 0){
            return res.status(500).json({ message: 'Error, when deleted publication' })
        }

        res.status(201).json({ message: 'Publication successfully deleted'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

