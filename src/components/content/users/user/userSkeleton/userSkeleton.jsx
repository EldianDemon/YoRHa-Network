import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserSkeleton = (props) => {

    return (
        <ul>
            {Array.from({ length: props.iterations ? props.iterations : 1 }).map((_, index) => (
                <li key={index}>
                    <SkeletonTheme baseColor='#404040' highlightColor='#444'>
                        <div className='userSkeleton__container'>
                            <div className='userSkeleton__img'>
                                <Skeleton borderRadius={15} width={72} height={72} />
                            </div>
                            <div className='userSkeleton__h2'>
                                <Skeleton width={100} height={20} />
                            </div>
                        </div>
                    </SkeletonTheme>
                </li>
            ))}
        </ul>
    )
}

export default UserSkeleton