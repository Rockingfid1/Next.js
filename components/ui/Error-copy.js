export default function Error({ title, message }) {
  return (
    <div
      style={{
        width: "100vh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -150,
        marginLeft: -152.5,
      }}
    >
      <p style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        {title}
      </p>
      <p
        style={{
          fontSize: 16,
          fontWeight: "semibold",
          color: "black",
          whiteSpace: "pre-wrap",
          width: "60%",
        }}
      >
        {message}
      </p>
    </div>
  );
}
