// Referencias
const toggleButton = document.getElementById('toggle-theme');
const searchButton = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const lyricsContainer = document.getElementById('lyrics-container');
const songTitle = document.getElementById('song-title');
const copyButton = document.getElementById('copy-btn');
const homeLink = document.getElementById('home-link');

// Cambiar entre modo claro y oscuro
toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    localStorage.setItem('theme', newTheme);
});

// Aplicar tema guardado
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
toggleButton.textContent = savedTheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';

// Buscar letras
searchButton.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (!query) {
        songTitle.textContent = 'Por favor, ingresa un título válido.';
        lyricsContainer.textContent = '';
        copyButton.style.display = 'none'; 
        return;
    }

    const [artist, song] = query.split('-').map(item => item.trim());

    if (!artist || !song) {
        songTitle.textContent = 'Formato incorrecto. Usa "Artista - Canción".';
        lyricsContainer.textContent = '';
        copyButton.style.display = 'none';
        return;
    }

    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(response => response.json())
        .then(data => {
            if (data.lyrics) {
                songTitle.textContent = `${song} - ${artist}`;
                lyricsContainer.textContent = data.lyrics;
                copyButton.style.display = 'inline-block'; 
            } else {
                songTitle.textContent = 'Letra no encontrada.';
                lyricsContainer.textContent = '';
                copyButton.style.display = 'none'; 
            }
        })
        .catch(() => {
            songTitle.textContent = 'Error al buscar la letra.';
            lyricsContainer.textContent = '';
            copyButton.style.display = 'none'; 
        });
});

// Copiar letra
copyButton.addEventListener('click', () => {
    const lyrics = lyricsContainer.textContent;
    if (lyrics) {
        navigator.clipboard.writeText(lyrics).then(() => {
            alert('Letra copiada al portapapeles');
        });
    } else {
        alert('No hay letra para copiar.');
    }
});

// Restablecer página
homeLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    searchBar.value = ''; 
    songTitle.textContent = ''; 
    lyricsContainer.textContent = ''; 
    copyButton.style.display = 'none'; 
});

// pantalla de carga
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000); 
});
