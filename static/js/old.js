function switchTab(tabID) {
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.style.display = 'none';
    });
    
    let tab = this.tabsJSON.find(tab => tab.id === tabID);
    if (tab) {
        let iframe = document.querySelector(`.${tab.iframe}-iframe`);
        if (iframe) {
            iframe.style.display = "block";
            if (!iframe.src || iframe.src === "") {
                if (selected_choice === "uv") {
                    iframe.src = __uv$config.prefix + __uv$config.encodeUrl(tab.url);
                }
                if (selected_choice === "scramjet") {
                    iframe.src = __scramjet$config.prefix + __scramjet$config.codec.encode(tab.url);
                }
            }

            this.ctix = tabID;
            localStorage.setItem("ctix", this.ctix);
            console.log("Switched to tab:", tab);
        } else {
            console.error("Iframe not found for tab:", tabID);
        }
    }
}