document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('downloadMP4Btn').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            var url = tab.url;
            var videoId = getVideoIdFromUrl(url);
            if (videoId) {
                // Redirigir a la página de conversión de YouTube a MP3 con el ID del video
                var downloadURL = 'https://www.y2mate.com/en481/download-youtube/' + videoId;
                window.open(downloadURL);
            }
        });
    });

    document.getElementById('downloadMP3Btn').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            var url = tab.url;
            var videoId = getVideoIdFromUrl(url);
            if (videoId) {
                // Redirigir a la página de conversión de YouTube a MP3 con el ID del video
                var downloadURL = 'https://www.y2mate.com/es/youtube-mp3/' + videoId;
                window.open(downloadURL);
            }
        });
    });

    function getVideoIdFromUrl(url) {
        // Verificar si la URL es válida
        const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;
        const match = url.match(urlRegex);
        if (match && match[1]) {
            return match[1];
        }
        return undefined;
    }
});
