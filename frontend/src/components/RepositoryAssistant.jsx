import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function RepositoryAssistant() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
    chatEndRef.current?.scrollIntoView({
        behavior: "smooth"
    });
}, [messages]);

    async function askRepository() {

        if (!question.trim()) return;

        const userQuestion = question;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userQuestion
            },
            {
                sender: "atlas",
                text: "⏳ Atlas is thinking..."
            }
        ]);

        setQuestion("");

        try {

            setLoading(true);

            const response = await axios.post(
                "http://127.0.0.1:8000/ask-repository",
                {
                    question: userQuestion
                }
            );

            setMessages(prev => {

                const updated = [...prev];

                updated[updated.length - 1] = {
                    sender: "atlas",
                    text: response.data.answer
                };

                return updated;

            });

        }

        catch (error) {

            console.error(error);

            setMessages(prev => {

                const updated = [...prev];

                updated[updated.length - 1] = {
                    sender: "atlas",
                    text: "⚠️ Atlas couldn't generate a response right now."
                };

                return updated;

            });

        }

        finally {

            setLoading(false);

        }

    }
        return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}
        >

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px"
                }}
            >

                {
                    messages.length === 0 &&

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "80px",
                            color: "#94a3b8"
                        }}
                    >
                        <h2>🚀 Atlas is Ready!</h2>

                        <p>Ask anything about this repository.</p>

                        <p style={{ marginTop: "25px" }}>
                            • Explain the architecture
                        </p>

                        <p>
                            • How does authentication work?
                        </p>

                        <p>
                            • Explain the folder structure
                        </p>

                        <p>
                            • Which framework is being used?
                        </p>
                    </div>

                }

                {

messages.map((message, index) => (

    <div
        key={index}
        style={{
            display: "flex",
            justifyContent:
                message.sender === "user"
                    ? "flex-end"
                    : "flex-start",
            marginBottom: "18px"
        }}
    >

        <div
            style={{
                width: "fit-content",
                maxWidth: "75%",
                padding: "16px",
                borderRadius: "16px",
                borderTopRightRadius:
                    message.sender === "user"
                        ? "4px"
                        : "16px",
                borderTopLeftRadius:
                    message.sender === "atlas"
                        ? "4px"
                        : "16px",
                background:
                    message.sender === "user"
                        ? "#2563eb"
                        : "#273449",
                color: "white",
                boxShadow: "0 6px 18px rgba(0,0,0,.25)"
            }}
        >

            <div
                style={{
                    fontWeight: "700",
                    marginBottom: "10px",
                    color:
                        message.sender === "user"
                            ? "#ffffff"
                            : "#7dd3fc"
                }}
            >
                {message.sender === "user"
                    ? "👤 You"
                    : "🤖 Atlas"}
            </div>

            <ReactMarkdown>
    {message.text}
</ReactMarkdown>

{
    message.sender === "atlas" &&
    message.text !== "⏳ Atlas is thinking..." && (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px"
            }}
        >
            <button
                onClick={() => {
    navigator.clipboard.writeText(message.text);

    setCopiedIndex(index);

    setTimeout(() => {
        setCopiedIndex(null);
    }, 2000);
}}
                style={{
                    background: "transparent",
                    border: "1px solid #475569",
                    color: "#cbd5e1",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px"
                }}
            >
                {
    copiedIndex === index
        ? "✅ Copied!"
        : "📋 Copy"
}
            </button>
        </div>
    )
}

        </div>

    </div>

))   

}
<div ref={chatEndRef}></div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    marginTop: "20px"
                }}
            >

                <input

                    type="text"

                    value={question}

                    placeholder="Ask anything about this repository..."

                    onChange={(e) => setQuestion(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            askRepository();

                        }

                    }}

                    style={{
                        flex: 1,
                        padding: "14px",
                        borderRadius: "10px"
                    }}

                />

                <button

                    onClick={askRepository}

                    disabled={loading}

                    style={{
                        padding: "14px 24px",
                        borderRadius: "10px",
                        cursor: "pointer"
                    }}

                >

                    {loading ? "Thinking..." : "Send"}

                </button>

            </div>

        </div>

    );

}

export default RepositoryAssistant;