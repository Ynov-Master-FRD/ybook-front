// import Avatar from './Avatar';
import Like from './Like';
import Comment from './Comment';
import { Text, Avatar, Group, TypographyStylesProvider, Paper, Menu, ActionIcon } from '@mantine/core';
import { IconTrash, IconAlertCircle, IconThumbUp, IconMessageCircle } from '@tabler/icons';
import { useDatePublish } from '../../hooks/useDatePublish';
import { useLikeButton } from '../../hooks/useLike';
import apiBack from '../../utils/axios-api';
import { useState } from 'react';

interface PostProps {
    id: number,
    firstName : string,
    lastName: string,
    date:Date,
    content:string,
    nbLikes:number,
    nbComments:number,
    profilPicture:string
}

const Post = ({ id, firstName, lastName, date, content, nbLikes, nbComments, profilPicture}:PostProps) => {

    const printDate = useDatePublish(date);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
      apiBack.post(`/post/like/${id}`, {
        userId: 18
      })
      .then((response) => {
          console.log(response);
          setIsLiked(!isLiked);
      }, (error) => {
          console.log(error);
      });
    }

    const handleComment = () => {
        console.log('comment');
    }

    return (
      <div>
          <Paper withBorder radius="lg" className='py-3 px-6'>
          <Group position="apart">
              <div className='flex no-wrap gap-3'>
                <Avatar src={profilPicture} radius="xl" />
                <div>
                  <Text size="md">{firstName} {lastName}</Text>
                  <Text size="sm" color="dimmed">
                      {printDate}
                  </Text>
                </div>
              </div>
              <Menu shadow="md" width={200} position="left" withArrow arrowPosition="center" transition="rotate-right" transitionDuration={150}>
                <Menu.Target>
                  <ActionIcon size="md" variant="transparent" ><IconTrash size={18} /></ActionIcon>
                  
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item color="red" icon={<IconAlertCircle size={14} />}>Are you sure ?</Menu.Item>
                </Menu.Dropdown>
              </Menu>
          </Group>
          <TypographyStylesProvider className='mt-4'>
            <div className='text-base' dangerouslySetInnerHTML={{__html: content}} />
          </TypographyStylesProvider>
          <hr />
        <div className='flex items-center gap-4 mt-1'>
          <span className='flex'>{nbLikes} 
          {isLiked ?
          <ActionIcon onClick={handleLike} color="green" variant="transparent"><IconThumbUp size={24} /></ActionIcon>:
          <ActionIcon onClick={handleLike} color="dark" variant="transparent"><IconThumbUp size={24} /></ActionIcon>
          }
          </span>
          <span className='flex'>{nbComments} <ActionIcon onClick={handleComment} color="dark" variant="transparent"><IconMessageCircle size={24} /></ActionIcon></span>
        </div>
        </Paper>
      </div>
    )
}

export default Post;