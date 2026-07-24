import { useEffect } from "react";

function AssistantModal({ isOpen, onClose, children }) {
    useEffect(() => {
        function handleEscape(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            style={styles.backdrop}
            onClick={onClose}
        >
            <div
                style={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={styles.header}>
                    <div>
                        <h2 style={{ margin: 0 }}>
                            🤖 Atlas Repository Assistant
                        </h2>

                        <p
                            style={{
                                margin: "6px 0 0",
                                color: "#94a3b8",
                                fontSize: "14px"
                            }}
                        >
                            Ask anything about the repository.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        style={styles.closeButton}
                    >
                        ✕
                    </button>
                </div>

                <div style={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const styles = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
    },

    modal: {
        width: "90%",
        maxWidth: "1100px",
        height: "85vh",
        background: "#0f172a",
        borderRadius: "18px",
        border: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,.45)"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 25px",
        borderBottom: "1px solid #334155"
    },

    body: {
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "20px"
    },

    closeButton: {
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        fontSize: "18px",
        background: "#1e293b",
        color: "white",
        transition: "0.2s"
    }
};

export default AssistantModal;