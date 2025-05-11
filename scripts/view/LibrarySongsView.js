import View from './View';

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
                        <div class='song-details>
                            <div class='song-title'>${song.title}</div>
                            <div class='song-artist'>Artist: ${song.artist}</div>
                            <div class='song-genre'>Genre: ${song.genre}</div>
                        </div>
                        <button class="${isInPlaylist ? 'disabled-btn' : 'add-btn'}" 
                                data-action="add-song" 
                                ${isInPlaylist ? 'disabled' : ''}>
                            ${isInPlaylist ? 'Redan tillagd' : 'Lägg till i spellista'}
                        </button>
                    </li>
                `;
            }).join('')}
        `;
    }
}