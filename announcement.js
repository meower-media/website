// Better Stack announcement bar 
// Last Updated 9 December 2023 by JoshAtticus
// For use on Meower sites only

if (window.BetterUptimeAnnouncementWidget != null) {
    window.BetterUptimeAnnouncementWidget.initialize();
} else {
    window.BetterUptimeAnnouncementWidget = {
        currentScript: document.currentScript,
        cookieName: "betteruptime_announcement_bar_dismissed",
        announcementBarWrapper: null,
        announcementBar: null,
        announcementBarPlaceholder: null,
        announcementLink: null,
        announcementDigest: null,
        initialize() {
            if (this.currentScript == null || this.currentScript.dataset == null || this.currentScript.dataset.id == null) {
                return;
            }
            this.loadStylesheet(() => {
                this.loadAnnouncementBar(this.currentScript.dataset.id, (err, response) => {
                    if (response.hidden) {
                        return;
                    }
                    document.querySelectorAll(".betteruptime-announcement").forEach((node) => node.remove());
                    this.announcementBarWrapper = this.htmlToElement(response.html);
                    this.announcementBar = this.announcementBarWrapper.querySelector(".betteruptime-announcement");
                    this.announcementDigest = response.digest;
                    this.announcementLink = response.link;
                    if (this.announcementDigest === this.getCookie(this.cookieName)) {
                        return;
                    }
                    this.announcementBarPlaceholder = document.createElement("div");
                    this.announcementBarPlaceholder.classList.add("betteruptime-announcement__placeholder");
                    const firstChild = document.body.firstChild;
                    document.body.insertBefore(this.announcementBarWrapper, firstChild);
                    document.body.insertBefore(this.announcementBarPlaceholder, firstChild);
                    this.resizePlaceholder();
                    this.addEventHandlers();
                });
            });
        },
        htmlToElement(html) {
            const template = document.createElement("template");
            html = html.trim();
            template.innerHTML = html;
            return template.content.firstChild;
        },
        loadAnnouncementBar(id, callback) {
            if (!callback) {
                callback = function () {};
            }
            const url = `https://uptime.betterstack.com/widgets/announcement?id=148703`;
            this.loadAsync(url, function (responseText) {
                const json = JSON.parse(responseText);
                if (json.success) {
                    callback(null, json);
                } else {
                    console.error(`[Better Stack] Error loading Announcement Bar, used id: 148703`);
                }
            });
        },
        loadAsync(url, callback) {
            if (!callback) {
                callback = function () {};
            }
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    callback(this.responseText);
                }
            };
            xhr.open("GET", url);
            xhr.send();
        },
        loadStylesheet(callback) {
            const linkTag = document.createElement("link");
            linkTag.type = "text/css";
            linkTag.rel = "stylesheet";
            linkTag.href = "https://meower.org/announcement.css";
            this.style = document.head.appendChild(linkTag);
            callback();
        },
        addEventHandlers() {
            this.announcementBar.querySelector("[data-announcement-dismiss]").addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.dismissAnnouncementBar();
            });
            this.announcementBar.addEventListener("click", (e) => {
                e.preventDefault();
                this.openAnnouncementLink();
            });
        },
        openAnnouncementLink() {
            if (!this.announcementLink) {
                return;
            }
            window.open(this.announcementLink, "_blank");
        },
        dismissAnnouncementBar() {
            document.cookie = `${this.cookieName}=${this.announcementDigest}`;
            this.announcementBar.remove();
            this.announcementBarWrapper.remove();
            this.announcementBarPlaceholder.remove();
            this.style.remove();
        },
        resizePlaceholder() {
            this.announcementBarPlaceholder.style.height = `${this.announcementBar.offsetHeight}px`;
        },
        getCookie(cname) {
            const name = cname + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(";");
            let i = 0;
            while (i < ca.length) {
                let c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
                i++;
            }
        },
    };
    let initialized = false;
    const initializeAnnouncementBar = function () {
        if (document.readyState === "loading" || initialized) {
            return;
        }
        window.BetterUptimeAnnouncementWidget.initialize();
        initialized = true;
    };
    initializeAnnouncementBar();
    document.onreadystatechange = initializeAnnouncementBar;
    document.addEventListener("turbo:load", () => {
        initialized = false;
        initializeAnnouncementBar();
    });
}
