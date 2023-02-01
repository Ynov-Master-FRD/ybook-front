import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ModalConfirmation from '../../components/modalConfirmation';
import { useAuth } from '../../hooks/AuthHook';

const FormRegister: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [validationOk, setValidationOk] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const { register } = useAuth();
    const navigate  = useNavigate();
    
    const callbackValidation = ()=>{
        navigate('/login');
    }
    
    useEffect(() => {
        console.log('use effect form register');
        
    },[result])

    // make table of refs for form 
    const formRegister = {
        email: React.createRef<HTMLInputElement>(),
        firstName: React.createRef<HTMLInputElement>(),
        lastName: React.createRef<HTMLInputElement>(),
        password: React.createRef<HTMLInputElement>()
    };

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

        try {
            register(formRegister.email.current?.value as string, formRegister.password.current?.value as string, attributeList)
        } catch (error) {
            console.log(error);
            console.log('ttt');
            
        }
        setShowModal(true);

    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen '>
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
            <button onClick={()=>setShowModal(true) }>modal</button>
            {
                showModal ? <ModalConfirmation callbackValidation={setResult}/> : null
            }
        </div>
    );
}

export default FormRegister
