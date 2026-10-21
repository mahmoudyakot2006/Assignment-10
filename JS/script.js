(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
        n(e);
    new MutationObserver(e => {
        for (const r of e)
            if (r.type === "childList")
                for (const o of r.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && n(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function c(e) {
        const r = {};
        return e.integrity && (r.integrity = e.integrity),
            e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
            e.crossOrigin === "use-credentials" ? r.credentials = "include" : e.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
            r
    }
    function n(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const r = c(e);
        fetch(e.href, r)
    }
}
)();
function b(s, t) {
    let c;
    return function (...e) {
        const r = () => {
            clearTimeout(c),
                s.apply(this, e)
        }
            ;
        clearTimeout(c),
            c = setTimeout(r, t)
    }
}
function L() {
    document.querySelector("#header");
    const s = document.querySelector(".nav-links");
    if (!s)
        return;
    const t = document.createElement("button");
    t.className = "mobile-menu-btn lg:hidden text-slate-900 dark:text-white text-2xl focus:outline-none",
        t.setAttribute("aria-label", "فتح القائمة"),
        t.innerHTML = '<i class="fa-solid fa-bars"></i>',
        document.querySelector("#header .container").appendChild(t),
        t.addEventListener("click", function () {
            s.classList.toggle("active");
            const e = t.querySelector("i");
            s.classList.contains("active") ? (e.className = "fa-solid fa-times",
                t.setAttribute("aria-label", "إغلاق القائمة")) : (e.className = "fa-solid fa-bars",
                    t.setAttribute("aria-label", "فتح القائمة"))
        }),
        s.querySelectorAll("a").forEach(e => {
            e.addEventListener("click", function () {
                s.classList.remove("active"),
                    t.querySelector("i").className = "fa-solid fa-bars",
                    t.setAttribute("aria-label", "فتح القائمة")
            })
        }
        )
}
function E() {
    const s = document.querySelectorAll("section[id]")
        , t = document.querySelectorAll('.nav-links a[href^="#"]');
    function c() {
        let n = "";
        s.forEach(e => {
            const r = e.offsetTop;
            window.scrollY >= r - 100 && (n = e.getAttribute("id"))
        }
        ),
            t.forEach(e => {
                e.classList.remove("active"),
                    e.getAttribute("href") === `#${n}` && e.classList.add("active")
            }
            )
    }
    window.addEventListener("scroll", b(c, 50)),
        c()
}
function S() {
    const s = document.getElementById("settings-sidebar")
        , t = document.getElementById("settings-toggle")
        , c = document.getElementById("close-settings")
        , n = document.getElementById("reset-settings")
        , e = document.querySelectorAll(".font-option")
        , r = document.getElementById("theme-colors-grid");
    if (!s || !t)
        return;
    const o = [{
        name: "Purple Blue",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#a855f7"
    }, {
        name: "Pink Orange",
        primary: "#ec4899",
        secondary: "#f97316",
        accent: "#fb923c"
    }, {
        name: "Green Emerald",
        primary: "#10b981",
        secondary: "#059669",
        accent: "#34d399"
    }, {
        name: "Blue Cyan",
        primary: "#3b82f6",
        secondary: "#06b6d4",
        accent: "#22d3ee"
    }, {
        name: "Red Rose",
        primary: "#ef4444",
        secondary: "#f43f5e",
        accent: "#fb7185"
    }, {
        name: "Amber Orange",
        primary: "#f59e0b",
        secondary: "#ea580c",
        accent: "#fbbf24"
    }];
    function i() {
        s.classList.remove("translate-x-full"),
            t.style.right = "20rem"
    }
    function u() {
        s.classList.add("translate-x-full"),
            t.style.right = "0"
    }
    t.addEventListener("click", i),
        c.addEventListener("click", u),
        document.addEventListener("click", a => {
            !s.contains(a.target) && !t.contains(a.target) && !s.classList.contains("translate-x-full") && u()
        }
        ),
        e.forEach(a => {
            a.addEventListener("click", () => {
                const l = a.getAttribute("data-font");
                d(l)
            }
            )
        }
        );
    function d(a) {
        document.body.classList.remove("font-alexandria", "font-tajawal", "font-cairo"),
            document.body.classList.add(`font-${a}`),
            e.forEach(l => {
                l.getAttribute("data-font") === a ? (l.classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800"),
                    l.classList.remove("border-slate-200", "dark:border-slate-700")) : (l.classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800"),
                        l.classList.add("border-slate-200", "dark:border-slate-700"))
            }
            ),
            localStorage.setItem("selectedFont", a)
    }
    r && (r.innerHTML = "",
        o.forEach(a => {
            const l = document.createElement("button");
            l.className = "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm",
                l.style.background = `linear-gradient(135deg, ${a.primary}, ${a.secondary})`,
                l.setAttribute("title", a.name),
                l.setAttribute("data-primary", a.primary),
                l.setAttribute("data-secondary", a.secondary),
                l.addEventListener("click", () => {
                    h(a.primary, a.secondary, a.accent),
                        r.querySelectorAll("button").forEach(m => {
                            m.classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
                        }
                        ),
                        l.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900"),
                        localStorage.setItem("selectedTheme", JSON.stringify({
                            primary: a.primary,
                            secondary: a.secondary,
                            accent: a.accent
                        }))
                }
                ),
                r.appendChild(l)
        }
        )),
        n && n.addEventListener("click", () => {
            localStorage.removeItem("selectedTheme"),
                localStorage.removeItem("selectedFont"),
                d("tajawal");
            const a = o[0];
            h(a.primary, a.secondary, a.accent);
            const l = r.querySelector("button");
            l && l.click(),
                u()
        }
        );
    function f() {
        const a = localStorage.getItem("selectedFont");
        d(a || "tajawal")
    }
    f()
}
function h(s, t, c) {
    document.documentElement.style.setProperty("--color-primary", s),
        document.documentElement.style.setProperty("--color-secondary", t),
        document.documentElement.style.setProperty("--color-accent", c),
        document.querySelectorAll('[class*="from-primary"], [class*="to-secondary"], [class*="from-secondary"]').forEach(e => {
            e.offsetHeight
        }
        ),
        x(s, t)
}
function x(s, t) {
    document.querySelectorAll('[style*="linear-gradient"]').forEach(n => {
        const e = n.style.background;
        if (e.includes("linear-gradient")) {
            const r = /linear-gradient\([^)]+\)/
                , o = `linear-gradient(135deg, ${s}, ${t})`;
            n.style.background = e.replace(r, o)
        }
    }
    )
}
function k() {
    const s = localStorage.getItem("selectedTheme");
    if (s)
        try {
            const t = JSON.parse(s)
                , c = t.primary || t.from
                , n = t.secondary || t.to
                , e = t.accent || t.primary || t.from;
            h(c, n, e),
                setTimeout(() => {
                    const r = document.querySelectorAll("#theme-colors-grid button");
                    r.forEach(o => {
                        o.getAttribute("data-primary") === c && o.getAttribute("data-secondary") === n && (r.forEach(i => i.classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")),
                            o.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900"))
                    }
                    )
                }
                    , 100)
        } catch (t) {
            console.error("Error loading saved theme:", t)
        }
}
document.addEventListener("DOMContentLoaded", function () {
    L(),
        E(),
        S(),
        w(),
        A(),
        q(),
        T(),
        I(),
        B(),
        k(),
        console.log("All features initialized successfully!")
});
function w() {
    const s = document.getElementById("theme-toggle-button")
        , t = document.documentElement;
    if (!s)
        return;
    (localStorage.getItem("theme") || "dark") === "dark" ? t.classList.add("dark") : t.classList.remove("dark"),
        s.addEventListener("click", function () {
            const n = t.classList.toggle("dark");
            localStorage.setItem("theme", n ? "dark" : "light")
        })
}
function A() {
    const s = document.querySelectorAll(".portfolio-filter")
        , t = document.querySelectorAll(".portfolio-item");
    document.getElementById("portfolio-grid"),
        !(s.length === 0 || t.length === 0) && (s.forEach(c => {
            c.addEventListener("click", function () {
                const n = this.getAttribute("data-filter");
                s.forEach(e => {
                    e.classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50"),
                        e.classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700")
                }
                ),
                    this.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700"),
                    this.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50"),
                    t.forEach(e => {
                        e.style.opacity = "0",
                            e.style.transform = "scale(0.8)"
                    }
                    ),
                    setTimeout(() => {
                        t.forEach(e => {
                            const r = e.getAttribute("data-category");
                            n === "all" || r === n ? e.style.display = "block" : e.style.display = "none"
                        }
                        ),
                            setTimeout(() => {
                                t.forEach(e => {
                                    const r = e.getAttribute("data-category");
                                    (n === "all" || r === n) && (e.style.opacity = "1",
                                        e.style.transform = "scale(1)")
                                }
                                )
                            }
                                , 50)
                    }
                        , 300)
            })
        }
        ),
            t.forEach(c => {
                c.style.transition = "opacity 0.3s ease, transform 0.3s ease"
            }
            ))
}
function q() {
    const s = document.getElementById("testimonials-carousel")
        , t = document.getElementById("prev-testimonial")
        , c = document.getElementById("next-testimonial")
        , n = document.querySelectorAll(".carousel-indicator")
        , e = document.querySelectorAll(".testimonial-card");
    if (!s || !t || !c || e.length === 0)
        return;
    let r = 0;
    const o = e.length;
    function i() {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
    }
    let u = i()
        , d = o - u;
    function f() {
        u = i(),
            d = o - u,
            r > d && (r = d),
            r < 0 && (r = 0);
        const g = 100 / u
            , p = r * g;
        s.style.transform = `translateX(${p}%)`,
            n.forEach((y, v) => {
                v === r ? (y.classList.add("active", "bg-accent", "scale-125"),
                    y.classList.remove("bg-slate-400", "dark:bg-slate-600")) : (y.classList.remove("active", "bg-accent", "scale-125"),
                        y.classList.add("bg-slate-400", "dark:bg-slate-600"))
            }
            )
    }
    function a() {
        r < d ? r++ : r = 0,
            f()
    }
    function l() {
        r > 0 ? r-- : r = d,
            f()
    }
    function m(g) {
        g >= 0 && g <= d && (r = g,
            f())
    }
    c.addEventListener("click", () => {
        a()
    }
    ),
        t.addEventListener("click", () => {
            l()
        }
        ),
        n.forEach((g, p) => {
            g.addEventListener("click", () => {
                m(p)
            }
            )
        }
        ),
        window.addEventListener("resize", b(() => {
            f()
        }
            , 150)),
        f()
}
function T() {
    const s = document.getElementById("scroll-to-top");
    s && (window.addEventListener("scroll", b(() => {
        window.scrollY > 300 ? (s.classList.remove("opacity-0", "invisible"),
            s.classList.add("opacity-100", "visible")) : (s.classList.remove("opacity-100", "visible"),
                s.classList.add("opacity-0", "invisible"))
    }
        , 100)),
        s.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        ))
}
function I() {
    document.querySelectorAll(".custom-select").forEach(t => {
        const c = t.querySelector(".selected-text")
            , n = t.querySelector(".fa-chevron-down")
            , e = t.nextElementSibling
            , r = e.querySelectorAll(".custom-option");
        t.addEventListener("click", o => {
            o.stopPropagation(),
                document.querySelectorAll(".custom-options").forEach(i => {
                    i !== e && (i.classList.add("hidden"),
                        i.previousElementSibling.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)")
                }
                ),
                e.classList.toggle("hidden"),
                e.classList.contains("hidden") ? n.style.transform = "rotate(0deg)" : n.style.transform = "rotate(180deg)"
        }
        ),
            r.forEach(o => {
                o.addEventListener("click", i => {
                    i.stopPropagation();
                    const u = o.getAttribute("data-value");
                    c.textContent = u,
                        c.classList.remove("text-slate-400", "text-slate-500", "dark:text-slate-400"),
                        c.classList.add("text-slate-800", "dark:text-white"),
                        r.forEach(d => d.classList.remove("bg-primary/10")),
                        o.classList.add("bg-primary/10"),
                        e.classList.add("hidden"),
                        n.style.transform = "rotate(0deg)"
                }
                )
            }
            )
    }
    ),
        document.addEventListener("click", () => {
            document.querySelectorAll(".custom-options").forEach(t => {
                t.classList.add("hidden"),
                    t.previousElementSibling.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)"
            }
            )
        }
        )
}
function B() {
    const s = document.querySelector("#contact form");
    if (!s)
        return;
    const t = s.querySelectorAll("input, textarea")
        , c = ["name", "email", "phone", "message"];
    t.forEach((r, o) => {
        if (c[o]) {
            r.id = `contact-${c[o]}`;
            const i = r.previousElementSibling;
            i && i.tagName === "LABEL" && i.setAttribute("for", r.id)
        }
    }
    ),
        s.addEventListener("submit", function (r) {
            r.preventDefault();
            let o = !0;
            s.querySelectorAll(".error-message").forEach(m => m.remove()),
                s.querySelectorAll(".border-red-500").forEach(m => {
                    m.classList.remove("border-red-500")
                }
                );
            const i = s.querySelector('input[type="text"]')
                , u = s.querySelector('input[type="email"]')
                , d = s.querySelector('input[type="tel"]')
                , f = s.querySelector("textarea")
                , a = s.querySelector('.custom-select[data-name="project-type"] .selected-text');
            i.value.trim() || (n(i, "يرجى إدخال الاسم الكامل"),
                o = !1);
            const l = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (u.value.trim() ? l.test(u.value) || (n(u, "يرجى إدخال بريد إلكتروني صحيح"),
                o = !1) : (n(u, "يرجى إدخال البريد الإلكتروني"),
                    o = !1),
                d.value.trim() && (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(d.value.replace(/\s/g, "")) || (n(d, "يرجى إدخال رقم هاتف صحيح"),
                    o = !1)),
                a.classList.contains("text-slate-400")) {
                const m = a.closest(".custom-select-wrapper");
                m.querySelector(".custom-select").classList.add("border-red-500"),
                    n(m, "يرجى اختيار نوع المشروع"),
                    o = !1
            }
            f.value.trim() ? f.value.trim().length < 10 && (n(f, "يرجى إدخال المزيد من التفاصيل"),
                o = !1) : (n(f, "يرجى إدخال تفاصيل المشروع"),
                    o = !1),
                o && (e(),
                    s.reset(),
                    s.querySelectorAll(".selected-text").forEach(m => {
                        m.classList.add("text-slate-500", "dark:text-slate-400"),
                            m.classList.remove("text-slate-800", "dark:text-white")
                    }
                    ),
                    s.querySelector('.custom-select[data-name="project-type"] .selected-text').textContent = "اختر نوع المشروع",
                    s.querySelector('.custom-select[data-name="budget"] .selected-text').textContent = "اختر الميزانية")
        });
    function n(r, o) {
        const i = document.createElement("p");
        i.className = "error-message text-red-400 text-sm mt-1",
            i.textContent = o,
            r.classList.contains("custom-select-wrapper") ? r.appendChild(i) : (r.classList.add("border-red-500"),
                r.parentElement.appendChild(i))
    }
    function e(r) {
        const o = document.createElement("div");
        o.className = "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm",
            o.innerHTML = `
      <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl transform animate-fade-in">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-check text-4xl text-white"></i>
        </div>
        <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
          حسناً
        </button>
      </div>
    `,
            document.body.appendChild(o),
            o.querySelector(".success-popup-close").addEventListener("click", () => {
                o.remove()
            }
            ),
            setTimeout(() => {
                o.parentNode && o.remove()
            }
                , 5e3)
    }
    t.forEach(r => {
        r.addEventListener("input", function () {
            this.classList.remove("border-red-500");
            const o = this.parentElement.querySelector(".error-message");
            o && o.remove()
        })
    }
    )
}
