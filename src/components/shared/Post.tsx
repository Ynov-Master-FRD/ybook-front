import React from 'react';
// import Avatar from './Avatar';
import Like from './Like';
import Comment from './Comment';
import { Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';

interface PostProps {
    firstName : string,
    lastName: string,
    date:Date,
    content:string,
    nbLikes:number,
    nbComments:number,
    profilPicture:string
}

const Post = ({ firstName, lastName, date, content, nbLikes, nbComments, profilPicture}:PostProps) => {

    let printDate = "";

    const duration = new Date().getTime() - new Date(date).getTime();
    const durationInDays = Math.floor(duration / (1000 * 60 * 60 * 24));

    if(durationInDays<1){
        printDate = 'Aujourd\'hui';
    } else if (durationInDays>1 && durationInDays<2){
        printDate = 'Hier';
    } else if (durationInDays>=2 && durationInDays<7){
        printDate = durationInDays + ' jours';
    } else if(durationInDays>=7) {
        printDate = new Date(date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});

    }

    return (
        <Paper withBorder radius="md" className='py-3 px-6'>
        <Group>
          <Avatar src={profilPicture} radius="xl" />
          <div>
            <Text size="md">{firstName} {lastName}</Text>
            <Text size="sm" color="dimmed">
                {printDate}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className='mt-2 pl-14'>
          <div className='text-base' dangerouslySetInnerHTML={{__html: content}} />
        </TypographyStylesProvider>
      </Paper>
    )
}

export default Post;