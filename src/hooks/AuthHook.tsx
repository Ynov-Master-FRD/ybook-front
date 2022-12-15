import { useGlobalContext } from "../providers/GlobalProvider";

//hook useAuthToken

export const useAuthToken = () => {
    const { token } = useGlobalContext();
    return token;
};

export const useCognitoUser = () => {
    const { cognitoUser } = useGlobalContext();
    return cognitoUser;
}