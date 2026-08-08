// Faruk Keskin — personal site
// Vanilla JS only: language toggle + obfuscated email. No dependencies.

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
		var emailLink = document.getElementById("email-link");
		if (emailLink) {
			var user = "farukkeskin";
			var domain = "hacettepe.edu.tr";
			emailLink.setAttribute("href", "mailto:" + user + "@" + domain);
		}
	});
})();
