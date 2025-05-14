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
                <li class='playlist-item ${playlist.id === this._data.currentPlaylistId ? 'selected' : ''}' 
                    data-id='${playlist.id}' tabindex=0>
                    <h3 class='playlist-name'>${playlist.name}</h3>
                    <button class='remove-btn' data-action='remove-playlist'>Delete</button>
                </li>
            `).join('')}
        `;
    }
    
    updateCurrentPlaylist(playlistName) {
        this._currentPlaylistElement.textContent = playlistName || 'None selected';
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
            handleSelection(event);
        });

        this._parentElement.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                handleSelection(event);
                event.preventDefault();
            }
        });

        const handleSelection = (event) => {
            const li = event.target.closest('li');
            if (li && !event.target.closest('button')) {
                const playlistId = parseInt(li.dataset.id);
                
                const focusedElementIndex = Array.from(li.parentElement.children).indexOf(li);

                handler(playlistId);

                setTimeout(() => {
                    const newElements = Array.from(this._parentElement.querySelectorAll('li'));
                    if (newElements.length > focusedElementIndex) {
                        newElements[focusedElementIndex].focus();
                    }
                }, 0);
                
                event.preventDefault();
            };
        };
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