

// without Babel in ES2015
const { NFC } = require('nfc-pcsc');

const nfc = new NFC(); // optionally you can pass logger

var $ = require('jquery')

window.jQuery = $

var $content = $('.content')
var $readerState = $('.reader-state')
var $inner = $('.inner')

$readerState.html("<h1>Please attach Card reader!</h1>");

nfc.on('reader', reader => {

	$readerState.html("<h1>Reader attached!</h1>")

	// needed for reading tags emulated with Android HCE
	// custom AID, change according to your Android for tag emulation
	// see https://developer.android.com/guide/topics/connectivity/nfc/hce.html
	reader.aid = 'F222222222';

	reader.on('card', card => {

		// card is object containing following data
		// [always] String type: TAG_ISO_14443_3 (standard nfc tags like Mifare) or TAG_ISO_14443_4 (Android HCE and others)
		// [always] String standard: same as type
		// [only TAG_ISO_14443_3] String uid: tag uid
		// [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

		$inner.html("<h2>Card detected</h2>");

	});

	reader.on('card.off', card => {
		$inner.html("<h2>Card removed!</h2>");
	});

	reader.on('error', err => {
		$inner.html("<h2>Error</h2>");
	});

	reader.on('end', () => {
		$inner.html("<h2>End!</h2>");
	});

});

nfc.on('error', err => {
	console.log('an error occurred', err);
});
