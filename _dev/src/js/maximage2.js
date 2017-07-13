/*!
 * Maximage Version: 2.0.8 (16-Jan-2012) - http://www.aaronvanderzwan.com/maximage/2.0/
 */
(function(a) {
    a.fn.maximage = function(d, e) {
        var c;
        if (typeof d == "object" || d === undefined) {
            c = a.extend(a.fn.maximage.defaults, d || {});
        }
        if (typeof d == "string") {
            c = a.fn.maximage.defaults;
        }
        a.Body = a("body");
        a.Window = a(window);
        a.Scroll = a("html, body");
        a.Events = {
            RESIZE: "resize"
        };
        this.each(function() {
            var m = a(this),
                f = 0,
                j = [];
            var i = {
                setup: function() {
                    if (a.Slides.length > 0) {
                        var r, p = a.Slides.length;
                        for (r = 0; r < p; r++) {
                            var q = a.Slides[r];
                            m.append('<div class="mc-image ' + q.theclass + '" title="' + q.alt + '" style="background-image:url(\'' + q.url + "');" + q.style + '" data-href="' + q.datahref + '">' + q.content + "</div>");
                        }
                        i.preload(0);
                        i.resize();
                    }
                },
                preload: function(q) {
                    var p = a("<img/>");
                    p.load(function() {
                        if (f == 0) {
                            g.setup();
                            c.onFirstImageLoaded();
                        }
                        if (f == (a.Slides.length - 1)) {
                            c.onImagesLoaded(m);
                        } else {
                            f++;
                            i.preload(f);
                        }
                    });
                    p[0].src = a.Slides[q].url;
                    j.push(p[0]);
                },
                resize: function() {
                    a.Window.bind(a.Events.RESIZE, function() {
                        a.Scroll.addClass("mc-hide-scrolls");
                        a.Window.data("h", k.sizes().h).data("w", k.sizes().w);
                        m.height(a.Window.data("h")).width(a.Window.data("w")).children().height(a.Window.data("h")).width(a.Window.data("w"));
                        m.children().each(function() {
                            this.cycleH = a.Window.data("h");
                            this.cycleW = a.Window.data("w");
                        });
                        a(a.Scroll).removeClass("mc-hide-scrolls");
                    });
                }
            };
            var h = {
                setup: function() {
                    var u, s, q, r, p = a.Slides.length;
                    if (a.BrowserTests.msie && !c.overrideMSIEStop) {
                        document.execCommand("Stop", false);
                    }
                    m.html("");
                    a.Body.addClass("mc-old-browser");
                    if (a.Slides.length > 0) {
                        a.Scroll.addClass("mc-hide-scrolls");
                        a.Window.data("h", k.sizes().h).data("w", k.sizes().w);
                        a("body").append(a("<div></div>").attr("class", "mc-loader").css({
                            position: "absolute",
                            left: "-9999px"
                        }));
                        for (r = 0; r < p; r++) {
                            if (a.Slides[r].content.length == 0) {
                                u = '<img src="' + a.Slides[r].url + '" />';
                            } else {
                                u = a.Slides[r].content;
                            }
                            q = a("<div>" + u + "</div>").attr("class", "mc-image mc-image-n" + r + " " + a.Slides[r].theclass);
                            m.append(q);
                            if (a(".mc-image-n" + r).children("img").length == 0) {} else {
                                a("div.mc-loader").append(a(".mc-image-n" + r).children("img").first().clone().addClass("not-loaded"));
                            }
                        }
                        h.preload();
                        h.windowResize();
                    }
                },
                preload: function() {
                    var p = setInterval(function() {
                        a(".mc-loader").children("img").each(function(r) {
                            var q = a(this);
                            if (q.hasClass("not-loaded")) {
                                if (q.height() > 0) {
                                    a(this).removeClass("not-loaded");
                                    var s = a("div.mc-image-n" + r).children("img").first();
                                    s.data("h", q.height()).data("w", q.width()).data("ar", (q.width() / q.height()));
                                    h.onceLoaded(r);
                                }
                            }
                        });
                        if (a(".not-loaded").length == 0) {
                            a(".mc-loader").remove();
                            clearInterval(p);
                        }
                    }, 1000);
                },
                onceLoaded: function(p) {
                    h.maximage(p);
                    if (p == 0) {
                        m.css({
                            visibility: "visible"
                        });
                        c.onFirstImageLoaded();
                    } else {
                        if (p == a.Slides.length - 1) {
                            g.setup();
                            a(a.Scroll).removeClass("mc-hide-scrolls");
                            c.onImagesLoaded(m);
                            if (c.debug) {
                                b(" - Final Maximage - ");
                                b(m);
                            }
                        }
                    }
                },
                maximage: function(q) {
                    a("div.mc-image-n" + q).height(a.Window.data("h")).width(a.Window.data("w")).children("img").first().each(function() {
                        n.maxcover(a(this));
                    });
                },
                windowResize: function() {
                    a.Window.bind(a.Events.RESIZE, function() {
                        clearTimeout(this.id);
                        this.id = setTimeout(h.doneResizing, 200);
                    });
                },
                doneResizing: function() {
                    a(a.Scroll).addClass("mc-hide-scrolls");
                    a.Window.data("h", k.sizes().h).data("w", k.sizes().w);
                    m.height(a.Window.data("h")).width(a.Window.data("w"));
                    m.find(".mc-image").each(function(q) {
                        h.maximage(q);
                    });
                    var p = m.data("cycle.opts");
                    if (p != undefined) {
                        p.height = a.Window.data("h");
                        p.width = a.Window.data("w");
                        jQuery.each(p.elements, function(q, r) {
                            r.cycleW = a.Window.data("w");
                            r.cycleH = a.Window.data("h");
                        });
                    }
                    a(a.Scroll).removeClass("mc-hide-scrolls");
                }
            };
            var g = {
                setup: function() {
                    var q, p;
                    m.addClass("mc-cycle");
                    a.Window.data("h", k.sizes().h).data("w", k.sizes().w);
                    jQuery.easing.easeForCSSTransition = function(v, w, u, A, z, y) {
                        return u + A;
                    };
                    var r = a.extend({
                        fit: 1,
                        containerResize: 0,
                        height: a.Window.data("h"),
                        width: a.Window.data("w"),
                        slideResize: false,
                        easing: (a.BrowserTests.cssTransitions && c.cssTransitions ? "easeForCSSTransition" : "swing")
                    }, c.cycleOptions);
                    m.cycle(r);
                }
            };
            var n = {
                center: function(p) {
                    if (c.verticalCenter) {
                        p.css({
                            marginTop: ((p.height() - a.Window.data("h")) / 2) * -1
                        });
                    }
                    if (c.horizontalCenter) {
                        p.css({
                            marginLeft: ((p.width() - a.Window.data("w")) / 2) * -1
                        });
                    }
                },
                fill: function(p) {
                    var q = p.is("object") ? p.parent().first() : p;
                    if (typeof c.backgroundSize == "function") {
                        c.backgroundSize(p);
                    } else {
                        if (c.backgroundSize == "cover") {
                            if (a.Window.data("w") / a.Window.data("h") < q.data("ar")) {
                                p.height(a.Window.data("h")).width((a.Window.data("h") * q.data("ar")).toFixed(0));
                            } else {
                                p.height((a.Window.data("w") / q.data("ar")).toFixed(0)).width(a.Window.data("w"));
                            }
                        } else {
                            if (c.backgroundSize == "contain") {
                                if (a.Window.data("w") / a.Window.data("h") < q.data("ar")) {
                                    p.height((a.Window.data("w") / q.data("ar")).toFixed(0)).width(a.Window.data("w"));
                                } else {
                                    p.height(a.Window.data("h")).width((a.Window.data("h") * q.data("ar")).toFixed(0));
                                }
                            } else {
                                b("The backgroundSize option was not recognized for older browsers.");
                            }
                        }
                    }
                },
                maxcover: function(p) {
                    n.fill(p);
                    n.center(p);
                },
                maxcontain: function(p) {
                    n.fill(p);
                    n.center(p);
                }
            };
            var k = {
                browser_tests: function() {
                    var q = a("<div />")[0],
                        u = ["Moz", "Webkit", "Khtml", "O", "ms"],
                        t = "transition",
                        s = {
                            cssTransitions: false,
                            cssBackgroundSize: ("backgroundSize" in q.style && c.cssBackgroundSize),
                            html5Video: false,
                            msie: false
                        };
                    if (c.cssTransitions) {
                        if (typeof q.style[t] == "string") {
                            s.cssTransitions = true;
                        }
                        t = t.charAt(0).toUpperCase() + t.substr(1);
                        for (var r = 0; r < u.length; r++) {
                            if (u[r] + t in q.style) {
                                s.cssTransitions = true;
                            }
                        }
                    }
                    if (!!document.createElement("video").canPlayType) {
                        s.html5Video = true;
                    }
                    s.msie = (k.msie() !== undefined);
                    if (c.debug) {
                        b(" - Browser Test - ");
                        b(s);
                    }
                    return s;
                },
                construct_slide_object: function() {
                    var r = {},
                        p = [],
                        q = "";
                    m.children().each(function(t) {
                        var s = a(this).is("img") ? a(this).clone() : a(this).find("img").first().clone();
                        r = {};
                        r.url = s.attr("src");
                        r.title = s.attr("title") != undefined ? s.attr("title") : "";
                        r.alt = s.attr("alt") != undefined ? s.attr("alt") : "";
                        r.theclass = s.attr("class") != undefined ? s.attr("class") : "";
                        r.styles = s.attr("style") != undefined ? s.attr("style") : "";
                        r.orig = s.clone();
                        r.datahref = s.attr("data-href") != undefined ? s.attr("data-href") : "";
                        r.content = "";
                        if (a(this).find("img").length > 0) {
                            if (a.BrowserTests.cssBackgroundSize) {
                                a(this).find("img").first().remove();
                            }
                            r.content = a(this).html();
                        }
                        s[0].src = "";
                        if (a.BrowserTests.cssBackgroundSize) {
                            a(this).remove();
                        }
                        p.push(r);
                    });
                    if (c.debug) {
                        b(" - Slide Object - ");
                        b(p);
                    }
                    return p;
                },
                msie: function() {
                    var r, p = 3,
                        s = document.createElement("div"),
                        q = s.getElementsByTagName("i");
                    while (s.innerHTML = "<!--[if gt IE " + (++p) + "]><i></i><![endif]-->", q[0]) {}
                    return p > 4 ? p : r;
                },
                sizes: function() {
                    var p = {
                        h: 0,
                        w: 0
                    };
                    if (c.fillElement == "window") {
                        p.h = a.Window.height();
                        p.w = a.Window.width();
                    } else {
                        var q = m.parents(c.fillElement).first();
                        if (q.height() == 0 || q.data("windowHeight") == true) {
                            q.data("windowHeight", true);
                            p.h = a.Window.height();
                        } else {
                            p.h = q.height();
                        }
                        if (q.width() == 0 || q.data("windowWidth") == true) {
                            q.data("windowWidth", true);
                            p.w = a.Window.width();
                        } else {
                            p.w = q.width();
                        }
                    }
                    return p;
                }
            };
            a.BrowserTests = k.browser_tests();
            if (typeof d == "string") {
                if (a.BrowserTests.html5Video || !m.is("video")) {
                    var l, o = m.is("object") ? m.parent().first() : m;
                    if (!a.Body.hasClass("mc-old-browser")) {
                        a.Body.addClass("mc-old-browser");
                    }
                    a.Window.data("h", k.sizes().h).data("w", k.sizes().w);
                    o.data("h", m.height()).data("w", m.width()).data("ar", m.width() / m.height());
                    a.Window.bind(a.Events.RESIZE, function() {
                        a.Window.data("h", k.sizes().h).data("w", k.sizes().w);
                        l = m.data("resizer");
                        clearTimeout(l);
                        l = setTimeout(n[d](m), 200);
                        m.data("resizer", l);
                    });
                    n[d](m);
                }
            } else {
                a.Slides = k.construct_slide_object();
                if (a.BrowserTests.cssBackgroundSize) {
                    if (c.debug) {
                        b(" - Using Modern - ");
                    }
                    i.setup();
                } else {
                    if (c.debug) {
                        b(" - Using Old - ");
                    }
                    h.setup();
                }
            }
        });

        function b(f) {
            if (window.console && window.console.log) {
                window.console.log(f);
            }
        }
    };
    a.fn.maximage.defaults = {
        debug: false,
        cssBackgroundSize: true,
        cssTransitions: true,
        verticalCenter: true,
        horizontalCenter: true,
        scaleInterval: 20,
        backgroundSize: "cover",
        fillElement: "window",
        overrideMSIEStop: false,
        onFirstImageLoaded: function() {},
        onImagesLoaded: function() {}
    };
})(jQuery);