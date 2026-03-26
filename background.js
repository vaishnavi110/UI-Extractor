chrome.runtime.onMessage.addListener((message) => {

  if (message.type === "DOWNLOAD_FILE") {

    chrome.downloads.download({
      url: message.url,   // directly use data URL
      filename: message.filename,
      saveAs: true
    });

  }

});