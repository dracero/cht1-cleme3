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
    },
    {
      widgetName: "cinelinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Podés revisar los apuntes de cinemática",
            url: "https://campus.fi.uba.ar/pluginfile.php/342335/mod_resource/content/0/Unidad%201%20-%20Cinem%C3%A1tica%20de%20la%20part%C3%ADcula-2020.pdf",
            id: 1
          }
        ]
      }
    },
    {
      widgetName: "rigidolinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Podés revisar los apuntes de Cuerpo Rígido",
            url: "https://campus.fi.uba.ar/pluginfile.php/374008/mod_resource/content/0/Unidad%205%20-%20Cinematica%20del%20cuerpo%20r%C3%ADgido%20Rev%2002.pdf",
            id: 1
          }
        ]
      }
    }
  ]
};

export default config;
