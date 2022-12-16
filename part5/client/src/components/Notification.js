export const Notificiation = ({ message, type }) => {
    const styles = {
        border: `3px solid ${type === "error" ? "red" : "green"}`,
        margin: "auto",
        width: "50vw",
        backgroundColor: "#ccc",
        padding: 8
    }

    return (
        <div style={styles}>
            <h3>{message}</h3>
        </div>
    )
}
