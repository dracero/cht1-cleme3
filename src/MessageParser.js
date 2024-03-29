//here call Wit.ai
import { Wit } from "node-wit";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
    this.answer = ""
    
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    const withoutMarks = lowerCaseMessage.replace('?','');
    const freeMarks =  withoutMarks.replace('¿','');
    const freePeridod =  freeMarks.replace('.','');
    const client = new Wit({ accessToken: "UAQCAODJZJ3VBULSNUZGMIBLWM4EYMMF" });
    var mensaje = freePeridod;
    client
      .message(mensaje, {})
      .then((data) => {
        var respuesta = data;
        var answer ={
          mes: mensaje,
          resp: respuesta
        }
        this.actionProvider.greet(answer);
      })
      .catch((err) => this.actionProvider.greet("vacio"));
  }
}

export default MessageParser;
