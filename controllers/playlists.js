import { query } from "../db.js";

const getPlaylists = async (_, res) => {
    
  try {
      let playlists = await query(`select playlist.´laylist_id, playlists.cancion_id`)
    res.send(playlists.rows)
    } catch (error) {
        console.error("Error al obtener las playlists:", error);
        res.status(500).send("Error al obtener las playlists");
    }
};

const createPlaylist = async (req, res) => {
   try{ let playlist = await query(`insert into Playlist (playlist_id,cancion_id) values ($1,$2) returning *`,[req.body.playlist_id,req.body.cancion_id, 0])
    res.status(201).send(playlist.rows[0])
    }
    catch (error) {
        console.error("Error al crear la playlist:", error);
        res.status(500).send("Error al crear la playlist ");
    }
};

const deletePlaylist = async (req, res) => {
    try{
         let playlist = await query(`delete from Playlist where id = $1`, [req.params.playlist_id])
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