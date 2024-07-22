// ==UserScript==
// @name         DEV
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @require      https://update.greasyfork.org/scripts/433051/Trusted-Types%20Helper.user.js
// @run-at       document-idle
// ==/UserScript==

function boostrap() {
	let latestUserscript: string;

	function loadUserscript() {
		if (document.hidden) return;

		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://localhost:9000',
			onload: (response) => {
				if (response.status === 200) {
					if (!latestUserscript) {
						console.log('Inject...');

						try {
							eval(response.responseText);
						} catch (error) {
							console.error(error);
						}

						latestUserscript = response.responseText;
					} else if (latestUserscript !== response.responseText) {
						console.log('Reload...');

						clearInterval(interval);

						location.reload();
					}
				}
			},
			onerror: (response) => {
				console.log(response);
			},
		});
	}

	loadUserscript();
	const interval = setInterval(loadUserscript, 500);
}
boostrap();
