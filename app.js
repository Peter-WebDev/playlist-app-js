import musicController from './scripts/controllers/musicController';

const initApp = () => {
    musicController.init();
};

document.addEventListener('DOMContentLoaded', initApp);