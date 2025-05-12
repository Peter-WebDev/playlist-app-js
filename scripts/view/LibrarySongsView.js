import View from './View.js';

export default class LibrarySongsView extends View {
    constructor() {
        super(document.getElementById('library-songs'))        
    }

    _generateHtml() {
        const { songs, playlistSongIds} = this._data;

        return `
            ${songs.map(song => {
                const isInPlaylist = playlistSongIds.includes(song.id);

                return `
                    <li data-id='${song.id}'>
                        <div class='song-details'>
                            <h3 class='song-title'>${song.title}</h3>
                            <div class='song-artist'>Artist: ${song.artist}</div>
                            <div class='song-genre'>Genre: ${song.genre}</div>
                        </div>
                        <button class="${isInPlaylist ? 'disabled-btn' : 'add-btn'}" 
                                data-action="add-song" 
                                ${isInPlaylist ? 'disabled' : ''}>
                            ${isInPlaylist ? 'Added' : 'Add'}
                        </button>
                    </li>
                `;
            }).join('')}
        `;
    }

    bindAddSongToPlaylist(handler) {
        this._parentElement.addEventListener('click', event => {
            const button = event.target.closest('button[data-action="add-song"]');
            if (button && !button.disabled) {
                const li = button.closest('li');
                const songId = parseInt(li.dataset.id);
                handler(songId);
            }
        });
    }
}