const getEnvParam = require('../getEnvParam');
const telegram = require('telegram-bot-api');

function sendToTelegram(text) {
	const telegramToken = getEnvParam('telegramToken');
	const telegramChatId = getEnvParam('telegramChatId');
	const needSendToTelegram = getEnvParam('needSendToTelegram');

	return new Promise(resolve => {
		if (!needSendToTelegram) {
			resolve();
			return;
		}

		const telegramBot = new telegram({token: telegramToken});

		const data = {
			chat_id: telegramChatId,
			parse_mode: 'HTML',
			text,
		};

		telegramBot.sendMessage(data).then(resolve);
	});
}

module.exports = sendToTelegram;