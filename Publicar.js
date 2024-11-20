// Esperamos a que la página esté completamente cargada
window.onload = function() {
    const loadingScreen = document.getElementById('loading-screen');

    // Ocultamos la pantalla de carga 
    setTimeout(() => {
        loadingScreen.classList.add('hidden'); 
    }, 2000); 
};

// Cambio de tema oscuro/claro
const toggleButton = document.getElementById('toggle-theme');

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    localStorage.setItem('theme', newTheme);
});

// Cargar tema guardado en el localStorage
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        toggleButton.textContent = savedTheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    }
});


