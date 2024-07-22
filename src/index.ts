async function bootstrap() {
	function showMessage(message: string) {
		const messageDiv = document.createElement('div');
		messageDiv.textContent = message;
		messageDiv.style.position = 'fixed';
		messageDiv.style.bottom = '10px';
		messageDiv.style.right = '10px';
		messageDiv.style.padding = '10px';
		messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		messageDiv.style.color = 'white';
		messageDiv.style.borderRadius = '5px';
		messageDiv.style.zIndex = '10000';
		document.body.appendChild(messageDiv);

		setTimeout(() => {
			messageDiv.remove();
		}, 3000);
	}

	const originalAddEventListener = document.addEventListener;
	document.addEventListener = function (
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	) {
		if (type === 'visibilitychange') {
			showMessage('visibilitychange event listener prevented');
			return;
		}
		originalAddEventListener.call(document, type, listener, options);
	};

	const originalRemoveEventListener = document.removeEventListener;
	document.removeEventListener = function (
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	) {
		if (type === 'visibilitychange') {
			showMessage('visibilitychange event listener removal attempted');
			return;
		}
		originalRemoveEventListener.call(document, type, listener, options);
	};
}
void bootstrap();
