import React from "react";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";

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

  // TODO: Arreglar hook + class y devolver data
  async searchNlusByName(intent, entity, role, trait) {
  
    const GET_NLUS = gql`
    query Nlus($intent: String!, $entity: String!, $role: String, $trait: String!){
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
    `;
  
    const { loading, error, data } = useQuery(GET_NLUS, {
      variables: { intent, entity, role, trait },
    });
  
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

      if (ent_rol !== ent) {
        ent_rol = null
      }
      await searchNlusByName(intent, ent, ent_rol, trai).then((data) => {
        // TODO: Asignar datos
        /*
        let response = data.nlus
        text_intent = response.intent.text;
        text_entity = response.entity.text;
        if (response.role){
          text_role = response.role.text;
        }
        text_trait = response.trait.text;
        */
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
