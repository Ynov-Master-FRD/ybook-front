import React, { useState } from "react";
import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";

import { useAuth } from "../hooks/AuthHook";


const ModalConfirmation: React.FC = () => {
    const [opened, setOpened] = useState(true);
    const formConfirmation = {
        confirmationCode: React.createRef<HTMLInputElement>()
    };
    // const { confirmationRegister } = useAuth();

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     confirmationRegister(formConfirmation.confirmationCode.current?.value as string);
    // }

    return(
        <Dialog 
            
            opened={opened}
            withCloseButton
            size="md"
            radius="md"
            onClose={() => setOpened(false)}
        >
            <Text size="md" weight={500} align="center">Code de confirmation</Text>
            <Group align="flex-end">
                <TextInput placeholder="Code de confirmation" ref={formConfirmation.confirmationCode} />
                <Button onClick={() => setOpened(false)}>Confirmer</Button>
            </Group>


        </Dialog>
    )
}

export default ModalConfirmation;