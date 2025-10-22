import { query } from "../db.js";

const getPlaylists = async (_, res) => {
    
  try {
      let playlists = await query(`select playlists.id, playlists.nombre`)
    res.send(playlists.rows)
    } catch (error) {
        console.error("Error al obtener las playlists:", error);
        res.status(500).send("Error al obtener las playlists");
    }
};

const createPlaylist = async (req, res) => {
   try{ let playlist = await query(`insert into playlist (id,nombre) values ($1,$2,$3, $4) returning *`,[req.body.nombre,req.body.id, 0])
    res.status(201).send(playlist.rows[0])
    }
    catch (error) {
        console.error("Error al crear la playlist:", error);
        res.status(500).send("Error al crear la playlist ");
    }
};

const deletePlaylist = async (req, res) => {
    try{
         let playlist = await query(`delete from playlist where id = $1`, [req.params.id])
    res.status(204).send(playlist)
    }
    catch (error) {
        console.error("Error al eliminar la playlist:", error);
        res.status(500).send("Error al eliminar la playlist");
    }
   
};


export default {
    getPlaylists,
    createPlaylist,
    deletePlaylist
};