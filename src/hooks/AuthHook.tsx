import { CognitoUserPool } from "amazon-cognito-identity-js";
import { useGlobalContext } from "../providers/GlobalProvider";

//hook useAuthToken

export const useAuthToken = () => {
    const { token } = useGlobalContext();
    return token;
};

export const useRegister(CognitoUserPool)

export const useLogin = () => {
    const { cognitoUser, setCognitoUser } = useGlobalContext();
    return cognitoUser;
}