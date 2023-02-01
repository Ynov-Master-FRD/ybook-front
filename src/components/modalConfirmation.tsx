import React, { useState } from "react";
import { Button, Dialog, Stack, Text, TextInput, Modal } from "@mantine/core";

import { useAuth } from "../hooks/AuthHook";

interface ModalConfirmationProps {
    callbackValidation: React.Dispatch<React.SetStateAction<string>>;
}

const ModalConfirmation : React.FC<ModalConfirmationProps> = (props) => {
    const [opened, setOpened] = useState(true);
    const formConfirmation = {
        confirmationCode: React.createRef<HTMLInputElement>()
    };

    const { confirmationRegister } = useAuth();
    const [error, setError] = useState<string | null>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const result = confirmationRegister(formConfirmation.confirmationCode.current?.value as string, props.callbackValidation);
            if(result != null) {
                setOpened(false);
            }else{
                setError("Code de confirmation incorrect");
            }
        } catch (error ) {
            console.log(error);
        }
        
    }

    return(
        <Modal 
            opened={opened}
            withCloseButton
            size="md"
            radius="md"
            overlayOpacity={0.55}
            overlayBlur={3}
            onClose={() => setOpened(false)}
            centered
        >
            <form onSubmit={handleSubmit}>
            <Stack align="center" >
                <Text ta="center" weight={700} color="red">{error}</Text>
                <TextInput
                    label="Code confirmation"
                    description="Une majuscule, un nombre un caractère, 8 caractères minimum"
                    radius="lg"
                    withAsterisk
                    ref={formConfirmation.confirmationCode}
                />
                <Button radius="md">
                    Confirmer
                </Button>
            </Stack>

            </form>


        </Modal>
    )
}

export default ModalConfirmation;