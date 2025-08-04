import { useState, useEffect, useRef } from "react";
import { Chatbot } from "supersimpledev";
import "./App.css";

function ChatInput(props) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { _, setChatMessages } = props;

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    // Prevent sending another message if one is still loading, or if there is no inputText value
    if (inputText === "" || isLoading) {
      return;
    }

    setInputText("");
    setIsLoading(true);

    //   Send user message
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: "user",
      },
      {
        // Use a fixed id for loading message so we can later identify it and replace it when the actual response arrives
        id: "loading",
        message: (
          <img
            className="spinner"
            src="/loading-spinner.gif"
            alt="loading-spinner"
          />
        ),
        sender: "bot",
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    //   send bot message
    setChatMessages((prevChatMessages) => [
      // return chatMessages but remove the loading... one
      ...prevChatMessages.filter((message) => message.id !== "loading"),
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "bot",
      },
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}

function ChatMessage(props) {
  const { message, sender } = props;

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "bot" && (
        <img className="chat-message-profile" src="../robot.png" alt="avatar" />
      )}
      <span className="chat-message-text">{message}</span>
      {sender === "user" && (
        <img className="chat-message-profile" src="../user.png" alt="avatar" />
      )}
    </div>
  );
}

function useAutoScroll(dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.scrollTop = containerEl.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function ChatMessages(props) {
  const { chatMessages } = props;
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        const { id, message, sender } = chatMessage;

        return <ChatMessage key={id} message={message} sender={sender} />;
      })}
    </div>
  );
}

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
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default App;
