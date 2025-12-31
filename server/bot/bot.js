const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); // подключаем dotenv

const token = process.env.BOT_TOKEN;

// Режим polling (бот проверяет новые сообщения каждые несколько секунд)
const bot = new TelegramBot(token, { polling: true });

// Обработка любых текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log(`Сообщение от ${msg.from.username || msg.from.first_name}: ${text}`);

  // Отправляем ответ
  bot.sendMessage(chatId, `Ты написал: "${text}"`);
});
