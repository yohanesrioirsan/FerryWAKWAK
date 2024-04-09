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
  "Wang Ajier",
  "Jangan sok asik wing",
  "你是中国人，对吧",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG5sc2Z2YWlwM2RybzI2YzY0NHN3OWI3emJqa211cjlsZDB5c3I0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPJPIySmYr4BEi7NS/giphy.gif",
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
  } 
  
  if (message.mentions.has(client.user)) {
    console.log("Ada yang mention");
    message
      .reply("Apa sih lu manggil-manggil BRISIK!")
      .then((sentMessage) => console.log(`Gw Bales: ${sentMessage.content}`))
      .catch((error) => console.error("Error : ", error));
  } 
});

client.login(token);
