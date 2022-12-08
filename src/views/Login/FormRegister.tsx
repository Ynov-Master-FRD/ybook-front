import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import React, { useState } from "react";

const FormRegister: React.FC = () => {

    // make table of refs for form 
    const formRegister = {
        email: React.createRef<HTMLInputElement>(),
        firstName: React.createRef<HTMLInputElement>(),
        lastName: React.createRef<HTMLInputElement>(),
        password: React.createRef<HTMLInputElement>()
    }

    const poolData = {
        UserPoolId: `${process.env.REACT_APP_AUTH_USER_POOL_ID}`,
        ClientId: `${process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID}` 
    }

    // attributeList type is CognitoUserAttribute[]
    const attributeList : AmazonCognitoIdentity.CognitoUserAttribute[]  = [];

    const dataEmail = {
        Name: 'email',
        Value: ''
    };

    const dataFirstName = {
        Name: 'given_name',
        Value: ''
    };

    const dataLastName = {
        Name: 'name',
        Value: ''
    };

    const dataPassword = {
        Name: 'password',
        Value: ''
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formRegister);
        dataEmail.Value = formRegister.email.current?.value as string;
        dataFirstName.Value = formRegister.firstName.current?.value as string;
        dataLastName.Value = formRegister.lastName.current?.value as string;
        // dataPassword.Value = formRegister.password.current?.value as string;
        
        const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        const attributeFirstName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFirstName);
        const attributeLastName = new AmazonCognitoIdentity.CognitoUserAttribute(dataLastName);
        // const attributePassword = new AmazonCognitoIdentity.CognitoUserAttribute(dataPassword);

        attributeList.push(attributeEmail);
        attributeList.push(attributeFirstName);
        attributeList.push(attributeLastName);
        // attributeList.push(attributePassword);

        userPool.signUp(formRegister.email.current?.value as string, formRegister.password.current?.value as string, attributeList, null as any, (err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            if(result) {
                const cognitoUser: AmazonCognitoIdentity.CognitoUser  = result.user;
                console.log('user name is ' + cognitoUser.getUsername());
            }
        });
    }

    return (
        <div className='w-[60%] flex flex-col items-center'>
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input ref={formRegister.email}  type="email" name="email" id="email" className="border border-gray-300 rounded-md p-2" />
                
                <label htmlFor="firstName">First Name</label>
                <input ref={formRegister.firstName} type="text" name="firstName" id="firstName" className="border border-gray-300 rounded-md p-2" />
                
                <label htmlFor="lastName">Last Name</label>
                <input ref={formRegister.lastName} type="text" name="lastName" id="lastName" className="border border-gray-300 rounded-md p-2" />
                
                <label htmlFor="password">Password</label>
                <input ref={formRegister.password} type="password" name="password" id="password" className="border border-gray-300 rounded-md p-2" />
                
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Créer</button>
            </form>
        </div>
    );
}

export default FormRegister