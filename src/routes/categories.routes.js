import { Router } from 'express'
import { createCategory, deleteCategory, getByCategory, getCategories, updateCategory } from '../controllers/categories.controller.js';


const router = Router(); 


/* Lista de Categorioas (Admin) */
router.get('/:idUser/categories', getCategories);


/* Buscar por categoria (admin)
Cuantas publicaciones tengo en X categoria */
router.get('/:idUser/categories/:idc', getByCategory); 


/* Crear una categoria  (Admin) */
router.post('/:idUser/create', createCategory);


/* Actualizar categoria (Admin) */
router.patch('/:idUser/update/:idc',updateCategory);


/* Borrar categoria (Admin) */
router.delete('/:idUser/delete/:idc',deleteCategory);


export default router;