import { useTheme } from "../context/ThemeContext";
function MetricCard({ title, value }) {
    const { theme } = useTheme();
    return (

        <div
    style={{
        ...styles.card,
        background: theme.surface,
        color: theme.text,
        border: `1px solid ${theme.border}`
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.18)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.12)";
    }}
>

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

}

const styles = {

    card: {

        background: "#1e293b",

        color: "white",

        borderRadius: "12px",

        width: "180px",

        padding: "25px",

        textAlign: "center",

        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",

        transition: "all 0.25s ease"

    }

};

export default MetricCard;