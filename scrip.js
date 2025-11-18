function waitForStable(timeout = 3000) {
    return new Promise(resolve => {
        let timer = setTimeout(() => { obs.disconnect(); resolve(); }, timeout);
        const obs = new MutationObserver(() => {
            // Mỗi lần DOM thay đổi, reset lại timer
            clearTimeout(timer);
            timer = setTimeout(() => { obs.disconnect(); resolve(); }, 600);
        });
        obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    });
}
