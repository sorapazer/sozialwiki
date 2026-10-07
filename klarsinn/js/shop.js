/* Klarsinn – Preise, Kauf, Gutscheine, Freischaltung */
(function () {
  const KS = window.KS, esc = KS.esc;

  /* ============ KONFIGURATION ============
     paymentLinks: Hier die Bezahl-Links eures Zahlungsanbieters eintragen
     (z. B. Stripe Payment Link, Digistore24, CopeCart, PayPal).
     Solange ein Link leer ist, zeigt die Seite einen Hinweis statt einer Zahlung. */
  KS.SHOP = {
    currency: "€",
    prices: {
      w12: { total: 1000, months: 1, label: "einmalig" },
      m6: { total: 900, months: 6, monthly: 150, label: "6 × 150 € monatlich" },
      m12: { total: 840, months: 12, monthly: 70, label: "12 × 70 € monatlich" }
    },
    paymentLinks: { w12: "", m6: "", m12: "" },
    /* Gutscheine werden nur als Prüfsumme gespeichert. */
    /* issuer: Name und Rolle für die Unterschriftszeile des Zertifikats (leer = nur „Programmleitung“) */
    issuer: { name: "", role: "Programmleitung" },
    vouchers: { vrnyxh: { name: "Freischaltung per Gutschein", free: true } }
  };

  const hash = (s) => { let x = 0x811c9dc5; for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 0x01000193) >>> 0; } return x.toString(36); };
  KS.checkVoucher = (code) => KS.SHOP.vouchers[hash("KLARSINN:" + String(code || "").trim().toUpperCase())] || null;
  KS.licensed = () => !!KS.obj("profile").license;
  KS.eur = (n) => n.toLocaleString("de-DE") + " €";
  KS.perWeek = (v) => Math.round(KS.SHOP.prices[v].total / KS.VARIANTS[v].weeks);

  KS.FEATURES = {
    w12: ["12 Themen in 12 Wochen", "24 Lektionen mit Theorie und Praxis", "24 interaktive Grafiken und Lernspiele", "22 Werkzeuge, WHO-5-Messung, Verlauf"],
    m6: ["12 Themen in 26 Wochen", "60 Lektionen inklusive Masterclass-Theorie", "Übungswochen mit eigenen Aufgaben", "Rückblick- und Abschlusswoche"],
    m12: ["12 Themen in 52 Wochen, ein Thema pro Monat", "60 Lektionen, 36 Masterclasses", "Lernen, Üben, Vertiefen, Verankern", "4 Integrationswochen, Begleitung über ein Jahr"]
  };

  /* Preiskarten */
  KS.priceCards = function (sel, compact) {
    const best = "m12";
    return '<div class="prices' + (compact ? " compact" : "") + '" role="radiogroup" aria-label="Programm wählen">' + Object.entries(KS.VARIANTS).map(([k, v]) => {
      const p = KS.SHOP.prices[k];
      return '<button type="button" role="radio" aria-checked="' + (k === sel) + '" class="price' + (k === sel ? " on" : "") + '" data-buy="' + k + '">' + (k === best ? '<span class="price-badge">Bester Preis pro Woche</span>' : k === "w12" ? '<span class="price-badge alt">Intensiv</span>' : '<span class="price-badge mid">Beliebt</span>') +
        '<span class="vtag">' + v.tag + "</span><b class=\"price-name\">" + v.name + '</b><span class="price-amt num">' + (p.monthly ? KS.eur(p.monthly) + "<small>/Monat</small>" : KS.eur(p.total)) + '</span><span class="price-sub">' + (p.monthly ? "gesamt " + KS.eur(p.total) + " · " : "einmalig · ") + "≈ " + KS.perWeek(k) + " € pro Woche</span>" +
        '<span class="price-bar"><i style="width:' + (KS.perWeek(k) / KS.perWeek("w12") * 100) + '%"></i></span>' +
        (compact ? "" : '<ul class="price-feat">' + KS.FEATURES[k].map((f) => "<li>" + esc(f) + "</li>").join("") + "</ul>") + "</button>";
    }).join("") + "</div>";
  };

  /* Kauf- und Startseite */
  KS.viewCheckout = function (pre) {
    const p = KS.obj("profile"); const sel = pre || p.variant || "m6";
    if (KS.licensed()) return '<div class="panel stack"><h2>Dein Zugang ist aktiv</h2><p class="muted">' + esc(p.license.name || "Freigeschaltet") + " · " + KS.VARIANTS[p.variant || "w12"].name + '</p><a class="btn chunky" href="#start">Zur Übersicht</a></div>';
    return '<section class="checkout fade-in"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Preise &amp; Start</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Wähle deinen Weg</h2></div><span class="muted">Je länger das Programm, desto günstiger jede Woche.</span></div>' +
      KS.priceCards(sel) +
      '<form class="panel stack checkout-form" id="buyForm" style="margin-top:18px"><div class="grid2"><div class="field"><label for="by-name">Wie dürfen wir dich nennen? <span class="faint">(optional)</span></label><input type="text" id="by-name" autocomplete="given-name" value="' + esc(p.name || "") + '"></div><div class="field"><label for="by-date">Startdatum</label><input type="date" id="by-date" value="' + esc(p.start || KS.today()) + '"></div></div>' +
      '<div class="field"><label for="by-code">Gutscheincode</label><div class="row" style="flex-wrap:nowrap"><input type="text" id="by-code" autocomplete="off" autocapitalize="characters" placeholder="Code eingeben" style="text-transform:uppercase"><span class="chip" data-codest>–</span></div></div>' +
      '<label class="row" style="gap:8px;font-size:.88rem;align-items:flex-start;flex-wrap:nowrap"><input type="checkbox" id="by-ok" style="margin-top:4px"> <span>Ich habe verstanden, dass Klarsinn ein Selbsthilfeprogramm ist und keine Diagnose oder Psychotherapie ersetzt. In einer Krise nutze ich die <a href="#hilfe">Notfallnummern</a>.</span></label>' +
      '<div class="row checkout-sum"><div><span class="faint" style="font-size:.85rem">Gewählt: <b data-sumname></b></span><div class="price-total num" data-sum></div></div><button class="btn chunky big" type="submit" data-cta>Weiter</button></div><div data-msg></div></form>' +
      '<p class="faint" style="font-size:.8rem;margin-top:10px">Alle Preise in Euro inklusive gesetzlicher Mehrwertsteuer. Deine Eingaben im Programm bleiben ausschließlich in deinem Browser gespeichert.</p></section>';
  };
  KS.bindCheckout = function () {
    const f = document.getElementById("buyForm"); if (!f) return;
    let sel = (document.querySelector(".price.on") || {}).dataset ? document.querySelector(".price.on").dataset.buy : "m6";
    const code = f.querySelector("#by-code");
    const upd = () => {
      const v = KS.checkVoucher(code.value), pr = KS.SHOP.prices[sel];
      const st = f.querySelector("[data-codest]");
      st.textContent = !code.value.trim() ? "–" : v ? "Gültig" : "Unbekannt"; st.className = "chip " + (!code.value.trim() ? "" : v ? "ok" : "glow");
      f.querySelector("[data-sumname]").textContent = KS.VARIANTS[sel].name + " · " + KS.VARIANTS[sel].tag;
      f.querySelector("[data-sum]").innerHTML = v && v.free ? '<s class="faint">' + KS.eur(pr.total) + "</s> 0 €" : pr.monthly ? KS.eur(pr.monthly) + '<small> /Monat · gesamt ' + KS.eur(pr.total) + "</small>" : KS.eur(pr.total);
      f.querySelector("[data-cta]").textContent = v && v.free ? "Kostenlos starten" : "Jetzt kaufen";
      f.querySelector("[data-cta]").classList.toggle("good", !!(v && v.free));
    };
    document.querySelectorAll("[data-buy]").forEach((b) => (b.onclick = () => { sel = b.dataset.buy; document.querySelectorAll("[data-buy]").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); }); upd(); }));
    code.oninput = upd; upd();
    f.onsubmit = (e) => {
      e.preventDefault();
      const msg = f.querySelector("[data-msg]");
      if (!f.querySelector("#by-ok").checked) { KS.toast("Bitte bestätige den Hinweis"); return; }
      const v = KS.checkVoucher(code.value);
      const p = KS.obj("profile"); p.name = f.querySelector("#by-name").value.trim(); p.start = f.querySelector("#by-date").value || KS.today(); p.variant = sel;
      if (v && v.free) {
        p.license = { name: v.name, at: new Date().toISOString(), variant: sel, price: 0 };
        KS.save(); KS.confetti(); KS.toast("Freigeschaltet. Willkommen bei Klarsinn!"); location.hash = "#start"; return;
      }
      KS.save();
      const link = KS.SHOP.paymentLinks[sel];
      if (link) msg.innerHTML = '<div class="note">Weiter zur sicheren Zahlung bei unserem Zahlungsanbieter: <a class="btn small" href="' + esc(link) + '" target="_blank" rel="noopener">Zur Zahlung (' + KS.eur(KS.SHOP.prices[sel].total) + ")</a></div>";
      else msg.innerHTML = '<div class="note warn"><b>Die Online-Zahlung wird gerade eingerichtet.</b> Sobald sie freigeschaltet ist, kannst du hier direkt bezahlen. Wenn du einen Gutscheincode hast, gib ihn oben ein und starte sofort.</div>';
    };
  };

  /* Paywall für gesperrte Bereiche */
  KS.paywall = function () {
    return '<section class="paywall fade-in"><div class="pw-lock"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div><div class="eyebrow">Teil des Programms</div><h2>Dieser Bereich wird mit deinem Zugang freigeschaltet</h2><p class="muted">Die erste Lektion von Modul 1 und die interaktiven Beispiele auf der Startseite kannst du kostenlos ausprobieren. Für alle 60 Lektionen, Übungswochen, Werkzeuge und deinen persönlichen Verlauf wähle ein Programm.</p><div class="row" style="justify-content:center"><a class="btn chunky big" href="#kaufen">Preise ansehen</a><button type="button" class="btn ghost" data-lesson="1">Kostenlose Probelektion</button></div></section>' + KS.priceCards("m6", true);
  };
})();
