import React from 'react';
import Link from 'next/link'
function SinglePostWide(props) {

    return (
        <div className="post__wide__container" dir="rtl">
            <Link href="/post/[slug]" as={`/post/${props.post.slug}`}>
                <img src={props.post.feature_image} className="post__wide__img" />
            </Link>
            <div className="post__wide__info">
                <Link href="/post/[slug]" as={`/post/${props.post.slug}`}>
                    <h2>{props.post.title}</h2>
                </Link>
                <p>{props.post.custom_excerpt}</p>
            </div>
        </div>
    )
}

export default SinglePostWide