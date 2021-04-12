import { useEffect } from 'react'
import { useState } from 'react'

import Footer from '../components/footer'
import SinglePost from '../components/post'
import FeaturePost from '../components/featurePost'
import SinglePostWide from '../components/postWide'
import Header, { windowSize } from '../components/header'

import styles from '../styles/Home.module.css'

const { BLOG_URL, CONTENT_API_KEY } = process.env

export async function getStaticProps(context) {

  // Ghost API fetch of the 6 most recent posts
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&limit=6&fields=title,slug,custom_excerpt,feature_image,html`
  )

  const data = await res.json()
  const posts = data.posts
  // select feature post
  const feature = posts.shift()

  if (!posts) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { posts, feature },
    revalidate: 10,
  }
}

export default function Home(props) {

  const [mobile, setMobile] = useState(false);

  // Window size response 
  useEffect(() => { setMobile(windowSize()) }, []);
  useEffect(() => { window.addEventListener("resize", () => setMobile(windowSize(1345))) }, []);

  return (
    <div className='page__container'>
      <Header home={true} />
      <main className={styles.main}>

        {/* <h1 className={styles.title}>JoMoto Blog</h1> */}
        {!mobile ? (<><FeaturePost post={props.feature} /><hr className='home__line' /></>) : <></>}
        {!mobile ?
          (<div className="post">
            <SinglePost post={props.posts[0]} />
            <SinglePost post={props.posts[1]} />
            <SinglePost post={props.posts[2]} />
            <hr className='home__line' />
            <SinglePostWide post={props.posts[3]} />
            <SinglePostWide post={props.posts[4]} />
          </div>)
          :
          (<div className="post">
            <SinglePost post={props.feature} />
            <SinglePost post={props.posts[0]} />
            <hr className='home__line' />
            <SinglePost post={props.posts[1]} />
            <SinglePost post={props.posts[2]} />
            <hr className='home__line' />
            <SinglePost post={props.posts[3]} />
            <SinglePost post={props.posts[4]} />
          </div>)
        }
      </main>
      <Footer />
    </div>
  )
}
