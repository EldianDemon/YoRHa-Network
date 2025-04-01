import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProfileSkeleton = React.memo((props) => {

    console.log('render profileSkeleton')

    return (
        <div>
            <SkeletonTheme baseColor='#404040' highlightColor='#444'>
                <div className='profileSkeleton__container'>
                    <div className='profileSkeleton__img'>
                        <Skeleton borderRadius={15} width={72} height={72} />
                    </div>
                    <div className='profileSkeleton__h2'>
                        <Skeleton width={100} height={20} />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    )
})

export default ProfileSkeleton