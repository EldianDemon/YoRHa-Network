import { useDispatch } from 'react-redux'
import { logout } from '../../../../reducers/authReducer.ts'

const Main = (props) => {

    const dispatch = useDispatch()

    return (
        <section className='main'>
            <div className='main__customize'>
                    //Profile avatar, name, and status
            </div>
            <div className='main__security'>
            //Change password, phone etc...
                <ul className='main__security__list'>
                    <li className='main__security__item'>

                    </li>
                </ul>
            </div>
            <div className='main__devices'>
            //history of devices user was logged in
                <ul className='main__devices__list'>
                    <li className='main__devices__item'>
                            //device 1, what device, date, location
                    </li>
                    <li className='main__devices__item'>
                            //device 2, what device, date, location
                    </li>
                </ul>
            </div>
            <button onClick={() => { dispatch(logout()) }} className='btn main__btn'>
                Logout
            </button>
        </section>
    )
}

export default Main