import mockData from "../data";

export const state = {
    songs: [],
    playslists: [],
    currentPlaylistId: null
};

const musicModel = {
    initialize() {
        state.songs = mockData.songs;
        state.playslists = mockData.playlists;
        state.currentPlaylistId = state.playslists.length > 0 ? state.playslists[0].id : null;
    },

    getAllSongs() {
        return state.songs
    },

    getAllPlaylists() {
        return state.playslists
    },

    getCurrentPlaylist() {
        if (!state.currentPlaylistId) return null;
        return state.playslists.find(playlists => playlists.id === state.currentPlaylistId);
    },

    setCurrentPlaylist(playlistId) {
        state.currentPlaylistId = playlistId;
    },

    getPlayslistSongs(playlistId) {
        const playlist = state.playslists.find(p => p.id === playlistId);
        if (!playlist) return [];
        
        return playlist.songs.map(songId =>
            state.songs.find(song => song.id === songId)
        ).filter(Boolean);
    },

    createPlaylist(name) {
        const newPlaylist = {
            id: Date.now(),
            name: name,
            songs: []
        };

        state.playslists.push(newPlaylist);
        return newPlaylist;
    },

    deletePlaylist(playlistId) {
        state.playslists = state.playslists.filter(playlist => playlist.id !== playlistId);

        if (state.currentPlaylistId === playlistId) {
            state.currentPlaylistId = state.playslists.length > 0 ? state.playslists[0].id : null;
        }
    },

    addSongToPlaylist(playlistId, songId) {
        const playlist = state.playslists.find(p => p.id === playlistId)
        if (!playlist) return false;

        if (!playlist.song.includes(songId)) {
            playlist.songs.push(songId);
        }
        return true;
    },

    removeSongFromPlaylist(playlistId, songId) {
        const playlist = state.playslists.find(p => p.id === playlistId)
        if (!playlist) return false;

        playlist.songs = playlist.songs.filter(id => id !== songId);
        return true;
    },

    isSongInPlaylist(playlistId, songId) {
        const playlist = state.playslists.find(p => p.id === playlistId);
        return playlist ? playlist.songs.includes(songId) : false;
    }
};

export default musicModel;