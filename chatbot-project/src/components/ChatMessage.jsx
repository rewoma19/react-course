import RobotProfileImg from "../assets/robot.png";
import UserAvatar from "../assets/user.png";

export function ChatMessage(props) {
  const { message, sender } = props;

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "bot" && (
        <img
          className="chat-message-profile"
          src={RobotProfileImg}
          alt="robot-profile-avatar"
        />
      )}
      <span className="chat-message-text">{message}</span>
      {sender === "user" && (
        <img
          className="chat-message-profile"
          src={UserAvatar}
          alt="user-avatar"
        />
      )}
    </div>
  );
}
