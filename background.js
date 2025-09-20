const MENU_IDS = {
    baidu: 'search-baidu',
    bing: 'search-bing'
};

chrome.contextMenus.create({
    id: MENU_IDS.baidu,
    title: '使用百度搜索 "%s"',
    contexts: ['selection']
});

chrome.contextMenus.create({
    id: MENU_IDS.bing,
    title: '使用必应搜索 "%s"',
    contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (!info.selectionText) {
        return;
    }

    const query = encodeURIComponent(info.selectionText);
    let targetUrl = '';

    if (info.menuItemId === MENU_IDS.baidu) {
        targetUrl = `https://www.baidu.com/s?ie=utf-8&wd=${query}`;
    } else if (info.menuItemId === MENU_IDS.bing) {
        targetUrl = `https://bing.com/search?q=${query}`;
    } else {
        return;
    }

    chrome.tabs.create({ url: targetUrl }, () => {
        if (chrome.runtime.lastError) {
            console.error('Failed to open search page:', chrome.runtime.lastError);
        }
    });
});
