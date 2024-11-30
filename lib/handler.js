const config = require('../config.js');
const { numtoId } = require('./utils.js');
const { isSudo } = require('./sql/sudo.js');
const { isBanned } = require('./sql/ban.js');

export const commands = [];

export function bot(cmdInfo, func) {
   cmdInfo.function = func;
   cmdInfo.pattern = new RegExp(`^(${config.PREFIX})\\s*(${cmdInfo.pattern})(?:\\s+(.*))?$`, 'i');
   cmdInfo.isPublic = cmdInfo.isPublic || false;
   cmdInfo.dontAddCommandList = cmdInfo.dontAddCommandList || false;
   cmdInfo.type = cmdInfo.type || 'misc';

   commands.push(cmdInfo);
   return cmdInfo;
}

export async function handleCommand(cmd, msg, conn, __patch) {
   if (!msg) return;

   const userJid = msg.sender;
   const userId = userJid ? numtoId(userJid).split('@')[0] : null;
   const owner = numtoId(__patch.user).split('@')[0];
   const sudo = await isSudo(userJid, owner);
   const banned = await isBanned(userJid);
   const mode = config.MODE === 'private';

   try {
      if (cmd.on) return await cmd.function(__patch, msg.body || '', msg, conn);
      if (!cmd.pattern) return;

      const match = msg.body.match(cmd.pattern);
      if (!match || match[0] !== msg.body) return;

      const prefix = match[1];
      const args = match[3] ?? '';

      if (prefix !== config.PREFIX) return;
      if (mode && !sudo) return;
      if (banned) return await __patch.sendReply('```@' + userId + ' you have been banned from using commands```', { mentions: [numtoId(userId)] });
      if (!mode && !cmd.isPublic && !sudo) return await __patch.sendReply('```@' + userId + ' this command is for my owners```', { mentions: [numtoId(userId)] });

      await cmd.function(__patch, args, msg, conn);
   } catch (err) {
      const cmdName = cmd.pattern.toString().split(/\W+/)[2] || cmd.on;
      const errMsg = `─━❲ ERROR REPORT ❳━─\nFROM: @${userId}\nMESSAGE: ${err.message}\nCMD: ${cmdName}`;
      await conn.sendMessage(__patch.user, { text: '```' + errMsg + '```', mentions: [numtoId(userId)] }, { quoted: msg });
   }
}
