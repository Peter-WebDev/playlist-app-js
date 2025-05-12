import musicModel from '../models/musicModel';
import LibrarySongsView from '../view/LibrarySongsView';
import PlaylistSongsView from '../view/PlaylistSongsView';
import PlaylistView from '../view/PlaylistsView';

const musicController = {
    init() {
        musicModel.initialize();

        this.playlistView = new PlaylistView();
        this.playlistSongsView = new PlaylistSongsView();
        this.librarySongsView = new LibrarySongsView();
    },

    onPlaylistChange() {
        // Code
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
}

export default musicController;