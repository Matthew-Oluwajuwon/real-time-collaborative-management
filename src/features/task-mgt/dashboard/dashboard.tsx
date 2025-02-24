import { supabase } from "@/features/shared"; // Ensure supabase is properly initialized
import { Button, Input, message, Row, Spin } from "antd";
import { formatDistanceToNow } from "date-fns"; // For formatting timestamps
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  content: string;
  created_at: string;
};

export const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>(""); // For new message input
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to scroll to the bottom

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true }); // Order by creation date, oldest first

      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data);
      }
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchMessages();

    const channel = supabase
      .channel("messages") // Create a channel for real-time updates
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            payload.new as Message,
          ]);
        }
      )
      .subscribe();

    // Clean up the subscription when the component is unmounted
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      message.warning("Please enter a message before sending.");
      return;
    }

    // Get the current authenticated user
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error.message);
      message.error("Failed to get user.");
      return;
    }

    if (!user) {
      message.warning("You must be logged in to send a message.");
      return;
    }

    // Insert the message into the 'messages' table
    const { error: insertErr } = await supabase.from("messages").insert([
      {
        content: newMessage,
        user_id: user.user.id, // Use the user.id from getUser()
      },
    ]);

    if (insertErr) {
      console.error("Error inserting message:", insertErr.message);
      message.error("Failed to send message.");
    } else {
      setNewMessage(""); // Clear the input field
      message.success("Message sent successfully.");
    }
  };

  return (
    <div className="container mx-auto p-6 h-[100svh]">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Messages</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages available</p>
      ) : (
        <div
          className="space-y-4 max-h-[calc(100svh - 10rem)] overflow-auto flex-grow"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-800 text-lg">{message.content}</p>
              <small className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(message.created_at))} ago
              </small>
            </div>
          ))}
        </div>
      )}

      {/* Scroll to the bottom reference */}
      <div ref={messagesEndRef} />

      {/* Input and Send Button */}
      <Row className="mt-6 !flex !items-center !gap-5">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="!mb-3 !text-black !h-10 !border-[#2148C0] !w-full"
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          disabled={loading || newMessage.trim() === ""}
          block
          className="!p-5"
        >
          Send Message
        </Button>
      </Row>
    </div>
  );
};
