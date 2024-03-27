import { pool } from '../config/db.js'

export const getCategories = async (req, res) =>{
    try {
        // Verificar que es usuario_administrador
        const {role} = req.params.role
        if(!role || role != '2'){
            return res.status(400).json({ message: 'Sorry, You can not access..'})
        }

        // Consulta DB
        const [result] = pool.execute('SELECT * FROM categories')

    } catch (error) {
        
    }
}

export const getByCategory = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const createCategory = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const updateCategory = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const deleteCategory = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}