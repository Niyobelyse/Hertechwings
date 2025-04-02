import React, { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';

const MessageApp = () => {
  const [conversations] = useState([
    { id: 1, name: "Emily Watson", lastMessage: "Do you have tips for matplotlib?", time: "9:50 AM", unread: 2, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Emily" },
    { id: 2, name: "Professor Johnson", lastMessage: "Project submission details", time: "Yesterday", unread: 1, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Johnson" },
    { id: 3, name: "Academic Support", lastMessage: "Your inquiry has been received", time: "Mar 20", unread: 0, avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Support" }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "Emily Watson", text: "Hi, I wanted to discuss the final project for the Python Programming course.", time: "9:42 AM", isUser: false },
      { id: 2, sender: "You", text: "Sure, what specific questions do you have about the project?", time: "9:45 AM", isUser: true }
    ]
  });

  const handleOpenChat = (contact) => setActiveChat(contact);
  const handleCloseChat = () => setActiveChat(null);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const chatMessages = messages[activeChat.id] || [];
      const updatedMessages = [...chatMessages, {
        id: chatMessages.length + 1,
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      }];
      setMessages({ ...messages, [activeChat.id]: updatedMessages });
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Message List */}
      <div className={`w-1/3 border-r ${activeChat ? "hidden md:block" : "block"}`}>
        <div className="p-4 ">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search className="text-gray-500 mr-2" size={20} />
            <input type="text" placeholder="Search messages" className="bg-transparent outline-none w-full" />
          </div>
        </div>
        {conversations.map(contact => (
          <div key={contact.id} onClick={() => handleOpenChat(contact)} className="p-4 flex hover:bg-gray-50 cursor-pointer ">
            <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                {contact.unread > 0 && <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{contact.unread}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className={`w-2/3 ${activeChat ? "block" : "hidden md:block"}`}>
        {activeChat && (
          <div className="h-full flex flex-col">
            <div className="bg-white p-4  flex items-center">
              <ArrowLeft onClick={handleCloseChat} className="mr-4 cursor-pointer md:hidden" />
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full mr-3" />
              <h2 className="font-semibold">{activeChat.name}</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages[activeChat.id]?.map(message => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border'}`}>
                    <p className="text-sm">{message.text}</p>
                    <div className="text-xs mt-1 opacity-70">{message.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-4  mb-16 mx-6 flex items-center">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-grow p-2 border rounded-l-lg" onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageApp;