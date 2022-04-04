// in config.js
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import LinkList from "./components/LinkList/LinkList";

const config = {
  initialMessages: [
    createChatBotMessage("Bienvenidos", {
      customComponents: {}
    })
  ],
  widgets: [
    {
      widgetName: "trabpotlinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Definiciones de trabajo y energía",
            url: "https://campus.fi.uba.ar/pluginfile.php/345695/mod_resource/content/0/Unidad%203%20-%20Trabajo%20y%20Energ%C3%ADa%20-%20Rev%2001.pdf",
            id: 1
          },
          {
            text: "Conceptos importantes",
            url: "http://www.sc.ehu.es/sbweb/fisica/dinamica/trabajo/energia/energia.htm",
            id: 2
          }
        ]
      }
    },
    {
      widgetName: "potlinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Definiciones de trabajo y energía",
            url: "https://campus.fi.uba.ar/pluginfile.php/345695/mod_resource/content/0/Unidad%203%20-%20Trabajo%20y%20Energ%C3%ADa%20-%20Rev%2001.pdf",
            id: 1
          },
          {
            text: "Conceptos importantes",
            url: "http://www.sc.ehu.es/sbweb/fisica/dinamica/trabajo/energia/energia.htm",
            id: 2
          }
        ]
      }
    }
  ]
};

export default config;
