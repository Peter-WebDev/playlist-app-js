import View from "./View";

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
                    <button class="remove-btn" data-action="remove-playlist">Ta bort</button>
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
}