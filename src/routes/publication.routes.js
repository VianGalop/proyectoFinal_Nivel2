import Router from "express";
import { createPublication, deletePublication, getPublicationByTitle, getPublications, updatePublication } from "../controllers/publication.controller";

const app = Router();

/*
Lista de Publicaciones
GET role/idUser/publications
*/
app.get('/role/:idUser/publications', getPublications);


/*
Buscar por Titulo publicacion
GET role/idUser/title
*/
app.get('/role/:idUser/publication_title', getPublicationByTitle);

/*
Crear una publicacion
POST role/idUser/create
*/
app.post('/role/:idUser/publication_create', createPublication);

/*
Actualizar publicacion
PATCH role/idUser/update/:idPub
*/
app.patch('/role/:idUser/update/:idPub', updatePublication);

/* 
Borrar publicacion
DELETE role/idUser/delete/:idPub
*/
app.delete('/role/:idUser/update/:idPub',deletePublication);