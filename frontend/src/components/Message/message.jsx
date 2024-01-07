import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../ContextAuth";
import axios from "axios";

export const Message = () => {

    const { authToken, setAuthtoken } = useContext(AuthContext);
    const [conversations, setConversations] = useState([])

    const handleMessage = async () => {
        try {
            const response = await axios.get(
              'http://localhost:3000/message/get_all_messages/',
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            setConversations(response.data);
          } catch (error) {
            console.error('Échec de la requête', error);
          }
    };

    useEffect(() => {
          handleMessage();
      }, []);

    return (
        <>
        <h1>Messages :
        {conversations.map((conversation) => (
        <div key={conversation.id_conversation} className="conversation">
          {conversation.messages.map((message)=>(<p>{message.message_text}</p>))}
        </div>
      ))}
        </h1>
        </>
    )
};