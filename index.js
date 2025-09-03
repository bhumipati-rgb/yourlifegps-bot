const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const BOT_TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('OK'));
app.get('/health', (req, res) => res.send('OK'));

app.post('/webhook', async (req, res) => {
  try {
    const update = req.body;
    const msg = update.message || update.edited_message;
    if (msg && msg.chat && msg.text) {
      const chatId = msg.chat.id;
      if (/^\/start/.test(msg.text)) {
        await fetch(`${API}/sendMessage`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id: chatId, text: 'Привіт! Бот працює ✅' })
        });
      } else {
        await fetch(`${API}/sendMessage`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id: chatId, text: 'Я на зв’язку. Напишіть /start' })
        });
      }
    }
    res.send('ok');
  } catch (e) {
    console.error(e);
    res.send('ok');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Bot server listening on', PORT));