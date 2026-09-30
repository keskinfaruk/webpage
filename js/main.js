// Faruk Keskin: personal site
// Vanilla JS only: language toggle + obfuscated email + printed CV date. No dependencies.

(function () {
	"use strict";

	function currentLang() {
		return document.documentElement.classList.contains("lang-tr") ? "tr" : "en";
	}

	function applyLang(lang) {
		document.documentElement.classList.remove("lang-en", "lang-tr");
		document.documentElement.classList.add("lang-" + lang);
		document.documentElement.setAttribute("lang", lang);
		var btn = document.getElementById("lang-toggle");
		if (btn) btn.textContent = lang === "en" ? "TR" : "EN";
		var cv = document.getElementById("cv-download");
		if (cv) cv.setAttribute("href", lang === "en" ? "keskin_cv_en.pdf" : "keskin_cv_tr.pdf");
	}

	document.addEventListener("DOMContentLoaded", function () {
		applyLang(currentLang());

		var toggle = document.getElementById("lang-toggle");
		if (toggle) {
			toggle.addEventListener("click", function () {
				var next = currentLang() === "en" ? "tr" : "en";
				try { localStorage.setItem("lang", next); } catch (e) {}
				applyLang(next);
			});
		}

		// assemble the mailto: link at runtime so the visible address stays
		// obfuscated against simple scrapers while still being clickable
		var user = "farukkeskin";
		var domain = "hacettepe.edu.tr";
		var emailLink = document.getElementById("email-link");
		if (emailLink) {
			emailLink.setAttribute("href", "mailto:" + user + "@" + domain);
		}

		// the printed CV shows the address in full, since a PDF needs it readable
		var fullEmails = document.querySelectorAll(".email-full");
		for (var i = 0; i < fullEmails.length; i++) {
			fullEmails[i].setAttribute("href", "mailto:" + user + "@" + domain);
			fullEmails[i].textContent = user + "@" + domain;
		}

		// "Last updated" on the printed CV: the page's modification date
		// (file time when built locally, Last-Modified when served)
		var dates = document.querySelectorAll(".cv-date");
		var modified = new Date(document.lastModified);
		for (var j = 0; j < dates.length; j++) {
			dates[j].textContent = modified.toLocaleDateString(dates[j].getAttribute("data-locale"),
				{ day: "numeric", month: "long", year: "numeric" });
		}
	});
})();
