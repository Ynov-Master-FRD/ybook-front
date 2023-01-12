import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import userPoolData from '../helpers/UserPool';
import { useGlobalContext } from "../providers/GlobalProvider";

//hook useAuthToken

export const useAuth = () => {
    const { cognitoUser } = useGlobalContext();
    const {setCognitoUser} = useGlobalContext();

    const register = (email: string, password: string, attributeList: AmazonCognitoIdentity.CognitoUserAttribute[]) => {
        userPoolData.signUp(email, password, attributeList, null as any, (err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            if(result) {
                const cognitoUser: AmazonCognitoIdentity.CognitoUser  = result.user;
                setCognitoUser(cognitoUser);
                console.log('user is ' + cognitoUser);
            }
        });
    }

    const confirmationRegister = (code: string) => {
        if(cognitoUser) {
            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if(err) {
                    alert(err.message || JSON.stringify(err));
                    return null;
                }
                console.log('call result: ' + result);
                return result;
            });
        }
    }

    const login = (email: string, password: string) => {
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password,
        });
    }


    return { register, confirmationRegister, login };
}

