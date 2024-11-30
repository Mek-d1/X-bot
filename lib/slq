import config from '../../config.js';
import { DataTypes } from 'sequelize';

const Greetings = config.DATABASE.define(
   'Greetings',
   {
      groupJid: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      enabled: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
      welcomeMessage: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      goodbyeMessage: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
   },
   { tableName: 'greetings', timestamps: false }
);

/**
 * Check if greetings are enabled for a specific group.
 * @param {string} groupJid - The group JID.
 * @returns {Promise<boolean>} - True if enabled, false otherwise.
 */
export const isEnabled = async (groupJid) => {
   const group = await Greetings.findOne({ where: { groupJid } });
   return group ? group.enabled : false;
};

/**
 * Get the welcome message for a specific group.
 * @param {string} groupJid - The group JID.
 * @returns {Promise<string|null>} - The welcome message or null if not set.
 */
export const getWelcomeMessage = async (groupJid) => {
   const group = await Greetings.findOne({ where: { groupJid } });
   return group ? group.welcomeMessage : null;
};

/**
 * Get the goodbye message for a specific group.
 * @param {string} groupJid - The group JID.
 * @returns {Promise<string|null>} - The goodbye message or null if not set.
 */
export const getGoodByeMessage = async (groupJid) => {
   const group = await Greetings.findOne({ where: { groupJid } });
   return group ? group.goodbyeMessage : null;
};

/**
 * Set or update the welcome message for a specific group.
 * @param {string} groupJid - The group JID.
 * @param {string} message - The new welcome message.
 * @returns {Promise<void>}
 */
export const setWelcomeMessage = async (groupJid, message) => {
   await Greetings.upsert({ groupJid, welcomeMessage: message });
};

/**
 * Set or update the goodbye message for a specific group.
 * @param {string} groupJid - The group JID.
 * @param {string} message - The new goodbye message.
 * @returns {Promise<void>}
 */
export const setGoodByeMessage = async (groupJid, message) => {
   await Greetings.upsert({ groupJid, goodbyeMessage: message });
};

export default Greetings;
