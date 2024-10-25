const ErrorHandler = ({ status, message }) => {
  alert("ERROR " + status + ": " + message);
  return;
};

export default ErrorHandler;