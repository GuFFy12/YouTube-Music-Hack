interface YTcfg {
	d(): {
		WEB_PLAYER_CONTEXT_CONFIGS: {
			WEB_PLAYER_CONTEXT_CONFIG_ID_MUSIC_WATCH: {
				serializedExperimentFlags: string;
			};
		};
		IS_SUBSCRIBER: boolean;
		IS_MOBILE_WEB: boolean;
		AUDIO_QUALITY: string;
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
			'ab_fk_sk_cl=true',
			'ab_sa_ef=true',
			'enable_is_extended_monitoring=true',
			'enable_web_home_top_landscape_image_layout_click_location=true',
			'music_web_enable_server_queues=true',
			'music_web_is_canary=true',
			'music_web_is_canary_control=true',
			'music_web_canary_stage=2',
		];

		window.ytcfg.d().WEB_PLAYER_CONTEXT_CONFIGS.WEB_PLAYER_CONTEXT_CONFIG_ID_MUSIC_WATCH.serializedExperimentFlags =
			newSerializedExperimentFlags.concat(serializedExperimentFlags.split('&')).filter(Boolean).join('&');
		window.ytcfg.d().IS_SUBSCRIBER = true;
		window.ytcfg.d().IS_MOBILE_WEB = false;
		window.ytcfg.d().AUDIO_QUALITY = 'AUDIO_QUALITY_HIGH';

		document.removeEventListener('load', handleLoadEvent, true);
	}
}

document.addEventListener('load', handleLoadEvent, true);
