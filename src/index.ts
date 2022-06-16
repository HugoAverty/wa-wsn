/// <reference types="@workadventure/iframe-api-typings" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

WA.onInit().then(async () => {
    if (!WA.player.tags.includes("premium_guest")) {
        WA.controls.disablePlayerProximityMeeting();
    }

    if (!WA.player.state.hasValidTermsOfUse) {
        const url = "http://localhost:8080/termsOfUse.html";
        const iframe = await WA.ui.website.open({
            url,
            position: {
                vertical: "middle",
                horizontal: "middle"
            },
            size: {
                height: "70vh",
                width: "60vw"
            },
            allowApi: true,
        });

        iframe.url = `${url}?iframeId=${iframe.id}`;

        WA.controls.disablePlayerControls();
    }
});

export {};
