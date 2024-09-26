document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("OVERLAY_WS")) {
        // We don't want the value url-encoded because the library doesn't parse
        // query parameters properly (sigh), so we set a placeholder then
        // replace it with the raw string.
        url.searchParams.set("OVERLAY_WS", "WSplaceholderWS");
        document.location.href = url.href.replace("WSplaceholderWS", "ws://127.0.0.1:10501/ws");
        return;
    }

    addOverlayListener('ChangeZone', async (data) => {
        console.log(`Change zone`, data);

        document.getElementById('location').innerText = data.zoneName;
        document.getElementById('locationId').innerText = `#${data.zoneID}`;

        const res = await fetch(`guides/${data.zoneID}.html`)
        if (res.ok) {
            document.getElementById('content').innerHTML = await res.text();
        } else {
            document.getElementById('content').innerHTML = "No guide for here yet :(";
        }
    });

    startOverlayEvents()
});
