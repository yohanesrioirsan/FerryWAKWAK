const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token, user_id } = require("./config.json");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "!";

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
  console.log(`${readyClient.user.tag} is online`);
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

  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(`${prefix}infoakun`)) {
    console.log("Received message:", message.content);
    console.log("ada yang mau cek akun");
    const command = message.content.slice("!infoakun".length).trim().split("#");
    console.log(command[0], command[1]);
    (async () => {
      try {
        const response = await axios.get(
          `https://api.henrikdev.xyz/valorant/v2/mmr/ap/${command[0]}/${command[1]}`
        );

        if (response && response.data) {
          console.log("Response data:", response.data);
          if (
            response.data.data.current_data &&
            response.data.data.highest_rank
          ) {
            const season = response.data.data.highest_rank.season;
            message.reply(
              `Akun ${response.data.data.name} sekarang rank ${
                response.data.data.current_data.currenttierpatched
              } dengan rank-rating ${
                response.data.data.current_data.ranking_in_tier
              }. Rank tertinggi ${
                response.data.data.highest_rank.patched_tier
              } di season ${season.toUpperCase()}`
            );
          } else {
            message.reply("cek akun lagi error nih bang");
            console.error("Player data is undefined in response.");
          }
        } else {
          message.reply("cek akun lagi error nih bang");
          console.error("Response or response.data is undefined");
        }
      } catch (error) {
        message.reply(
          `${message.content
            .slice("!infoakun".length)
            .trim()} kaga ada kocak ngetik yang bener.`
        );
        console.log("Ada yang error");
      }
    })();
  }
});

client.login(token);
