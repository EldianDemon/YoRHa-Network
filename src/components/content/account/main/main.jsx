import React from 'react'

const Main = (props) => {
    return (
        <section className='main'>
            <div>
                    //Profile avatar, name, and status
            </div>
            <ul>
                        //Change password, phone etc...
                <li>

                </li>
            </ul>
            <ul>
                        //history of devices user was logged in
                <li>
                            //device 1, what device, date, location
                </li>
                <li>
                            //device 2, what device, date, location
                </li>
            </ul>
            <button onClick={() => {props.logout()}} className='btn'>
                Logout
            </button>
        </section>
    )
}

export default Main