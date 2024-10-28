import { useStore } from "../stores/app";

const SuccessHandler = ({ message }) => {
  const store = useStore();
  store.setSuccess({ message });
};

export default SuccessHandler;