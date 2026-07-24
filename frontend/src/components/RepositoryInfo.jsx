import { useTheme } from "../context/ThemeContext";

function RepositoryInfo({ result, openAssistant }) {
    const { theme } = useTheme();

    if (!result) return null;

    return (
        <div
            style={{
                ...styles.box,
                background: theme.surface,
                color: theme.text,
                border: `1px solid ${theme.border}`,
                width: "95%",
                maxWidth: "1700px",
                marginTop: "20px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >
                <h2 style={{ margin: 0 }}>📦 Repository Information</h2>

                <button
                    onClick={openAssistant}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "15px"
                    }}
                >
                    🤖 Atlas Assistant
                </button>
            </div>

            <div style={styles.grid}>
                <div>
                    <p><b>Repository:</b></p>
                    <p>{result.repository_name}</p>
                </div>

                <div>
                    <p><b>Primary Language:</b></p>
                    <p>{result.primary_language}</p>
                </div>

                <div>
                    <p><b>Framework:</b></p>
                    <p>{result.framework}</p>
                </div>

                <div>
                    <p><b>Package Manager:</b></p>
                    <p>{result.package_manager}</p>
                </div>

                <div>
                    <p><b>Build System:</b></p>
                    <p>{result.build_system}</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    box: {
        padding: "24px",
        borderRadius: "12px",
        boxSizing: "border-box"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "10px"
    }
};

export default RepositoryInfo;