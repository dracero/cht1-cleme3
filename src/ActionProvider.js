import { gql } from "@apollo/client";
import client from "./index";


class ErrorLowConfidence extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, this.constructor);
  }
}

// ActionProvider starter code
class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  
  async searchNlusByName(intent, entity, role, trait) {
    let data = client
      .query({
        query: gql`
          query Nlus($intent: String!, $entity: String!, $role: String, $trait: String!) {
            nlus(intent: $intent, entity: $entity, role: $role, trait: $trait) {
              intent {
                text
              }
              entity {
                text
              }
              role {
                text
              }
              trait {
                text
              }
            }
          }
        `,
        variables: { intent: intent, entity: entity, role: role, trait: trait }
      })
      .then(({ loading, error, data }) => { return data });

    return data;

  }

  async greet(answer) {
    console.log(answer)
    try {
      const intent = answer.resp.intents[0].name;
      const conf_intent = answer.resp.intents[0].confidence;
      const ent = Object.values(Object.values(answer.resp.entities)[0])[0].name;
      const ent_rol = Object.values(Object.values(answer.resp.entities)[0])[0].role;    
      const conf_ent = Object.values(Object.values(answer.resp.entities)[0])[0].confidence;
      const trai = Object.values(Object.values(answer.resp.traits)[0])[0].value;
      const conf_trai = Object.values(Object.values(answer.resp.traits)[0])[0].confidence;
        
      let text_intent = "";
      let text_entity = "";
      let text_role = "";
      let text_trait = "";

      if (conf_intent < 0.6 || conf_ent < 0.6 || conf_trai < 0.6) {
        throw new ErrorLowConfidence();
      }

      let role = null
      if (ent_rol !== ent) {
        role = ent_rol
      }
    
    await this.searchNlusByName(intent, ent, role, trai).then((data) => {
        let response = data.nlus
        response.intent.text != null ? text_intent = response.intent.text : text_intent = '';
        response.entity.text != null ? text_entity = response.entity.text : text_entity ='';
        if (response.role){
          text_role = response.role.text;
        }
        if (response.trait){
          text_trait = response.trait.text; 
        }
      });
      // mensaje = a+b+c+d
      const mensaje =
        text_intent +
        " - " +
        text_entity +
        " - " +
        text_role +
        " - " +
        text_trait;

      const greetingMessage = this.createChatbotMessage(mensaje);
      this.updateChatbotState(greetingMessage);
      if (mensaje.includes("si la fuerza se puede escribir como el gradiente de una función escalar es conservativa")){
                  const Message = this.createChatbotMessage("Revisá estos links de trabajo", {
                  widget: "trabpotlinks"});
                  this.updateChatbotState(Message);
      }
      if (mensaje.includes("la potencia la derivada del trabajo respecto del tiempo")){
        const Message = this.createChatbotMessage("Revisá estos links de potencia", {
        widget: "potlinks"});
        this.updateChatbotState(Message);
      }
     } catch (e) {
        var mess = answer.mes.toLowerCase()
        //Palabras clave de cinemática
        var cinematica = (mess.includes("velocidad") || mess.includes("aceleración") || mess.includes("posición") || mess.includes("posicion") || mess.includes("rueda sin deslizar") || mess.includes("rotraslación") || mess.includes("punto"))
        var rigido = (mess.includes("cir") || mess.includes("cm") || mess.includes("centro de masa") || mess.includes("rígido"))
        //Palabras clave de dinámica
        var dinamica = (mess.includes("fuerza") || mess.includes("cuerpo libre") || mess.includes("dcl") || mess.includes("Newton") || mess.includes("newton "))
        var trabajo  = (mess.includes("trabajo") || mess.includes("potencia") || mess.includes("energía") || mess.includes("conservativa"))
        var impulso  = (mess.includes("percusión") || mess.includes("baricéntrico"))
        if (cinematica && !(rigido) && !(mess.includes("partículas"))){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "cinelinks"});
          this.updateChatbotState(Message);
        }
        else if (dinamica && !rigido && !(mess.includes("partículas"))){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "dinalinks"});
          this.updateChatbotState(Message);
        } 
        else if (trabajo && !rigido && !(mess.includes("partículas"))){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "tyelinks"});
          this.updateChatbotState(Message);
        } 
        else if (cinematica && rigido && !(mess.includes("partículas"))){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "cinerigidolinks"});
          this.updateChatbotState(Message);
        } 
        else if (dinamica && rigido && !(mess.includes("partículas"))){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "dinarigidolinks"});
          this.updateChatbotState(Message);
        }
        else if (impulso && !(mess.includes("partículas"))){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "tyerigidolinks"});
          this.updateChatbotState(Message);
        }    
        else if (mess.includes("partículas")){
          const Message = this.createChatbotMessage("Revisá estos links", {
          widget: "sistparticulas"});
          this.updateChatbotState(Message);
        }              
        else {
        this.updateChatbotState(this.createChatbotMessage("No entiendo tu pregunta"));
     }
    }
  } //fin funcion
 
  updateChatbotState(message) {
    // NOTE: This function is set in the constructor, and is passed in
    // from the top level Chatbot component. The setState function here
    // actually manipulates the top level state of the Chatbot, so it's
    // important that we make sure that we preserve the previous state.
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }


}

export default ActionProvider;
