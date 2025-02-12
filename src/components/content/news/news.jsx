import React from 'react'
import New from './new/new'

const News = () => {
    

    return (
        <section className='news'>
            {/* <ul className='news__list'>
                {news.map(el => (
                    <li key={el.id} className='news__item'>
                        <New {...el} />
                    </li>
                ))}
            </ul>
            {isFetching && <p>Загрузка...</p>} */}
        </section>
    )
}

export default News
