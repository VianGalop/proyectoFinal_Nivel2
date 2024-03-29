import {pool} from '../config/db.js'

export const getCommentsByPublication = async (req, res) =>{
    try {
        const { idUser, idPub } = req.params
        if(isNaN(idUser) || isNaN(idPub)){
            return res.status(500).json({message:'wrong route'})
        }

        // verificamos exista la publicacion
        const [consult] = await pool.execute('SELECT * FROM publications WHERE id_publication = ?',[idPub])
        if(consult.length <= 0){
            return res.status(404).json({ message: 'Publication not found' })
        }
        
        // VER LOS COMENTARIOS DE X PUBLICACIONES QUE USUARIO LA HIZO 
        const sql = 'SELECT p.title, us.username, co.comment_date ,co.content FROM publications p INNER JOIN comment_publication cop ON   p.id_publication= cop.publication_id INNER JOIN comments co ON co.id_comment = cop.comment_id INNER JOIN users us ON             us.id_user = co.user_id WHERE p.id_publication = ? AND p.user_id = ?';

        const [rows] = await pool.execute(sql,[idPub,idUser])

        if(rows.length <= 0){
            return res.status(404).json({ message: 'There are no comments in this publication' })
        }
        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const createComment = async (req, res)=>{
    try {
        const { idUser, idPub } = req.params
        const { content } = req.body
        const todayDate = new Date().toLocaleDateString('en-ZA');

        if(isNaN(idUser) || isNaN(idPub)){
            return res.status(500).json({message:'wrong route'})
        }

        //verificamos exista la publicacion
        const [consult] = await pool.execute('SELECT * FROM publications WHERE id_publication = ?',[idPub])
        if(consult.length <= 0){
            return res.status(404).json({ message: 'Publication not found' })
        }
        if(!content){
            return res.status(400).json({ message: 'Error! missing data...' })
        }

        // Creamos el comentario
        const sql = 'INSERT INTO comments(content, comment_date,user_id) VALUES(?,?,?)'
        const result = await pool.execute(sql,[content,todayDate,idUser])

        if(result[0].insertId <= 0){
            return res.status(500).json({ message: 'Error when creating the comment' })
        }

        // Ligamos el comentario a la publicacion mediante la tabla pívote
        const sql2 = 'INSERT INTO comment_publication(comment_id, publication_id) VALUES(?,?)'
        const intermedi = await pool.execute(sql2, [result[0].insertId, idPub])

        if(intermedi[0].insertId <= 0){
            return res.status(500).json({ message: 'Error posting your comment' })
        }

        res.status(201).json({ message: 'Created a comment'}) 
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const updateComment = async (req, res) =>{
    try {
        const { idUser, idCom } = req.params
        const { content } = req.body
        const todayDate = new Date().toLocaleDateString('en-ZA');

        if(isNaN(idUser) || isNaN(idCom)){
            return res.status(500).json({message:'wrong route'})
        }

        if(!content){
            return res.status(400).json({ message: 'Error! missing data...' })
        }

        // Creamos el comentario
        const sql = 'UPDATE comments SET content = ? , comment_date = ? WHERE id_comment = ? AND user_id = ?'
        const result = await pool.execute(sql,[content, todayDate, idCom, idUser])

        if(result[0].affectedRows <= 0){
            return res.status(500).json({ message: 'Error updating comment that does not exist' })
        }

        res.status(201).json({ message: 'Updated  a comment'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const deleteComment = async (req, res) =>{
    try {
        const { idUser, idCom } = req.params
        const todayDate = new Date().toLocaleDateString('en-ZA');

        if( isNaN(idUser) || isNaN(idCom)){
            return res.status(500).json({message:'wrong route'})
        }
        // Verificamos que es el usuario que creo el comentario es quien elimina
        const sql = 'DELETE FROM comments WHERE id_comment = ? AND user_id = ?'
        const result = await pool.execute(sql,[idCom, idUser])

        if(result[0].affectedRows <= 0){
            return res.status(500).json({ message: 'Error when deleted comment' })
        }

        res.status(201).json({ message: 'Deleted a comment'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}