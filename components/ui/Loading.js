import classes from "./Loading.module.css";
export default function Loading() {
  return (
    <div
      className={classes.animation}
      style={{
        position: "fixed",
        top: "10%",
        left: "75%",
        backgroundColor: "#7e062e",
        minWidth: "20%",
        maxWidth: "35%",
        height: "7%",
        minHeight: "6%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
      }}
    >
      <p
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Loading...
      </p>
    </div>
  );
}
