import mockData from "../data.js";

export const state = {
    songs: [],
    playlists: [],
    currentPlaylistId: null
};

const musicModel = {
    initialize() {
        state.songs = mockData.songs;
        state.playlists = mockData.playlists;
        state.currentPlaylistId = state.playlists.length > 0 ? state.playlists[0].id : null;
    },

    getAllSongs() {
        return state.songs
    },

    getAllPlaylists() {
        return state.playlists
    },

    getCurrentPlaylist() {
        if (!state.currentPlaylistId) return null;
        return state.playlists.find(playlists => playlists.id === state.currentPlaylistId);
    },

    setCurrentPlaylist(playlistId) {
        state.currentPlaylistId = playlistId;
    },

    getPlaylistSongs(playlistId) {
        const playlist = state.playlists.find(p => p.id === playlistId);
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

        state.playlists.push(newPlaylist);
        return newPlaylist;
    },

    deletePlaylist(playlistId) {
        state.playlists = state.playlists.filter(playlist => playlist.id !== playlistId);

        if (state.currentPlaylistId === playlistId) {
            state.currentPlaylistId = state.playlists.length > 0 ? state.playlists[0].id : null;
        }
    },

    addSongToPlaylist(playlistId, songId) {
        const playlist = state.playlists.find(p => p.id === playlistId)
        if (!playlist) return false;

        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
        }
        return true;
    },

    removeSongFromPlaylist(playlistId, songId) {
        const playlist = state.playlists.find(p => p.id === playlistId)
        if (!playlist) return false;

        playlist.songs = playlist.songs.filter(id => id !== songId);
        return true;
    },

    isSongInPlaylist(playlistId, songId) {
        const playlist = state.playlists.find(p => p.id === playlistId);
        return playlist ? playlist.songs.includes(songId) : false;
    }
};

export default musicModel;