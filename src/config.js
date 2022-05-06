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
            text: "Expresión para hallar el trabajo entre dos puntos",
            url: "https://drive.google.com/file/d/12DbsqsftDNHibjo_LT63Trd3S-oVbdTH/view?usp=sharing",
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
            text: "Expresiones para hallar la potencia mecánica",
            url: "https://drive.google.com/file/d/18qNikKmweUew90b2i6Vz7T8Io8DP0UQz/view?usp=sharing",
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
