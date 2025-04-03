import { useState } from 'react'
import { Link } from 'react-router-dom'

// Temporary mock data
const mockConversations = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '12:30 PM', unread: 2 },
  { id: 2, name: 'Jane Smith', lastMessage: 'The meeting is at 3 PM', time: '11:45 AM', unread: 0 },
  { id: 3, name: 'Team Chat', lastMessage: 'Alice: Great work everyone!', time: '10:20 AM', unread: 5 },
]

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement send message logic
    setMessage('')
  }

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <div className={`bg-base-100 ${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden flex flex-col border-r border-base-300`}>
        <div className="p-4 border-b border-base-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Messages</h2>
            <Link to="/profile" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile" />
              </div>
            </Link>
          </div>
          <div className="form-control mt-4">
            <input
              type="text"
              placeholder="Search conversations..."
              className="input input-bordered w-full"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {mockConversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-base-200 transition-colors ${
                selectedChat === chat.id ? 'bg-base-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} alt={chat.name} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-sm text-base-content/60">{chat.time}</span>
                  </div>
                  <p className="text-sm text-base-content/70 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="badge badge-primary badge-sm">{chat.unread}</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-base-100 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className="btn btn-ghost btn-circle lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {selectedChat && (
              <>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockConversations.find(c => c.id === selectedChat)?.name}`} alt="chat" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{mockConversations.find(c => c.id === selectedChat)?.name}</h3>
                  <p className="text-sm text-base-content/70">Online</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedChat ? (
            <div className="space-y-4">
              {/* Example messages - replace with actual messages */}
              <div className="chat chat-start">
                <div className="chat-bubble">Hi there!</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">Hello! How are you?</div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-base-content/60">
              Select a conversation to start chatting
            </div>
          )}
        </div>

        {/* Message Input */}
        {selectedChat && (
          <div className="p-4 bg-base-100 border-t border-base-300">
            <form onSubmit={handleSend} className="flex items-center space-x-2">
              <button type="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
} 