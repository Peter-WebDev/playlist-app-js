import musicController from './scripts/controllers/musicController.js';

const initApp = () => {
    musicController.init();
};

document.addEventListener('DOMContentLoaded', initApp);