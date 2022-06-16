/// <reference types="@workadventure/iframe-api-typings" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

WA.onInit().then(async () => {
    if (!WA.player.tags.includes("premium_guest")) {
        WA.controls.disablePlayerProximityMeeting();
    }

    if (!WA.player.state.hasValidTermsOfUse) {
        const mapUrl = WA.room.mapURL;
        const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"));
        const url = `${root}/termsOfUse.html`;
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

    WA.ui.onRemotePlayerClicked.subscribe((remotePlayer) => {
        remotePlayer.addAction("NFTs", async () => {
            const url = `https://drpy.drp-ville.com/nfts?uuid=${remotePlayer.uuid}`;
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

            iframe.url = `${url}&iframeId=${iframe.id}`;

            WA.player.onPlayerMove(() => {
                iframe.close();
            });
        });
    });
});

export {};
