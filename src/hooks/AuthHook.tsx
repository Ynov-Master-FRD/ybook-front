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
                if(err.name === 'UsernameExistsException') {
                    throw new Error('UsernameExistsException');
                }else{
                    
                }
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
    //second paramters is a callback function ( set state )
    const confirmationRegister = (code: string,  setResult: React.Dispatch<React.SetStateAction<string>>) => {
        if(!code || code.length === 0) {
            throw new Error('Code Requis');
        }
        if(cognitoUser) {
            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if(err) {
                    // if erreur 400, username already exist
                    if(err.name === 'UsernameExistsException') {
                        throw new Error('UsernameExistsException');
                    }else{
                        alert(err.message || JSON.stringify(err));
                    }
                    return null;
                }
                console.log('call result: ' + result);
                setResult(result);
            });
        }else{
            throw new Error('Action impossible, veuillez réessayer');
        }
    }

    const resendConfirmationCode = () => {
        cognitoUser.resendConfirmationCode(function(err, result){
            if (err){
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    }

    const login = (email: string, password: string) => {
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password,
        });
    }


    return { register, confirmationRegister, login };
}

