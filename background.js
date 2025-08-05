// Cross browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.runtime.onInstalled.addListener(() => {}
    if (typeof browser !== 'undefined') {
        // Firefox
        browserAPI.storage.sync.get(["groqApiKey"]).then((result) => {
            if (!result.groqApiKey) {
                browserAPI.tabs.create({
                    url: "options.html"
                });
            }
        });
    }
