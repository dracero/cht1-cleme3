//here call Wit.ai
import { Wit } from "node-wit";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    const client = new Wit({ accessToken: "UAQCAODJZJ3VBULSNUZGMIBLWM4EYMMF" });
    var mensaje = lowerCaseMessage;
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
