// Función para ejecutar un script en la página web cargada en la pestaña activa
function executeScriptInActiveTab(script) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs && tabs.length > 0) {
            var activeTab = tabs[0];
            chrome.tabs.executeScript(activeTab.id, {code: script});
        }
    });
}

// Listener para el evento de actualización de la pestaña
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.startsWith("https://www.y2mate.com/es/youtube-mp3/")) {
        // Llamar a la función executeScriptInActiveTab y pasar el script a ejecutar
        executeScriptInActiveTab(`
            // Obtener el elemento del selector por su ID en la página web
            var videoFormatSelect = document.getElementById("videoFormatSelect");

            // Verificar si el elemento existe y no es null
            if (videoFormatSelect) {

                // Recorrer las opciones del selector
                for (var i = 0; i < videoFormatSelect.options.length; i++) {
                    var option = videoFormatSelect.options[i];

                    // Comprobar si el valor de la opción es igual a 320kbps
                    if (option.innerText === "MP3 - 320kbps ") {
                        // Establecer la opción como seleccionada
                        option.selected = true;

                        // Obtener el elemento del botón por su ID
                        var processMp3Button = document.getElementById("process_mp3");

                        // Verificar si el elemento del botón existe y no es null
                        if (processMp3Button) {
                            // Ejecutar el clic en el botón
                            processMp3Button.click();
                        }

                        break; // Salir del bucle
                    }
                }
            }
        `);
    }
});
