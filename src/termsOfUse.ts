/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

WA.onInit().then(() => {
    document.querySelector("#accept")?.addEventListener("click", async (event) => {
        const iframeId = location.search.split('iframeId=')[1];

        if (iframeId) {
            const iframes = await WA.ui.website.getAll();
            const iframe = iframes.find((iframe) => iframe.id === iframeId);

            if (!iframe) {
                console.log("unknown iframe");
                return;
            }

            WA.player.state.hasValidTermsOfUse = true;
            WA.controls.restorePlayerControls();

            iframe.close();
            event.preventDefault();
        }
    });
});
