import { useState } from "react";
import axios from "axios";

import RepositoryForm from "./components/RepositoryForm";
import RepositoryInfo from "./components/RepositoryInfo";
import MetricCard from "./components/MetricCard";
import FolderTree from "./components/FolderTree";
import FileDetails from "./components/FileDetails";
import MainWorkspace from "./components/MainWorkspace";
import { useTheme } from "./context/ThemeContext";
import AssistantModal from "./components/AssistantModal";
import RepositoryAssistant from "./components/RepositoryAssistant";

function App() {
    const { theme, themeName, toggleTheme } = useTheme();
    const [githubUrl, setGithubUrl] = useState("");
    const [showAssistant, setShowAssistant] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");

    const [result, setResult] = useState(null);

    const [fileDetails, setFileDetails] = useState(null);
    const [selectedFile, setSelectedFile] = useState("");
    const [aiQuestion, setAiQuestion] = useState("");

    const [chatHistory, setChatHistory] = useState([]);

    const [askingAI, setAskingAI] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    async function analyzeRepository() {

        try {

            setLoading(true);
            setLoadingStep("📥 Cloning repository...");
            setTimeout(() => {
    setLoadingStep("🔍 Detecting project language...");
}, 800);

setTimeout(() => {
    setLoadingStep("📂 Building repository tree...");
}, 1600);

setTimeout(() => {
    setLoadingStep("🤖 Running Atlas AI...");
}, 2400);
const response = await axios.post(
    "http://127.0.0.1:8000/analyze",
    {
        github_url: githubUrl
    }
);
            

            console.log(response.data);
            setResult(response.data);
            setLoadingStep("✅ Analysis Complete!");

            setFileDetails(null);

        }

        catch (error) {

            console.log(error);

            alert("Analysis Failed");

        }

        finally {

            setTimeout(() => {
    setLoading(false);
    setLoadingStep("");
}, 500);

        }

    }

    async function analyzeFile(filePath) {

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/file-analysis",
                {
                    file_path: filePath
                }
            );

            setFileDetails(response.data);
            setChatHistory([]);
            setAiQuestion("");



        }

        catch (error) {

            console.log(error);

            alert("File Analysis Failed");

        }

    }

    async function askAI() {

    if (!fileDetails || !aiQuestion.trim()) return;

    const question = aiQuestion;

    setChatHistory(prev => [
        ...prev,
        {
            type: "user",
            text: question
        },
        {
            type: "assistant",
            text: "⏳ Atlas is thinking..."
        }
    ]);

    setAiQuestion("");

    try {

        setAskingAI(true);

        const response = await axios.post(
            "http://127.0.0.1:8000/ask-ai",
            {
                file_path: fileDetails.file_path,
                question
            }
        );

        setChatHistory(prev => {
    console.log("BEFORE:", prev);

    const updated = [...prev];

    updated[updated.length - 1] = {
        type: "assistant",
        text: response.data.answer,
        question: question
    };

    console.log("AFTER:", updated);

    return updated;
});

    }

    catch (error) {

        console.log(error);

        setChatHistory(prev => {

            const updated = [...prev];

            updated[updated.length - 1] = {
                type: "assistant",
                text: "❌ Atlas couldn't generate a response."
            };

            return updated;

        });

    }

    finally {

        setAskingAI(false);

    }

}

async function askPresetQuestion(question) {

    if (!fileDetails) return;

    setChatHistory(prev => [
        ...prev,
        {
            type: "user",
            text: question
        },
        {
            type: "assistant",
            text: "⏳ Atlas is thinking..."
        }
    ]);

    try {

        setAskingAI(true);

        const response = await axios.post(
            "http://127.0.0.1:8000/ask-ai",
            {
                file_path: fileDetails.file_path,
                question
            }
        );

        setChatHistory(prev => {
    console.log("BEFORE:", prev);

    const updated = [...prev];

    updated[updated.length - 1] = {
    type: "assistant",
    text: response.data.answer,
    question: question
};
    console.log("AFTER:", updated);

    return updated;
});;

    }

    catch (error) {

        console.log(error);

        setChatHistory(prev => {

            const updated = [...prev];

            updated[updated.length - 1] = {
                type: "assistant",
                text: "❌ Atlas couldn't generate a response."
            };

            return updated;

        });

    }

    finally {

        setAskingAI(false);

    }

}
    return (

        <div
    style={{
        ...styles.container,
        background: theme.background,
        color: theme.text
    }}
>

<div
    style={{
        width: "100%",
        maxWidth: "1700px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    }}
>
    <div>
        <h1 style={styles.title}>ATLAS</h1>
        <p>AI Repository Intelligence Platform</p>
    </div>

    <button
        onClick={toggleTheme}
        style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "18px"
        }}
    >
        {themeName === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
</div>

            <RepositoryForm
                githubUrl={githubUrl}
                setGithubUrl={setGithubUrl}
                analyzeRepository={analyzeRepository}/>
                {
    loading && (

        <div style={{
            marginTop: "40px",
            padding: "30px",
            borderRadius: "12px",
            width: "500px",
            textAlign: "center",
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            boxShadow: "0 8px 20px rgba(0,0,0,.1)"
        }}>

            <h2>🛰 Atlas is Working...</h2>

            <p>{loadingStep}</p>

        </div>
        

    )
}
                
            

            <RepositoryInfo
    result={result}
    openAssistant={() => setShowAssistant(true)}
/>

            {

                result &&

                <div style={styles.cards}>

                    <MetricCard title="Files" value={result.files} />
                    <MetricCard title="Classes" value={result.classes} />
                    <MetricCard title="Functions" value={result.functions} />
                    <MetricCard title="Imports" value={result.imports} />

                </div>

            }

{
    result && (
        <>
            <div style={styles.workspace}>
                <div style={styles.leftPanel}>
                    <FolderTree
                        tree={result.folder_tree}
                        analyzeFile={analyzeFile}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
<div
    style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        marginBottom: "40px"
    }}
>

</div><AssistantModal
    isOpen={showAssistant}
    onClose={() => setShowAssistant(false)}
>
    <RepositoryAssistant />
</AssistantModal>
                <div style={styles.rightPanel}>
                    <FileDetails
                        details={fileDetails}
                        aiQuestion={aiQuestion}
                        setAiQuestion={setAiQuestion}
                        chatHistory={chatHistory}
                        askingAI={askingAI}
                        askAI={askAI}
                        askPresetQuestion={askPresetQuestion}
                    />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "40px"
                }}
            >
             
            </div>

            
        </>
    )
}

</div>

    );
}
const styles = {

    container: {

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        minHeight: "100vh",

        background: "#0f172a",

        color: "white",

        padding: "40px"

    },

    cards: {

        display: "flex",

        gap: "20px",

        marginTop: "40px",

        marginBottom: "40px",

        flexWrap: "wrap",

        justifyContent: "center"

    },

    workspace: {

        display: "flex",

        width: "95%",

        maxWidth: "1700px",

        gap: "30px",

        alignItems: "flex-start",

        marginBottom: "40px"

    },

    leftPanel: {

        width: "30%",

        minWidth: "350px"

    },

    rightPanel: {

        flex: 1

    }

};

export default App;