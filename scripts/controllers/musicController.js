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
    }
}

export default musicController;