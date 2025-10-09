import { query } from "../db.js";

const getCanciones = async (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
  try {
      let canciones = await query(`select canciones.id, canciones.nombre, artistas.nombre AS nombre_artista,albumes.nombre AS nombre_album, canciones.duracion,canciones.reproducciones from canciones join albumes on canciones.album = albumes.id join artistas on albumes.artista = artistas.id`)
    res.send(canciones.rows)
    } catch (error) {
        console.error("Error al obtener las canciones:", error);
        res.status(500).send("Error al obtener las canciones");
    }
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
};

const getCancion = async (req, res) => {
        try {
            let cancion = await query(`select canciones.id, canciones.nombre,albumes.nombre as nombre_album, artistas.nombre AS nombre_artista, canciones.duracion,canciones.reproducciones from canciones join albumes on canciones.album = albumes.id join artistas on albumes.artista = artistas.id where canciones.id = $1`, [req.params.id])
        res.send(cancion.rows[0])
    }
    catch (error) {
        console.error("Error al obtener la canción:", error);
        res.status(500).send("Error al obtener la canción");
    }
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
};

const createCancion = async (req, res) => {
   try{ let cancion = await query(`insert into canciones (nombre,album,duracion,reproducciones) values ($1,$2,$3, $4) returning *`,[req.body.nombre,req.body.album, req.body.duracion, 0])
    res.status(201).send(cancion.rows[0])
    }
    catch (error) {
        console.error("Error al crear la canción:", error);
        res.status(500).send("Error al crear la canción");
    }
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
};

const updateCancion = async (req, res) => {
    try{
        let cancion = await query(`update canciones set nombre = $1, album = $2, duracion = $3 WHERE id = $4 returning *`, [req.body.nombre, req.body.album, req.body.duracion, req.params.id])
    res.send(cancion.rows[0])
    }
    catch (error) {
        console.error("Error al actualizar la canción:", error);
        res.status(500).send("Error al actualizar la canción");
    }
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
};

const deleteCancion = async (req, res) => {
    try{
         let cancion = await query(`delete from canciones where id = $1`, [req.params.id])
    res.status(204).send(cancion)
    }
    catch (error) {
        console.error("Error al eliminar la canción:", error);
        res.status(500).send("Error al eliminar la canción");
    }
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
};

const reproducirCancion = async (req, res) => {

    try {
         let cancion = await query(`update canciones set reproducciones = reproducciones + 1 where id = $1`, [req.params.id])
    res.status(204).send(cancion)
    } catch (error) {
        console.error("Error al reproducir la canción:", error);
        res.status(500).send("Error al reproducir la canción");
    }
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
};

const canciones = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

export default canciones;
