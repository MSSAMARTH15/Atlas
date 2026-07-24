function MainWorkspace({ children }) {

    return (

        <div style={styles.container}>

            {children}

        </div>

    );

}

const styles = {

    container: {

        display: "flex",

        width: "95%",

        marginTop: "40px",

        gap: "20px",

        alignItems: "flex-start"

    }

};

export default MainWorkspace;