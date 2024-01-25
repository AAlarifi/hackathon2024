const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkModeEnabled = body.classList.contains('dark-mode');

    return isDarkModeEnabled;
};

const toggleColourBlindMode = () => {
    const body = document.body;
    body.classList.toggle('color-blind-mode');
    const isColorBlindModeEnabled = body.classList.contains('color-blind-mode');

    return isColorBlindModeEnabled;
};

export default {
    toggleColourBlindMode: toggleColourBlindMode,
    toggleDarkMode: toggleDarkMode
};