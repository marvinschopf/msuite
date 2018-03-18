

// without Babel in ES2015
const { NFC } = require('nfc-pcsc');

const nfc = new NFC(); // optionally you can pass logger

nfc.on('reader', reader => {

	document.getElementById('log').innerHTML = "hey";

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

		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + "\n" + `${reader.reader.name}  card detected`, card;

	});

	reader.on('card.off', card => {
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + "\n" + `${reader.reader.name}  card removed`, card;
	});

	reader.on('error', err => {
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + "\n" + `${reader.reader.name}  an error occurred`, err;
	});

	reader.on('end', () => {
		document.getElementById('log').innerHTML = document.getElementById('log').innerHTML + "\n" + `${reader.reader.name}  device removed`;
	});

});

nfc.on('error', err => {
	console.log('an error occurred', err);
});
