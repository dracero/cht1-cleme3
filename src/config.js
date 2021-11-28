// in config.js
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage("Bienvenidos", {
      customComponents: {}
    })
  ]
};

export default config;
