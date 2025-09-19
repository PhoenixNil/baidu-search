chrome.contextMenus.create({
    id: "some-command",
    title: '使用百度搜索：%s',
    contexts: ['selection']
});
chrome.contextMenus.create({
    id: "test2",
    title: '使用必应搜索：%s',
    contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (params, tab) {
    if (params.menuItemId === "some-command") {
        chrome.tabs.create({ url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(params.selectionText) });
    } else if (params.menuItemId === "test2") {
        chrome.tabs.create({ url: 'https://cn.bing.com/search?q=' + encodeURIComponent(params.selectionText) });
    }
});