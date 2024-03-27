import Router from 'express'
import { createCategory, deleteCategory, getByCategory, getCategories, updateCategory } from '../controllers/categories.controller';

const router = Router(); 

/*
Lista de Categorioas (Admin)
GET role/idUser/publications
*/
router.get('/:role/categories', getCategories);

/*
Buscar por categoria (user-admin)
Cuantas publicaciones tengo en X categoria
GET role/idUser/category
*/
router.get('/:role/idUser/categories/:idc', getByCategory);

/*
Crear una categoria  (Admin)
POST role/idUser/create
*/
router.post('/:role/categories/create', createCategory);

/*
Actualizar categoria (Admin)
PATCH role/idUser/update/:idCat
*/
router.patch('/:role/categories/update/:idc',updateCategory);

/* 
Borrar categoria (Admin)
DELETE role/idUser/delete/:idCat
*/
router.delete('/:role/categories/delete/:idc',deleteCategory);


export default router;