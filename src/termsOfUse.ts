/// <reference types="@workadventure/iframe-api-typings" />

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

export {};
