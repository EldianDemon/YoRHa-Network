import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const Nav = ({sort, byFriends, setSort, setByFriends}) => {


    const [isNavOnScreen, setNavOnScreen] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setNavOnScreen(entry.isIntersecting);
            },
            { threshold: 0.5 }
        )

        if (navRef.current) {
            observer.observe(navRef.current); // Начинаем наблюдать за элементом
        }

        // Очистка при размонтировании
        return () => {
            if (navRef.current) {
                observer.unobserve(navRef.current);
            }
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <nav className='users__nav'>
            <ul className='users__nav__list'>
                <li className='users__nav__item'>
                    <button ref={navRef} onClick={() => { setSort('important') }} className={sort === 'important' ? 'btn users__nav__btn btn_active' : 'btn users__nav__btn'}>
                        Важные
                    </button>
                </li>
                <li className='users__nav__item'>
                    <button onClick={() => { setSort('name') }} className={sort === 'name' ? 'btn users__nav__btn btn_active' : 'btn users__nav__btn'}>
                        Имя
                    </button>
                </li>
            </ul>
            <ul className='users__nav__list'>
                <li className='users__nav__item'>
                    <button onClick={() => { setByFriends(!byFriends) }} className={byFriends ? 'btn users__nav__btn btn_active' : 'btn users__nav__btn'}>
                        Друзья
                    </button>
                </li>
            </ul>
            {!isNavOnScreen &&
                <button onClick={scrollToTop} className='users__nav__top'>
                    on top
                </button>
            }
        </nav>
    )
}

export default Nav