import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import "./App.css";
import { ChatMessages } from "./components/ChatMessages";
import { useAutoScroll } from "./hooks/useAutoScroll";

const App = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const containerRef = useAutoScroll([chatMessages]);

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="intro-text">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}
      <div ref={containerRef} className="messages-container">
        <ChatMessages chatMessages={chatMessages} />
      </div>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default App;
