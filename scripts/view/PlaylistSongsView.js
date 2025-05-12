import View from './View.js';

export default class PlaylistSongsView extends View {
    constructor() {
        super(document.getElementById('playlist-songs'));
    }
    
    _generateHtml() {
        if (this._data.length === 0) {
            return `<li>Inga låtar i denna spellista</li>`;
        }
        
        return `
            ${this._data.map(song => `
                <li data-id="${song.id}">
                    <div class="song-details">
                        <h3 class="song-title">${song.title}</h3>
                        <div class="song-artist">Artist: ${song.artist}</div>
                        <div class="song-genre">Genre: ${song.genre}</div>
                    </div>
                    <button class="remove-btn" data-action="remove-song">Remove</button>
                </li>
            `).join('')}
        `;
    }
    
    bindRemoveSongFromPlaylist(handler) {
        this._parentElement.addEventListener('click', event => {
            const button = event.target.closest('button[data-action="remove-song"]');
            if (button) {
                const li = button.closest('li');
                const songId = parseInt(li.dataset.id);
                handler(songId);
            }
        });
    }
}