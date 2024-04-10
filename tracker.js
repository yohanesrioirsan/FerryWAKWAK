const axios = require('axios');

async function getValorantData(playerName) {
    const [nick, tag] = playerName.split("#");
    try {
        const response = await axios.get(`https://api.henrikdev.xyz/valorant/v2/mmr/ap/${nick}/${tag}`);

        console.log("Response : ", response.data);
    } catch (error) {
        console.log(error)
    }
}

const playerName = "Dion Shelby#qwert";
getValorantData(playerName);