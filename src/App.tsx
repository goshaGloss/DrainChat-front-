import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { io, Socket } from "socket.io-client";

function App() {
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io("ws://localhost:8080/");
    socket.current.on("message", (message: string) => {
      setMessages((prevState) => [...messages, ...prevState, message]);
    });
  }, []);

  const [messages, setMessages] = useState<string[]>([]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => socket.current?.send(newMessage);

  return (
    <div className="messages">
      {messages.map((m: string, index) => (
        <div className="message" key={index}>
          {m}
        </div>
      ))}
      <input
        type="text"
        onInput={(e) => setNewMessage(e.currentTarget.value)}
      />
      <button onClick={sendMessage}>Send a message</button>
    </div>
  );
}

export default App;
