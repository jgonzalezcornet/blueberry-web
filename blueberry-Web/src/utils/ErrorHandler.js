import { useStore } from "../stores/app";

const ErrorHandler = ({ status, message }) => {
  const store = useStore();
  store.setError({ status, message });
};

export default ErrorHandler;