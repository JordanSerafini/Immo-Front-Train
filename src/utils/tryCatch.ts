// Library
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Typescript
interface TryCatchProps {
    APIRequest: AxiosResponse<unknown, unknown>,
    errContent: string,
}

export default  function tryCatch({APIRequest, errContent}: TryCatchProps){
    try {
        const response = APIRequest;
  
        return response;
      } catch (error) {
        toast.error(
            errContent,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
  
        toast.info(`${error}`, { position: toast.POSITION.BOTTOM_RIGHT });
  
        throw error;
      }
}