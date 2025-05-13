import musicModel from '../models/musicModel.js';
import LibrarySongsView from '../view/LibrarySongsView.js';
import PlaylistSongsView from '../view/PlaylistSongsView.js';
import PlaylistsView from '../view/PlaylistsView.js';

const musicController = {
    init() {
        musicModel.initialize();

        this.playlistsView = new PlaylistsView();
        this.playlistSongsView = new PlaylistSongsView();
        this.librarySongsView = new LibrarySongsView();

        this.playlistsView.bindCreatePlaylist(this.handleCreatePlaylist.bind(this));
        this.playlistsView.bindSelectPlaylist(this.handleSelectPlaylist.bind(this));
        this.playlistsView.bindDeletePlaylist(this.handleDeletePlaylist.bind(this));
        this.librarySongsView.bindAddSongToPlaylist(this.handleAddSongToPlaylist.bind(this));
        this.playlistSongsView.bindRemoveSongFromPlaylist(this.handleRemoveSongFromPlaylist.bind(this));

        this.onPlaylistChange();
    },

    onPlaylistChange() {
        const playlists = musicModel.getAllPlaylists();
        const currentPlaylist = musicModel.getCurrentPlaylist();
        const currentPlaylistId = currentPlaylist ? currentPlaylist.id : null;

        this.playlistsView.render({
            playlists,
            currentPlaylistId
        });

        this.playlistsView.updateCurrentPlaylist(currentPlaylist ? currentPlaylist.name : null);

        if (currentPlaylistId) {
            const playlistSongs = musicModel.getPlaylistSongs(currentPlaylistId);
            this.playlistSongsView.render(playlistSongs);

            const playlistSongIds = currentPlaylist.songs;

            this.librarySongsView.render({
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
        musicModel.saveState();
        this.playlistsView.clearPlaylistNameInput();
        this.onPlaylistChange();
    },

    handleSelectPlaylist(playlistId) {
        musicModel.setCurrentPlaylist(playlistId);
        musicModel.saveState();
        this.onPlaylistChange();
    },

    handleDeletePlaylist(playlistId) {
        musicModel.deletePlaylist(playlistId);
        musicModel.saveState();
        this.onPlaylistChange();
    },

    handleAddSongToPlaylist(songId) {
        const currentPlaylist = musicModel.getCurrentPlaylist();
        if (currentPlaylist) {
            musicModel.addSongToPlaylist(currentPlaylist.id, songId);
            musicModel.saveState();
            this.onPlaylistChange();
        }
    },

    handleRemoveSongFromPlaylist(songId) {
        const currentPlaylist = musicModel.getCurrentPlaylist();
        if (currentPlaylist) {
            musicModel.removeSongFromPlaylist(currentPlaylist.id, songId);
            musicModel.saveState();
            this.onPlaylistChange();
        }
    }
}

export default musicController;