import { query } from "../db.js";

const getAlbumes = async (_, res) => {
    
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
try {
        let albumes = await query(`SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id`)
    res.send(albumes.rows)
    } catch (error) {
        console.error("Error al obtener los albumes:", error);
        res.status(500).send("Error al obtener los albumes");
    }
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
};

const getAlbum = async (req, res) => {
    let id = req.params.id
    try {  let album = await query(`SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes JOIN artistas ON albumes.artista = artistas.id where albumes.id = $1`, [id])
    res.send(album.rows[0])
    } catch (error) {
        console.error("Error al obtener el album:", error);
        res.status(500).send("Error al obtener el album");
    }
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
  
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */
};

const createAlbum = async (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
   try{ let album = await query(`insert into albumes (nombre, artista) values ($1, $2) returning *`, [req.body.nombre, req.body.artista])
    res.status(201).send(album.rows[0])}
    catch (error) {
        console.error("Error al crear el album:", error);
        res.status(500).send("Error al crear el album");
    }
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const updateAlbum = async (req, res) => {
   try{
     let album = await query(`update albumes set nombre = $1, artista = $2 WHERE id = $3 returning *`, [req.body.nombre, req.body.artista,req.params.id])
    res.send(album.rows[0])
   }
    catch (error) {
        console.error("Error al actualizar el album:", error);
        res.status(500).send("Error al actualizar el album");
    }
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
};

const deleteAlbum = async (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    try{let album = await query(`delete from albumes where id=$1`,[req.params.id])
    res.status(204).send(album)}
    catch (error) {
        console.error("Error al eliminar el album:", error);
        res.status(400).send("Error al eliminar el album");
    }
};

const getCancionesByAlbum = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
   try{
     let canciones = await query(`select canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones from canciones join albumes on canciones.album = albumes.id join artistas on albumes.artista = artistas.id where albumes.id = $1`,[req.params.id])
    res.send(canciones.rows)
   }
   catch (error) {
       console.error("Error al obtener las canciones del album:", error);
       res.status(500).send("Error al obtener las canciones del album");
   }
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;
