import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";
import axios from "axios";

import "highlight.js/styles/github-dark.css";
async function downloadDocumentation(fileName, documentation) {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/download-docs",
            {
                file_name: fileName,
                documentation: documentation
            },
            {
                responseType: "blob"
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");

        link.href = url;
        link.download = `${fileName}_documentation.docx`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
        alert("Failed to download documentation.");
    }
}

function Section({ title, children }) {
    return (
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{title}</h3>
            {children}
        </div>
    );
}

function FileDetails({
    details,
    aiQuestion,
    setAiQuestion,
    chatHistory =[],
    askingAI,
    askAI,
    askPresetQuestion
    
}) {
const [copiedMessage, setCopiedMessage] = useState(null);
    console.log("chatHistory:", chatHistory);
    if (!details) {

        return (

            <div style={styles.emptyBox}>

                <h2>📂 No File Selected</h2>

                <p>Select a file from the repository tree.</p>

            </div>

        );

    }

    return (

        <div style={styles.box}>

            <h2 style={styles.title}>

                📄 {details.file_name}
            </h2>

            <Section title="🤖 AI Summary">

                <div style={styles.summaryBox}>

                    <ReactMarkdown
    components={{
        p: ({ children }) => (
            <p style={styles.markdown}>{children}</p>
        ),
        li: ({ children }) => (
            <li style={styles.markdown}>{children}</li>
        ),
        h1: ({ children }) => (
            <h1 style={styles.heading}>{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 style={styles.heading}>{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 style={styles.heading}>{children}</h3>
        )
    }}
>
    {details.summary}
</ReactMarkdown>

                </div>

            </Section>

            <Section title="💬 Ask Atlas">

                <div style={styles.quickActions}>

                    <button
                        style={styles.quickButton}
                        onClick={() => askPresetQuestion("Explain this file.")}
                        onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 8px 18px rgba(37,99,235,0.35)";
}}

onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
}}
                    >
                        📖 Explain
                    </button>

                    <button
    style={styles.quickButton}
    onClick={() => askPresetQuestion("Review this file and identify bugs, potential issues, edge cases, security vulnerabilities, and bad coding practices.")}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(37,99,235,0.35)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    }}
>
                        🐞 Find Bugs
                    </button>

                    <button
    style={styles.quickButton}
    onClick={() => askPresetQuestion("Review this file and suggest performance improvements, cleaner code, refactoring opportunities, and optimizations.")}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(37,99,235,0.35)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    }}
>
                        ⚡ Optimize
                    </button>

                    <button
    style={styles.quickButton}
    onClick={() => askPresetQuestion("Generate complete documentation for this file including purpose, classes, functions, parameters, return values, and examples.")}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(37,99,235,0.35)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    }}
>
                        📄 Docs
                    </button>

                </div>

                <textarea

                    value={aiQuestion}

                    onChange={(e) => setAiQuestion(e.target.value)}

                    placeholder="Ask anything about this file..."

                    style={styles.textArea}

                />

                <button

                    style={styles.button}

                    onClick={askAI}

                    disabled={askingAI}

                >

                    {askingAI ? "🤖 Atlas is Thinking..." : "🚀 Ask AI"}

                </button>

            </Section>

           {
    chatHistory.length > 0 &&

    <Section title="🤖 Atlas Chat">

        <div style={styles.chatContainer}>
            {console.log(chatHistory)}

            {chatHistory.map((message, index) => (
                

                <div
                    key={index}
                    style={
                        message.type === "user"
                            ? styles.userMessage
                            : styles.aiMessage
                    }
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "12px"
                        }}
                    >

                        <strong>
                            {message.type === "user"
                                ? "👤 You"
                                : "🤖 Atlas"}
                        </strong>

                        {
                            message.type === "assistant" && (
                                <>
                                {console.log(message)}

<button
    onClick={() => {
        navigator.clipboard.writeText(message.text);
        setCopiedMessage(message);

        setTimeout(() => {
            setCopiedMessage(null);
        }, 2000);
    }}
    style={{
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "5px 10px",
        cursor: "pointer"
    }}
>
    {copiedMessage === message ? "✅ Copied!" : "📋 Copy"}
</button>

{message.question?.includes("Generate complete documentation") && (
   <button
    onClick={() =>
        downloadDocumentation(
            details.file_name,
            message.text
        )
    }
    style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "5px 10px",
        cursor: "pointer",
        marginLeft: "8px"
    }}
>
    📄 Download DOCX
</button>
)}
                                    </>
                            )
                        }

                    </div>

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {message.text}
                    </ReactMarkdown>

                </div>

            ))}

        </div>

    </Section>
}
            

            <Section title="📦 Imports">

                <ul>

                    {

                        details.imports.length === 0

                            ? <li>None</li>

                            : details.imports.map((item, index) => (
    <li key={`${item}-${index}`}>
        {item}
    </li>
))

                    }

                </ul>

            </Section>

            <Section title="🏛 Classes">

                <ul>

                    {

                        details.classes.length === 0

                            ? <li>None</li>

                            : details.classes.map((item, index) => (
    <li key={`${item}-${index}`}>
        {item}
    </li>
))

                    }

                </ul>

            </Section>

            <Section title="⚙ Functions">

                <ul>

                    {

                        details.functions.length === 0

                            ? <li>None</li>

                            : details.functions.map((item, index) => (
    <li key={`${item}-${index}`}>
        {item}
    </li>
))

                    }

                </ul>

            </Section>

            <Section title="💻 Source Code">

                <SyntaxHighlighter

                    language="python"

                    style={oneDark}

                    showLineNumbers

                    wrapLongLines

                    customStyle={{

                        borderRadius: "10px",

                        maxHeight: "700px",

                        fontSize: "14px"

                    }}

                >

                    {details.source_code}

                </SyntaxHighlighter>

            </Section>

        </div>

    );

}

const styles = {

    box: {

        background: "#1e293b",

        padding: "25px",

        borderRadius: "12px",

        color: "white",

        width: "100%",

        textAlign: "left"

    },

    emptyBox: {

        background: "#1e293b",

        padding: "50px",

        borderRadius: "12px",

        color: "white",

        textAlign: "center"

    },

    title: {

        borderBottom: "1px solid #334155",

        paddingBottom: "12px",

        marginBottom: "25px"

    },

    section: {

        marginBottom: "35px"

    },

    sectionTitle: {

        color: "#60a5fa",

        marginBottom: "15px"

    },

    summaryBox: {

        background: "#0f172a",

        padding: "20px",

        borderLeft: "5px solid #3b82f6",

        borderRadius: "10px"

    },

    answerBox: {

        background: "#0f172a",

        padding: "20px",

        borderLeft: "5px solid #22c55e",

        borderRadius: "10px"

    },

    summaryText: {

        whiteSpace: "pre-wrap",

        fontFamily: "inherit",

        lineHeight: "1.7",

        margin: 0

    },

    textArea: {

        width: "100%",

        height: "100px",

        background: "#0f172a",

        color: "white",

        border: "1px solid #334155",

        borderRadius: "8px",

        padding: "12px",

        resize: "vertical",

        fontSize: "15px",

        marginBottom: "15px"

    },

    button: {

        background: "#2563eb",

        color: "white",

        border: "none",

        borderRadius: "8px",

        padding: "10px 20px",

        cursor: "pointer",

        fontSize: "15px"

    

    },
    markdown: {

    lineHeight: "1.8",

    fontSize: "15px",

    color: "white"

},

heading: {

    color: "#60a5fa",

    marginTop: "15px",

    marginBottom: "10px"

},
quickActions: {

    display: "flex",

    gap: "10px",

    flexWrap: "wrap",

    marginBottom: "20px"

},

quickButton: {

    background: "#2563eb",

    color: "white",

    border: "none",

    borderRadius: "8px",

    padding: "8px 14px",

    cursor: "pointer",

    fontSize: "14px",
    transition: "all 0.25s ease",

},

chatContainer: {

    display: "flex",

    flexDirection: "column",

    gap: "20px",

    marginTop: "20px"

},

userMessage: {

    background: "#2563eb",

    padding: "16px",

    borderRadius: "16px",

    alignSelf: "flex-end",

    maxWidth: "75%",

    color: "white",

    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"

},

aiMessage: {

    background: "#111827",

    padding: "18px",

    borderRadius: "16px",

    border: "1px solid #334155",

    borderLeft: "5px solid #22c55e",

    maxWidth: "75%",

    alignSelf: "flex-start",

    overflowX: "auto",

    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"

},
};

export default FileDetails;