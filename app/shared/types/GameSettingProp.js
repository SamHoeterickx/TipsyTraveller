/**
 * @typedef {Object} GameSettingProp
 * @property {string} title
 * @property {string} setting
 * @property {string|number} option
 * @property {string} imgPath
 * @property {Object} gameSettings
 * @property {Function} setGameSettings
 */

/** @type {GameSettingProp} */

const props = {
    title: "Easy",
    setting: "difficulty",
    option: "easy",
    imgPath: "beer-flesje.png",
    gameSettings: {},
    setGameSettings: () => {}
};