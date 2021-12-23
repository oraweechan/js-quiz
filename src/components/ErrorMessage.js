
const ErrorMessage = ({ children }) => { 
    return (
      <div
         style={{
           width: "100%",
           padding: 5,
           borderRadius: 4,
           margin:5,
           marginTop: 20,
           backgroundColor: "orangered",
           textAlign: "center",
           color: "white",
           textTransform: "capitalize",
         }}
         >
         {children}
      </div>
    );
  };
  export default ErrorMessage;