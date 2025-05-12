import View from './View.js';

export default class PlaylistsView extends View {
    constructor() {
        super(document.getElementById('playlists'));
        this._currentPlaylistElement = document.getElementById('current-playlist');
        this._playlistNameInput = document.getElementById('playlist-name');
        this._createPlaylistButton = document.getElementById('create-playlist');
    }
    
    _generateHtml() {
        return `
            ${this._data.playlists.map(playlist => `
                <li class="playlist-item ${playlist.id === this._data.currentPlaylistId ? 'selected' : ''}" 
                    data-id="${playlist.id}">
                    <span>${playlist.name}</span>
                    <button class="remove-btn" data-action="remove-playlist">Remove</button>
                </li>
            `).join('')}
        `;
    }
    
    updateCurrentPlaylist(playlistName) {
        this._currentPlaylistElement.textContent = playlistName || 'Ingen vald';
    }
    
    clearPlaylistNameInput() {
        this._playlistNameInput.value = '';
    }
    
    bindCreatePlaylist(handler) {
        this._createPlaylistButton.addEventListener('click', () => {
            const name = this._playlistNameInput.value.trim();
            if (name) {
                handler(name);
            }
        });
    }
    
    bindSelectPlaylist(handler) {
        this._parentElement.addEventListener('click', event => {
            const li = event.target.closest('li');
            if (li && !event.target.closest('button')) {
                const playlistId = parseInt(li.dataset.id);
                handler(playlistId);
            }
        });
    }
    
    bindDeletePlaylist(handler) {
        this._parentElement.addEventListener('click', event => {
            const button = event.target.closest('button[data-action="remove-playlist"]');
            if (button) {
                const li = button.closest('li');
                const playlistId = parseInt(li.dataset.id);
                handler(playlistId);
            }
        });
    }
}