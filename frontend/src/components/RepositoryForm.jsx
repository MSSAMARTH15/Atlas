import { useTheme } from "../context/ThemeContext";

function RepositoryForm({
    

    githubUrl,

    setGithubUrl,

    analyzeRepository,

    loading

}){
    const { theme } = useTheme();
    return(

        <>

        <input

        type="text"

        placeholder="Paste GitHub Repository URL..."

        value={githubUrl}

        onChange={(e)=>setGithubUrl(e.target.value)}

        style={{
    ...styles.input,
    background: theme.surface,
    color: theme.text,
    border: `1px solid ${theme.border}`
}}

        />

        <button
    onClick={analyzeRepository}
    style={styles.button}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(37,99,235,0.35)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
    }}
>

        {loading ? "Analyzing..." : "Analyze Repository"}

        </button>

        </>

    )

}

const styles={

    input:{

        width:"500px",

        padding:"14px",

        fontSize:"16px",

        borderRadius:"8px",

        marginTop:"20px"

    },

    button:{

        marginTop:"20px",

        padding:"14px 40px",

        fontSize:"16px",

        borderRadius:"8px",

        cursor:"pointer",

        transition: "all 0.25s ease",

        fontWeight: "600"

    }

}

export default RepositoryForm;