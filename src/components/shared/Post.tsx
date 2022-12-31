import React from 'react';
import Avatar from './Avatar';
import Like from './Like';
import Comment from './Comment';

interface childrenProps {
    firstName: string,
    lastName: string,
    date: string,
    content: string,
    likes: number,
    comments: number,
}


const Post = (children:childrenProps) => {

    let printDate = "";

    const duration = new Date().getTime() - new Date(children.date).getTime();
    const durationInDays = Math.floor(duration / (1000 * 60 * 60 * 24));

    if(durationInDays<1){
        printDate = 'Aujourd\'hui';
    } else if (durationInDays>1 && durationInDays<2){
        printDate = 'Hier';
    } else if (durationInDays>2 && durationInDays<7){
        printDate = durationInDays + ' jours';
    } else if(durationInDays>7) {
        printDate = new Date(children.date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'});

    }

    return (
        <div className='flex flex-col p-4 border-y bg-grey'>
            <div className='flex'>
                <Avatar size='medium'></Avatar>
                <div className='flex flex-col ml-2'>
                    <span className="font-bold">{children.firstName} {children.lastName}</span>
                    <span className='leading-3 text-sm'>{printDate}</span>
                </div>
            </div>
            <div className='py-1'>
                <p>{children.content}.</p>
            </div>
            <div className='flex items-center gap-4'>
                    <span className='flex'>{children.likes} <Like></Like></span>
                    <span className='flex'>{children.comments} <Comment></Comment></span>
            </div>
        </div>
    )
}

export default Post;