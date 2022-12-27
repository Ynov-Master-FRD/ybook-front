import React from 'react';
import Avatar from './Avatar';
import Like from './Like';
import Comment from './Comment';

const Post = () => {
    return (
        <div className='flex flex-col'>
            <div className='py-3'>
                <Avatar size='medium'></Avatar>
            </div>
            <div className='p-6'>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illo, nobis modi beatae provident at excepturi recusandae iste nostrum adipisci, officiis laborum nulla ab. Culpa neque consequatur tenetur sed blanditiis?</p>
            </div>
            <div className='flex justify-between px-'>
                <div className='inline'>
                    <span>245 Likes</span>
                </div>
                <div>
                    <Like></Like>
                    <Comment></Comment>
                </div>
            </div>

            
            
        </div>
    )
}

export default Post;