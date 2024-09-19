const CACHE_NAME = 'pwa-cache-v1';
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icon.png',  // Certifique-se de ter um ícone nesse caminho
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache inicializado');
                return cache.addAll(CACHE_ASSETS);
            })
            .catch((error) => {
                console.error('Erro ao adicionar arquivos ao cache: ', error);
            })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
