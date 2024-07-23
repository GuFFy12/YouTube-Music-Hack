interface YTcfg {
	d(): {
		WEB_PLAYER_CONTEXT_CONFIGS: {
			WEB_PLAYER_CONTEXT_CONFIG_ID_MUSIC_WATCH: {
				serializedExperimentFlags: string;
			};
		};
	};
}

interface Window {
	ytcfg?: YTcfg;
}

function handleLoadEvent() {
	if (window.ytcfg) {
		const serializedExperimentFlags =
			window.ytcfg.d().WEB_PLAYER_CONTEXT_CONFIGS.WEB_PLAYER_CONTEXT_CONFIG_ID_MUSIC_WATCH
				.serializedExperimentFlags;

		const newSerializedExperimentFlags = [
			'mweb_allow_background_playback=true',
		];

		window.ytcfg.d().WEB_PLAYER_CONTEXT_CONFIGS.WEB_PLAYER_CONTEXT_CONFIG_ID_MUSIC_WATCH.serializedExperimentFlags =
			newSerializedExperimentFlags.concat(serializedExperimentFlags.split('&')).filter(Boolean).join('&');

		document.removeEventListener('load', handleLoadEvent, true);
	}
}

document.addEventListener('load', handleLoadEvent, true);