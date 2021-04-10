import React from 'react';
import Link from 'next/link'
function FeaturePost(props) {

    return (
        <div className="featurePost__container" dir="rtl">
            <Link href="/post/[slug]" as={`/post/${props.post.slug}`}>
                <img src={props.post.feature_image} className="featurePost__img" />
            </Link>
            <div className="featurePost__info">
                <hr className='feature__line'/>
                <Link href="/post/[slug]" as={`/post/${props.post.slug}`}>
                    <h2>{props.post.title}</h2>
                </Link>
                <div className="featurePost__text" dangerouslySetInnerHTML={{ __html: props.post.html }}></div><span>...</span>
            </div>
        </div>
    )
}

export default FeaturePost