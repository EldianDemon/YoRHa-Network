import React from 'react';

const Posts = () => {
    const placeholderPosts = [
        {
            id: 1,
            username: 'John Doe',
            avatar: null,
            image: null,
            text: 'This is a sample post with some text. #React #Development',
        },
        {
            id: 2,
            username: 'Jane Smith',
            avatar: null,
            image: null,
            text: 'Another example post. Learning CSS is fun!',
        },
        {
            id: 3,
            username: 'Samurai Dev',
            avatar: null,
            image: null,
            text: 'Frontend development is a never-ending journey.',
        },
        {
            id: 4,
            username: 'Samurai Dev',
            avatar: null,
            image: null,
            text: 'Frontend development is a never-ending journey.',
        },
        {
            id: 5,
            username: 'Samurai Dev',
            avatar: null,
            image: null,
            text: 'Frontend development is a never-ending journey.',
        },
        {
            id: 6,
            username: 'Samurai Dev',
            avatar: null,
            image: null,
            text: 'Frontend development is a never-ending journey.',
        },
    ]

    return (
        <section className="posts">
            <ul className="posts__list">
                {placeholderPosts.map(post => (
                    <li key={post.id} className="posts__item">
                        <div className="posts__header">
                            <img src={post.avatar} alt="Avatar" className="posts__avatar" />
                            <span className="posts__username">{post.username}</span>
                        </div>
                        <p className="posts__text">{post.text}</p>
                        <img src={post.image} alt="Post" className="posts__image" />
                        <div className="posts__actions">
                            <button className="posts__like">Like</button>
                            <button className="posts__comment">Comment</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Posts
