//here call Wit.ai
import { Wit } from "node-wit";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    const client = new Wit({ accessToken: "NO45XJ7CQV5XHOD6LDF5TQ7WNISL6LR5" });
    var mensaje = lowerCaseMessage;
    client
      .message(mensaje, {})
      .then((data) => {
        var respuesta = data;
        console.log(message)
        this.actionProvider.greet(respuesta);
      })
      .catch((err) => this.actionProvider.greet("vacio"));
  }
}

export default MessageParser;
