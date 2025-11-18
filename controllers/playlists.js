import { query } from "../db.js";

const getPlaylists = async (req, res) => {
  try {
      let playlists = await query(`select cancion_id,playlist_id from "playlists" where playlist_id=$1`,[req.params.id])
      res.send(playlists.rows)
    } catch (error) {
        console.error("Error al obtener las playlists:", error);
        res.status(500).send("Error al obtener las playlists");
    }
};

const createPlaylist = async (req, res) => {
    console.log("playlist_id:", req.body.playlist_id)
   try{ let playlist = await query("insert into playlists(playlist_id,cancion_id) values ($1,$2) returning *",[req.body.playlist_id,req.body.cancion_id])
    res.status(201).send(playlist.rows[0])
    }
    catch (error) {
        console.error("Error al crear la playlist:", error);
        res.status(500).send("Error al crear la playlist ");
    }
};

const deletePlaylist = async (req, res) => {
    try{
         let playlist = await query(`delete from "playlists" where playlist_id = $1`, [req.params.playlist_id])
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