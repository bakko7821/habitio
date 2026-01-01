const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Привет! Нажми кнопку, чтобы открыть Mini App:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Mini App',
            web_app: { url: 'https://sepulchral-slower-kristle.ngrok-free.dev' }
          }
        ]
      ]
    }
  });
});
