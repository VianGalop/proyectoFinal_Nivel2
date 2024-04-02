import {pool} from '../config/db.js'

export const getPublications = async (req,res) =>{
    try {
        // Verificar que es usuario_administrador
        const { idUser } = req.params

        if(isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        
        // Consulta a DB
        const [rows] = await pool.execute('SELECT * FROM publications WHERE user_id = ?', [idUser])

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


export const  getPublicationByCategory = async (req, res) =>{
    try {
        // Verificar que es usuario_administrador
        const {idUser, idC } = req.params

        if (isNaN(idUser) || isNaN(idC)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        
        // Consulta a DB
        const sql = 'SELECT c.name_category, p.title, p.content, p.publication_date FROM publications p INNER JOIN category_publication cp ON  p.id_publication= cp.publication_id INNER JOIN categories c ON c.id_category = cp.category_id WHERE c.id_category = ? AND     p.user_id = ?';
        const [rows] = await pool.execute(sql,[idC, idUser])

        // Verificar que haya datos
        if(rows.length <= 0){
            return res.status(404).json({ message: 'No publications were found in that category' })
        }

        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }     
}

export const getPublicationByTitle = async (req, res) =>{
    try {
        // Verificar que es usuario_administrador
        const { idUser, nameTitle } = req.params

        if (isNaN(idUser) || !nameTitle){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        
        // Consulta a DB
        const sql = 'SELECT * FROM publications p WHERE p.user_id = ? AND p.title = ?';
        const [rows] = await pool.execute(sql, [idUser, nameTitle])

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
        const { title, content } = req.body
        const publicationDate = new Date().toLocaleDateString('en-ZA');

        if( isNaN(idUser)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }
        // verificamos esten todos los datos del formulario
        if(!title || !content || !publicationDate){
            return res.status(400).json({ message: 'Error! missing data...' })
        }
        
        // Ingresar los datos a la db
        const sql = 'INSERT INTO publications (title, content,  publication_date, user_id) VALUES ( ?, ?, ?, ?)'
        const result = await pool.execute(sql,[title, content, publicationDate, idUser])

        // Validar el id del registro insertado
        if (result[0].insertId <= 0) {
            /* fs.unlinkSyn(`/uploads/${req.file.filename}`) */
            return res.status(500).json({ message: 'Error when creating the publication' })
        }
  
         // Traer el nombre del usuario insertado
        const publication = await pool.execute('SELECT title FROM publications WHERE id_publication = ?', [result[0].insertId])
  
        // Mensaje al cliente
        res.status(201).json({ message: 'Created publication... ' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something goes wrong' })
    }
} 


export const updatePublication = async (req,res) =>{
    try {
        const { idUser, idPub} = req.params
        const { title, content } = req.body
        const publicationDate = new Date().toLocaleDateString('en-ZA');

        if(isNaN(idUser) || isNaN(idPub)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
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
            return res.status(500).json({ message: 'Error when updating the publication' })
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

        if(isNaN(idUser) || isNaN(idPub)){
            return res.status(404).json({ message: 'Sorry, Not Found...'})
        }

        const sql = 'DELETE FROM publications WHERE user_id = ? AND id_publication = ? '
        const [result] = await pool.execute(sql, [idUser, idPub])

        if(result.affectedRows <= 0){
            return res.status(500).json({ message: 'Error when deleted publication' })
        }

        res.status(201).json({ message: 'Publication successfully deleted'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

