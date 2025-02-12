import React from 'react'
import MainContainer from './main/mainContainer'

const Account = () => {
    return (
        <div className='account'>
            <div className='container account__container'>
                <nav>
                    <ul>
                        //Selection, selected must apear at right side
                        <li>
                            Main
                        </li>
                        <li>
                            Personal data
                        </li>
                        <li>
                            Safety
                        </li>
                        <li>
                            etc...
                        </li>
                    </ul>
                    <button>
                        Back to YoRHa
                    </button>
                </nav>
                <MainContainer />
            </div>
        </div>
    )
}

export default Account