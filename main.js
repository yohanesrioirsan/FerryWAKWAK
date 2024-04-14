const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType
} = require("discord.js");
const { token, user_id, apiKey } = require("./config.json");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "!";
const messagesArr = require("./message.json");

client.once(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} is online`);

  client.user.setActivity({
    name: "SWEATER WEATHER",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=p40RlA1cTpQ",
  });
});

// Discord BOT Message Create Setup
client.on("messageCreate", (message) => {
  // Simple reply command
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



  // Prefix Command with !, e.g !infoakun, !tanyaperi
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
          console.log("Checking valorant data..");
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

  if (message.content.startsWith(`${prefix}tanyaperi`)) {
    console.log("Ada yang mau nanya nih");
    const command = message.content.slice("!infoakun".length).trim();
    (async () => {
      try {
        const response = await axios.get(
          `https://api.velixs.com/nakiri?text=${command}&apikey=${apiKey}`
        );

        const responseData = response.data.data.reply;
        if (responseData.length > 2000) {
          const splitMessage = responseData.match(/[\s\S]{1,2000}/g);
          for (const messageChunk of splitMessage) {
            message.reply(messageChunk);
          }
        } else {
          message.reply(responseData);
        }

      } catch (error) {
        message.reply("lagi ga mute buat jawab nih.");
        console.log(error);
      }
    })();
  }
});

client.login(token);
