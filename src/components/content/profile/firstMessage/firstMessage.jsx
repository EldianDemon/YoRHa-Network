

const FirstMessage = (props) => {
    return (
        <div className='firstMessage'>
            <div className='firstMessage__form'>
                <div style={{display: 'flex', width: '100%', gap: 10}}>
                    <img src={props.avatar} alt="avatar" />
                    <h4 className='firstMessage__head'>{props.username}</h4>
                </div>
                <textarea name="message" className='firstMessage__message' />
                <button onClick={() => { }} className="btn firstMessage__btn">Send</button>
            </div>
        </div>
    )
}

export default FirstMessage