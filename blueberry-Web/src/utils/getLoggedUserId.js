import { useStore } from "../stores/app";
import ErrorHandler from "./ErrorHandler";

const getLoggedUserId = () => {
  const store = useStore();
  const response = store.getLoggedUser();
  if(!response.ok){
    ErrorHandler({ status: 400, message: response.message });
    return;
  }
  return response.data;
}

export default getLoggedUserId;