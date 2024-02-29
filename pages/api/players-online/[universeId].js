import axios from 'axios';

export default async function handler(req, res) {
  const { universeId } = req.query;

  try {   
    const response = await axios.get(`https://games.roblox.com/v1/games?universeIds=${universeId}`);

    const data = response.data.data;

    if (!Array.isArray(data) || data.length === 0) {
      res.status(500).send(null);
      return;
    }

    const gameInfo = data[0];

    if (!gameInfo || !gameInfo.playing) {
      res.status(500).send(null);
      return;
    }

    const amountOfPlaying = gameInfo.playing;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(amountOfPlaying);
  } catch (error) {
    res.status(500).send(null);
  }
}
