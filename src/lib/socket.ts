import { Server } from "socket.io";

interface ConnectedUser {
  id: string;
  name: string;
  joinedAt: Date;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

const connectedUsers = new Map<string, ConnectedUser>();
const messages: Message[] = [];

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining
    socket.on("user:join", (userData: { name: string }) => {
      const user: ConnectedUser = {
        id: socket.id,
        name: userData.name || `User_${socket.id.substring(0, 4)}`,
        joinedAt: new Date(),
      };

      connectedUsers.set(socket.id, user);
      
      // Notify all clients about the new user
      socket.broadcast.emit("user:joined", {
        id: user.id,
        name: user.name,
        joinedAt: user.joinedAt,
      });

      // Send current user list and messages to the new user
      socket.emit("users:list", Array.from(connectedUsers.values()));
      socket.emit("messages:list", messages);

      console.log(`User ${user.name} joined the chat`);
    });

    // Handle chat messages
    socket.on("message:send", (messageData: { content: string }) => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      const message: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: socket.id,
        username: user.name,
        content: messageData.content,
        timestamp: new Date(),
      };

      messages.push(message);

      // Broadcast the message to all clients
      io.emit("message:new", message);

      console.log(`Message from ${user.name}: ${message.content}`);
    });

    // Handle typing indicators
    socket.on("typing:start", () => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      socket.broadcast.emit("user:typing", {
        userId: socket.id,
        username: user.name,
        isTyping: true,
      });
    });

    socket.on("typing:stop", () => {
      const user = connectedUsers.get(socket.id);
      if (!user) return;

      socket.broadcast.emit("user:typing", {
        userId: socket.id,
        username: user.name,
        isTyping: false,
      });
    });

    // Handle private messages (optional feature)
    socket.on("message:private", (data: { toUserId: string; content: string }) => {
      const fromUser = connectedUsers.get(socket.id);
      const toUser = connectedUsers.get(data.toUserId);
      
      if (!fromUser || !toUser) return;

      const privateMessage: Message = {
        id: `priv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: socket.id,
        username: fromUser.name,
        content: data.content,
        timestamp: new Date(),
      };

      // Send to both users
      socket.emit("message:private", {
        ...privateMessage,
        direction: "sent",
        toUserId: data.toUserId,
      });

      io.to(data.toUserId).emit("message:private", {
        ...privateMessage,
        direction: "received",
        fromUserId: socket.id,
      });

      console.log(`Private message from ${fromUser.name} to ${toUser.name}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        connectedUsers.delete(socket.id);
        
        // Notify all clients about the user leaving
        socket.broadcast.emit("user:left", {
          id: socket.id,
          name: user.name,
        });

        console.log(`User ${user.name} disconnected`);
      }
    });

    // Send welcome message
    socket.emit("connected", {
      message: "Welcome to NEXUS Chat!",
      socketId: socket.id,
    });
  });

  // Optional: Clean up old messages periodically
  setInterval(() => {
    // Keep only last 100 messages
    if (messages.length > 100) {
      messages.splice(0, messages.length - 100);
    }
  }, 60000); // Clean up every minute
}