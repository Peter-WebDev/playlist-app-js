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
}