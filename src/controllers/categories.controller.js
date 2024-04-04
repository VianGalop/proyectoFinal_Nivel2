import { pool } from '../config/db.js'
import {  checkRol} from './checker.js'

export const getCategories = async (req, res) =>{
    
    try {
        // Verificar que es usuario_administrador
        const { idUser } = req.params

        if(isNaN(idUser)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        if(!isAdmin){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }
        
        // Consulta a DB
        const [rows] = await pool.execute('SELECT * FROM categories')

        // Verificar que haya datos
        if(rows.length <= 0){
            return res.status(404).json({ message: 'Categories not found' })
        }

        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

//Que publicaciones hay en X Categoria
export const getByCategory = async (req, res) =>{
    try {
        // Verificar que es usuario_administrador
        const { idUser, idc } = req.params

        if(isNaN(idUser) || isNaN(idc)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        if(!isAdmin){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }

        // Consulta a DB
        const sql = 'SELECT p.title, p.content, p.publication_date FROM publications p INNER JOIN category_publication cp ON  p.id_publication= cp.publication_id INNER JOIN categories c ON c.id_category = cp.category_id WHERE c.id_category = ?'

        const [rows] = await pool.execute(sql,[idc])

        // Verificar que haya datos en la consulta
        if(rows.length <= 0){
            return res.status(404).json({ message: 'There are no publications for this category'})
        } 

        // Envia la informacion.
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const createCategory = async (req, res) =>{
    try {
        const { idUser } = req.params
        const {name_category: nameCategory} = req.body
        const todayDate = new Date().toLocaleDateString('en-ZA');
        
        if(isNaN(idUser)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        if(!isAdmin){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }

        if(!nameCategory){
            return res.status(400).json({ message: 'Error! missing data...' })
        }

        const sql = 'INSERT INTO categories(name_category, create_date) VALUES (?,?)'
        const result = await pool.execute(sql, [nameCategory, todayDate])

        if (result[0].insertId <= 0) {
            return res.status(500).json({ message: 'Error when creating the category' })
        } 

        res.status(201).json({ message: 'Created category'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const updateCategory = async (req, res) =>{
    try {
        const { idUser, idc } = req.params
        const {name_category: nameCategory} = req.body
        const todayDate = new Date().toLocaleDateString('en-ZA');       
        
        // verificar params
        if(isNaN(idUser) || isNaN(idc)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

        //verifica el rol que tiene.
        const isAdmin = await checkRol(idUser,res)
        if(!isAdmin){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }

        if(!nameCategory){
            return res.status(400).json({ message: 'Error! missing data...' })
        }

        const sql = 'UPDATE categories SET name_category = ?, create_date = ? WHERE id_category = ?'
        const result = await pool.execute(sql, [nameCategory, todayDate, idc])

        if (result[0].affectedRows <= 0) {
            return res.status(500).json({ message: 'Error, updating category that does not exist' })
        }

        res.status(201).json({ message: 'Update the category'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

export const deleteCategory = async (req, res) =>{
    try {
        const { idUser, idc } = req.params

        if(isNaN(idUser)  || isNaN(idc)){
            return res.status(400).json({ message: 'Sorry, the route was not found...'})
        }

       //verifica el rol que tiene.
       const isAdmin = await checkRol(idUser,res)
       if(!isAdmin){
           return res.status(400).json({ message: 'Sorry, You can not access..'})
       }

        const sql = 'DELETE FROM categories WHERE id_category= ?'
        const result = await pool.execute(sql, [idc])

        if(result[0].affectedRows <= 0){
            return res.status(500).json({ message: 'Error when deleted category' })
        }
        res.status(201).json({ message: 'Delete the category'})
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}

