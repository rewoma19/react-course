import { useState } from "react";
import "./App.css";

const App = () => {
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="intro-text">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}
      {/* TODO: move chatmessages and chatinput component */}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default App;
