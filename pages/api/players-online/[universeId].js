import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GAME_INFO') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { universeId } = req.query;

  try {
    console.log('Iniciando a solicitação para userId:', universeId);
    
    const response = await axios.get(`https://games.roblox.com/v1/games?universeIds=${universeId}`);

    console.log('Resposta da API:', response.data);

    const data = response.data.data;

    if (!Array.isArray(data) || data.length === 0) {
      console.error('A resposta não contém a propriedade data ou é uma matriz vazia.');
      res.status(500).send(null);
      return;
    }

    const gameInfo = data[0];

    if (!gameInfo || !gameInfo.playing) {
      console.error('O primeiro objeto na matriz não contém a propriedade playing esperada.');
      res.status(500).send(null);
      return;
    }

    const amountOfPlaying = gameInfo.playing;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(amountOfPlaying);
  } catch (error) {
    console.error('Erro ao obter as informações do jogo:', error.message);
    res.status(500).send(null);
  }
}
