class View {
    _parentElement = undefined
    _data;

    constructor(parentElement) {
        this._parentElement = parentElement
    }

    render(data) {
        this._data = data;
    }

    _clearHtml() {
        this._parentElement.innerHTML = '';
    }
}