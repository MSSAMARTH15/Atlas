import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function getAllFiles(tree, currentPath = "") {

    let files = [];

    let currentFiles = tree.__files__ || [];

    if (!Array.isArray(currentFiles)) {
        currentFiles = Object.values(currentFiles);
    }

    files.push(...currentFiles);

    Object.keys(tree).forEach(key => {

        if (key === "__files__") return;

        files.push(
            ...getAllFiles(
                tree[key],
                currentPath + "/" + key
            )
        );

    });

    return files;

}

function Folder({
    name,
    childrenTree,
    analyzeFile,
    selectedFile,
    setSelectedFile,
     setSearchQuery
}) {

    const [open, setOpen] = useState(false);
    const { theme } = useTheme();

    let files = childrenTree.__files__ || [];

    if (!Array.isArray(files)) {
        files = Object.values(files);
    }

    const folders = Object.keys(childrenTree).filter(
        key => key !== "__files__"
    );

    return (

        <div style={{ marginLeft: "20px", marginTop: "6px" }}>

            <div

                style={{
    ...styles.folder,
    color: theme.text
}}
onMouseEnter={(e) => {
    e.currentTarget.style.background = theme.card;
}}
onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
}}

                onClick={() => setOpen(!open)}

            >

                {open ? "📂" : "📁"} {name}

            </div>

            {

                open && (

                    <div style={{ marginLeft: "18px" }}>

                        {

                            files.map(file => (

                                <div

                                    key={file.path}

                                    onClick={async() => {
                                        setSearchQuery("");

                                        analyzeFile(file.path);

                                        setSelectedFile(file.path);
                                        



                                    }}

                                    style={{
    ...styles.file,
    color: theme.text,
    transition: "all .2s ease",

    ...(selectedFile === file.path
        ? {
            ...styles.selectedFile,
            background: theme.primary
            
        }
        : {})
}}
onMouseEnter={(e) => {

    if (selectedFile !== file.path) {
        e.currentTarget.style.background = theme.card;
    }

}}
onMouseLeave={(e) => {

    if (selectedFile !== file.path) {
        e.currentTarget.style.background = "transparent";
    }

}}
                                >

                                    📄 {file.name}

                                </div>

                            ))

                        }

                        {

                            folders.map(folder => (

                                <Folder

                                    key={folder}

                                    name={folder}

                                    childrenTree={childrenTree[folder]}

                                    analyzeFile={analyzeFile}

                                    selectedFile={selectedFile}

                                    setSelectedFile={setSelectedFile}

                                    setSearchQuery={setSearchQuery}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

function FolderTree({

    tree,

    analyzeFile,

    selectedFile,

    setSelectedFile,

    searchQuery,

    setSearchQuery

    
}) {
const { theme } = useTheme();
console.log("TREE =", tree);

if (!tree) {
    return (
        <div
            style={{
                width: "300px",
                background: "red",
                color: "white",
                padding: "20px"
            }}
        >
            Tree is NULL
        </div>
    );
}

    const allFiles = getAllFiles(tree);

    const filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    console.log("All Files:", allFiles);

    let rootFiles = tree.__files__ || [];

    if (!Array.isArray(rootFiles)) {
        rootFiles = Object.values(rootFiles);
    }

    const rootFolders = Object.keys(tree).filter(
        key => key !== "__files__"
    );

    return (

        <div
    style={{
        ...styles.box,
        background: theme.surface,
        color: theme.text,
        border: `1px solid ${theme.border}`
    }}
>

            <h2 style={{ marginBottom: "20px" }}>
                Repository Structure
            </h2>
            <input
    type="text"
    placeholder="🔍 Search files..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{
    ...styles.searchBox,
    background: theme.card,
    color: theme.text,
    border: `1px solid ${theme.border}`
}}
/>

{
    searchQuery.trim() !== "" ? (

        filteredFiles.length > 0 ? (

            filteredFiles.map(file => (

                <div
                    key={file.path}
                    onClick={async() => {
                        setSearchQuery("");
                        analyzeFile(file.path);
                        setSelectedFile(file.path);
                        
                    }}
                    style={{
    ...styles.file,
    color: theme.text,
    transition: "all .2s ease",
    ...(selectedFile === file.path
        ? {
            ...styles.selectedFile,
            background: theme.primary
        }
        : {})
}}
onMouseEnter={(e) => {

    if (selectedFile !== file.path) {
        e.currentTarget.style.background = theme.card;
    }

}}
onMouseLeave={(e) => {

    if (selectedFile !== file.path) {
        e.currentTarget.style.background = "transparent";
    }

}}

                >
                    📄 {file.name}
                </div>

            ))

        ) : (

            <div
    style={{
        color: theme.secondaryText,
        padding: "10px"
    }}
>
                No matching files found.
            </div>

        )

    ) : (

        <>

            {rootFiles.map(file => (

                <div
                    key={file.path}
                    onClick={async() => {
                        setSearchQuery("");
                        analyzeFile(file.path);
                        setSelectedFile(file.path);
                        
                    }}
                    style={{
    ...styles.file,
    color: theme.text,
    transition: "all .2s ease",
    ...(selectedFile === file.path
        ? {
            ...styles.selectedFile,
            background: theme.primary
        }
        : {})
}}
onMouseEnter={(e) => {

    if (selectedFile !== file.path) {
        e.currentTarget.style.background = theme.card;
    }

}}
onMouseLeave={(e) => {

    if (selectedFile !== file.path) {
        e.currentTarget.style.background = "transparent";
    }

}}          >
                    📄 {file.name}
                </div>

            ))}

            {rootFolders.map(folder => (

                <Folder
                    key={folder}
                    name={folder}
                    childrenTree={tree[folder]}
                    analyzeFile={analyzeFile}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    setSearchQuery={setSearchQuery}
                />

            ))}

        </>

    )
}

        </div>

    );

}

const styles = {

    box: {

        marginTop: "40px",

        background: "#1e293b",

        padding: "20px",

        borderRadius: "12px",

        width: "30%",

        minWidth: "300px",

        height: "700px",

        overflowY: "auto",

        color: "white",

        textAlign: "left"

    },

    folder: {

        cursor: "pointer",

        userSelect: "none",

        fontWeight: "600",

        padding: "6px",

        borderRadius: "6px"

    },

    file: {

        cursor: "pointer",

        padding: "7px 10px",

        borderRadius: "6px",

        marginTop: "4px",

        transition: "0.2s"

    },

    selectedFile: {

        background: "#2563eb",

        color: "white",

        fontWeight: "600"

    },
    searchBox: {

    width: "100%",

    padding: "10px",

    marginBottom: "20px",

    borderRadius: "8px",

    border: "1px solid #334155",

    background: "#0f172a",

    color: "white",

    outline: "none",

    fontSize: "14px"

},

};

export default FolderTree;