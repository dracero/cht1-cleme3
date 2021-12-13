import React from "react";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";

class ErrorLowConfidence extends Error {
  constructor() {
    super();
    Error.captureStackTrace(this, this.constructor);
  }
}

// CAMBIAR
const GET_NLUS = gql`
  query Nlus($name: String!){
    nlus(name: $name) {
      name
      text
    }
  }
`;


const searchByName = (name) => {

  // CAMBIAR
  const { loading, error, data } = useQuery(GET_NLUS, {
    variables: { name },
  });

  /*
  let response = axios
    .get(process.env.REACT_APP_URL + "nlu_structure_name?name=" + name)
    .then((response) => {
      if (!response.data) {
        console.log(
          "Error: no existe una estructura con el nombre " + name + ""
        );
        return "";
      } else {
        //console.log(response.data.text);
        return response.data.text;
      }
    })
    .catch((error) => {
      let errorMessage = error.response.data.name;
      console.log(errorMessage);
      return "";
    });
  return response;
  */
}

// ActionProvider starter code
class ActionProvider {
  
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  async greet(respuesta) {
    try {
      /*
      // intent
      console.log(respuesta.intents[0].name, respuesta.intents[0].confidence);
      // entity
      const ent = Object.values(Object.values(respuesta.entities)[0])[0].name;
      // role
      const ent_rol = Object.values(Object.values(respuesta.entities)[0])[0]
        .role;
      // confidence
      const conf_ent = Object.values(Object.values(respuesta.entities)[0])[0]
        .confidence;
      console.log(ent, ent_rol, conf_ent);
      // trait
      const trai = Object.values(Object.values(respuesta.traits)[0])[0].value;
      const conf_trai = Object.values(Object.values(respuesta.traits)[0])[0]
        .confidence;
      console.log(trai, conf_trai);
      */

      const intent = "intent1";
      const conf_intent = 0.75;
      const ent = "entity1";
      const ent_rol = "role1";
      const conf_ent = 0.8;
      const trai = "trait1";
      const conf_trai = 0.9;

      let text_intent = "";
      let text_entity = "";
      let text_role = "";
      let text_trait = "";

      if (conf_intent < 0.7 || conf_ent < 0.7 || conf_trai < 0.7) {
        throw new ErrorLowConfidence();
      }
      /*
      await searchByName(intent).then((response) => {
        text_intent = response;
      });
      */
      await searchByName(ent).then((response) => {
        text_entity = response;
      });
      /*
      if (ent_rol !== ent) {
        await searchByName(ent_rol).then((response) => {
          text_role = response;
        });
      }
      await searchByName(trai).then((response) => {
        text_trait = response;
      });
      */

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
    } catch (e) {
      console.log(e);
      this.updateChatbotState(
        this.createChatbotMessage("No entiendo tu pregunta")
      );
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
