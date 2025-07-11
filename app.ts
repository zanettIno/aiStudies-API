const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send(`Estamos rodando bem!!`);
});

app.get('/ai/:prompt', async (req, res) => {
    const prompt = req.params.prompt;

    try{
        const resposta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "<API-KEY>",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
              "messages": [
                {
                  "role": "user",
                  "content": `${prompt}`
                }
              ]
            })
          });        
          
    const data = await resposta.json();
    res.json(data);
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
        res.status(500).json({ error: `Erro ao chamar a API ${error}` });
    }
});

app.listen(port, () => {
  console.log(`Server nice condition :) @ http://localhost:${port}`);
});