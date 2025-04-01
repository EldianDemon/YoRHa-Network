import React, { useRef, useState } from 'react'
import avatarPlaceholder from '../../../../img/avatars/placeholder2.jpg'

const ProfileAvatar = (props) => {

    const [file, setFile] = useState(null)

    const inputFile = useRef(null)

    const onClickPhotoChange = () => {
        inputFile.current.click()
    }

    const handleFileChange = (event) => {
        if (event.target.files) setFile(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <div className='profile__avatar__container'>
            <button onClick={!props.isOwner ? onClickPhotoChange : () => alert('Вы не владелец')} className='profile__avatar__btn'>
                <img src={file ? file : (props.avatar || avatarPlaceholder)} alt="avatar" className='profile__avatar' />
                {!props.isOwner && <input type="file" onChange={handleFileChange} ref={inputFile} style={{ display: 'none' }} />}
            </button>
            {file && <button className='btn profile__avatar__sendBtn'>Send Photo</button>}
        </div>
    )
}

export default ProfileAvatar