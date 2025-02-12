import React from 'react'
import placeholder from '../../../../img/avatars/placeholder2.jpg'
import wallpaper from '../../../../img/wallpapers/wallpaper.png'

const New = ({ title, body, name }) => {
    return (
        <article className='new'>
            <div className='new__top'>
                <img src={placeholder} alt="avatar" className='new__avatar' />
                <div className='new__top__container'>
                    <div className='new__top__nameContainer'>
                        {name ? <h4 className='new__top__name'>{name}</h4> : <h4 className='new__top__name'>Unknown</h4>}
                        <svg className='new__top__svg'>here svg will be</svg>
                    </div>
                    <span className='new__top__date'>post date</span>
                </div>
            </div>
            <h2 className='new__title'>{title}</h2>
            <div className='new__dscrContainer'>
                <img src={wallpaper} alt="newImg" className='new__img' />
                <p className='new__dscr'>{body}</p>
            </div>
            <ul className='new__btm__list'>
                <li className='new__btm__item'>
                    <button className='new__btm__btn'>
                        <svg className='new__btm__btn__svg '>likes:</svg>
                        <span className='new__btm__btn__count'>count</span>
                    </button>
                </li>
                <li className='new__btm__item'>
                    <button className='new__btm__btn'>
                        <svg className='new__btm__btn__svg '>comments</svg>
                        <span className='new__btm__btn__count'>count</span>
                    </button>
                </li>
                <li className='new__btm__item'>
                    <button className='new__btm__btn'>
                        <svg className='new__btm__btn__svg '>repost</svg>
                        <span className='new__btm__btn__count'>count</span>
                    </button>
                </li>
            </ul>
        </article>
    )
}

export default New