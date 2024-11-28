const { smd } = require("../lib");
smd(
  {
    pattern: "ssave",
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename,
    use: "< status >",
  },
  async (message) => {
    try {
      let mm =
        message.reply_message && message.reply_message.status
          ? message.reply_message
          : false;
      if (mm) {
        message.bot.forwardOrBroadCast(message.user, mm, {
          quoted: { key: mm.key, message: mm.message },
        });
      } else message.send("*reply to whatsapp status*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false);
    }
  }
);
const regexSend = new RegExp(
  `\\b(?:${["send", "share", "snd", "give", "save", "sendme", "forward"].join(
    "|"
  )})\\b`,
  "i"
);
smd({ on: "quoted" }, async (message, text) => {
  try {
    let mm = message.reply_message.status ? message.reply_message : false;
    if (mm && regexSend.test(text.toLowerCase())) {
      message.bot.forwardOrBroadCast(
        message.fromMe ? message.user : message.from,
        mm,
        { quoted: { key: mm.key, message: mm.message } }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

global.waPresence =
  process.env.WAPRESENCE && process.env.WAPRESENCE === "online"
    ? "available"
    : process.env.WAPRESENCE || "";
global.api_smd = "https://api-smd.onrender.com";

let status = false,
  times = 0;
smd({ on: "main" }, async (message, text, { icmd }) => {
  try {
    if (!status) {
      try {
        status = true;
      } catch (e) {}
    }

    if (message.status) return;
    if (
      `${global.readmessagefrom}`.includes(message.senderNum) ||
      ["yes", "true", "ok", "sure"].includes(global.readmessage) ||
      (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))
    )
      message.bot.readMessages([message.key]);
  } catch (e) {
    console.log(e);
  }
});

smd({ on: "text" }, async (message, text, { icmd }) => {
  try {
    if (
      ["unavailable", "available", "composing", "recording", "paused"].includes(
        waPresence
      )
    )
      message.bot.sendPresenceUpdate(waPresence, message.from);
    if (message.isAstro && !message.fromMe && !message.text.startsWith("$"))
      message.react("");
  } catch (e) {
    console.log(e);
  }
});

smd({ on: "status" }, async (message, text) => {
  try {
    if (
      `${global.read_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
      ["yes", "true", "ok", "sure"].includes(global.read_status) ||
      message.fromMe ||
      message.isAstro
    ) {
      await message.bot.readMessages([{ ...message.key, fromMe: false }]);
    }
    if (
      (`${global.save_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
        ["yes", "true", "ok", "sure"].includes(global.save_status)) &&
      !message.fromMe
    ) {
      await message.bot.forwardOrBroadCast(message.user, message, {
        quoted: { key: message.key, message: message.message },
      });
    }
  } catch (e) {
    console.log(e);
  }
});
smd(
  {
    cmdname: "him",
    desc: "him",
    react: "🚶🏾‍♂️",
    type: "misc",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://i.imgur.com/XkoFoW1.jpeg",
        { caption: "*I'M HIM 😂, IF YOU DON'T AGREE THEN GO FUCK YOURSELF (☠᭄𝕯𝖆𝖛𝖎𝖉✰࿐☠)*" },
        "img",
        m
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: -X-:bot`, e, false);
    }
  }
);
smd(
  {
    cmdname: "aza",
    desc: "Send donation details",
    type: "misc",
    react: "💰",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://files.catbox.moe/mx0z4n.jpg",
        { caption: "*Support -X-:bot OPay Bank: OPay Digital Services Limited(OPay) OPay Account: 9133354644 Name: David promise, Nigeria Show Love*" },
        "img",
        m
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: aza`, e, false);
    }
  }
);
 smd({
  cmdname: "dave-x",
  desc: "Send a video to Luna",
  type: "fun",
  react: "🎥",
  filename: __filename,
},
async (m) => {
  const videoUrl = "https://files.catbox.moe/46jqtg.mov";
  const caption = "love 🚀";

  try {
    await m.sendMessage(m.from, {
      video: { url: videoUrl },
      caption: caption,  // Added missing comma
      mimetype: 'video/mp4'
    });
  } catch (e) {
    console.error(`${e}\n\nCommand: dave-x`, e);
  }
});
smd(
  {
    cmdname: "specialt",
    desc: "Send a video to Luna",
    type: "fun",
    react: "🎥",
    filename: __filename,
  },
  async (m) => {
    const videoUrl = "https://i.imgur.com/KNWskFJ.mp4"; // Updated URL
    const caption = "for my guys 🌚! Do you like it?"; // Updated caption

    try {
      await m.sendMessage(m.from, {
        video: { url: videoUrl },
        caption: caption,
        mimetype: 'video/mp4'
      });
    } catch (e) {
      console.error(`${e}\n\nCommand: sendvideo`, e);
    }
  }
);
smd(
  {
    cmdname: "gay",
    desc: "Sends the 'Why are you gay' meme",
    react: "🤔",
    type: "misc",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://files.catbox.moe/vq314f.jpg", // The image URL
        { caption: "*Why are you gay?*" }, // The caption
        "img", // The message type
        m // The message object
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: whyareyougay`, e, false);
    }
  }
);smd(
  {
    cmdname: "lili",
    desc: "Send a video to Luna",
    type: "fun",
    react: "🥵",
    filename: __filename,
  },
  async (m) => {
    const videoUrl = "https://i.imgur.com/eWjxz3I.mp4"; // Updated URL
    const caption = "give your life to Christ, ODE 😂"; // Updated caption

    try {
      await m.sendMessage(m.from, {
        video: { url: videoUrl },
        caption: caption,
        mimetype: 'video/mp4'
      });
    } catch (e) {
      console.error(`${e}\n\nCommand: sendvideo`, e);
    }
  }
);
smd(
  {
    cmdname: "foru",
    desc: "Sends an image with the caption *☠᭄𝕯𝖆𝖛𝖎𝖉✰࿐, the one 🎶'",
    react: "💌",
    type: "misc",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send(
        "https://i.imgur.com/7psUg8z.jpeg", // The image URL
        { caption: "*THIS IS FOR YOU BBY🥹, YOU SHA KNOW YOURSELF 🚶🏾‍♂️*" }, // The caption
        "img", // The message type
        m // The message object
      );
    } catch (e) {
      m.error(`${e}\n\nCommand: foru`, e, false);
    }
  }
);
