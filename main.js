const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token, user_id } = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const messagesArr = [
  "WAK WAK",
  "Y-y-y-YANG BENER LU WINGG??",
  "Ape sih lu",
  "Iye dah wing",
  "CBK lu ya",
];

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready Logged in as ${readyClient.user.tag}`);
});

// Kalau Ewing ngirim chat
client.on("messageCreate", (message) => {
  if (message.author.id === user_id) {
    console.log(`Ewing ngirim chat`);
    const sentToEwink =
      messagesArr[Math.floor(Math.random() * messagesArr.length)];
    message
      .reply(sentToEwink)
      .then((sentMessage) => console.log(`Gw Bales: ${sentMessage.content}`))
      .catch((error) => console.error("Error:", error));
  } else if (message.mentions.has(client.user)) {
    console.log("Ada yang mention");
    message
      .reply("Apa sih lu manggil-manggil BRISIK!")
      .then((sentMessage) => console.log(`Gw Bales: ${sentMessage.content}`))
      .catch((error) => console.error("Error : ", error));
  } else { 
    console.log("ada yang error");
  }
});

client.login(token);
