import musicModel from '../models/musicModel.js';
import LibrarySongsView from '../view/LibrarySongsView.js';
import PlaylistSongsView from '../view/PlaylistSongsView.js';
import PlaylistView from '../view/PlaylistsView.js';

const musicController = {
    init() {
        musicModel.initialize();

        this.playlistView = new PlaylistView();
        this.playlistSongsView = new PlaylistSongsView();
        this.librarySongsView = new LibrarySongsView();

        this.playlistView.bindCreatePlaylist(this.handleCreatePlaylist.bind(this));
        this.playlistView.bindSelectPlaylist(this.handleSelectPlaylist.bind(this));
        this.playlistView.bindDeletePlaylist(this.handleDeletePlaylist.bind(this));
        this.librarySongsView.bindAddSongToPlaylist(this.handleAddSongToPlaylist.bind(this));
        this.playlistSongsView.bindRemoveSongFromPlaylist(this.handleRemoveSongFromPlaylist.bind(this));

        this.onPlaylistChange();
    },

    onPlaylistChange() {
        const playlists = musicModel.getAllPlaylists();
        const currentPlaylist = musicModel.getCurrentPlaylist();
        const currentPlaylistId = currentPlaylist ? currentPlaylist.id : null;

        this.playlistView.render({
            playlists,
            currentPlaylistId
        });

        this.playlistView.updateCurrentPlaylist(currentPlaylist ? currentPlaylist.name : null);

        if (currentPlaylistId) {
            const playlistSongs = musicModel.getPlayslistSongs(currentPlaylistId);
            this.playlistSongsView.render(playlistSongs);

            const playlistSongIds = currentPlaylist.songs;

            this.librarSongsView.render({
                songs: musicModel.getAllSongs(),
                currentPlaylistId,
                playlistSongIds
            });
        } else {
            this.playlistSongsView.render([]);
            this.librarySongsView.render({
                songs: musicModel.getAllSongs(),
                currentPlaylistId: null,
                playlistSongIds: []
            });
        }
    },

    handleCreatePlaylist(name) {
        musicModel.createPlaylist(name);
        this.playlistView.clearPlaylistNameInput();
        this.onPlaylistChange();
    },

    handleSelectPlaylist(playlistId) {
        musicModel.setCurrentPlaylist(playlistId);
        this.onPlaylistChange();
    },

    handleDeletePlaylist(playlistId) {
        musicModel.deletePlaylist(playlistId);
        this.onPlaylistChange();
    },

    handleAddSongToPlaylist(songId) {
        const currentPlaylist = musicModel.getCurrentPlaylist();
        if (currentPlaylist) {
            musicModel.addSongToPlaylist(currentPlaylist.id, songId);
            this.onPlaylistChange();
        }
    },

    handleRemoveSongFromPlaylist(songId) {
        const currentPlaylist = musicModel.getCurrentPlaylist();
        if (currentPlaylist) {
            musicModel.removeSongFromPlaylist(currentPlaylist.id, songId);
            this.onPlaylistChange();
        }
    }
}

export default musicController;