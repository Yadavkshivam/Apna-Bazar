import { useState , useEffect} from "react";

export default function AiBot() {
  const [open, setOpen] = useState(false);
  const [ai, setAi] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Hello 👋!!  How may I help you today on Apna Vyapar ☺️ ?",
        },
      ]);
    }
  }, [open]);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/bot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply = data.reply || "Something went wrong 😢";

      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Server error ❌" }]);
    }

    setLoading(false);
  }

  return (
    <>

      <button
        onClick={() => {
          setOpen(!open);
          setAi(!ai);
        }}
        className={`fixed bottom-6 right-9 text-xl bg-black text-white px-4 py-3 rounded-xl shadow-lg pointer-events-auto z-[10000] 
        ${ai ? "animate-none" : "animate-bounce"}`}
      >
        🤖 Ask Me!!
      </button>


      {open && (
        <div className="fixed bottom-20 right-6 w-[340px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999]">


          <div className="bg-black text-white p-3 font-semibold">
            Ask me anything ✨
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[250px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-xl max-w-[80%] text-sm
                  ${msg.role === "user"
                    ? "bg-green-300 ml-auto"
                    : "bg-blue-300"
                  }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-blue-300 px-3 py-2 rounded-xl w-fit animate-pulse">
                Typing...
              </div>
            )}
          </div>

            
          <div className="flex items-center border-t p-2">
            <input
              className="flex-1 p-2 border rounded-lg outline-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-black text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
