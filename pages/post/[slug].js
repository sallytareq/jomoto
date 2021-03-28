import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import DisqusComments from '../components/disqus'
import styles from '../../styles/Home.module.css'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

export const getStaticPaths = async () => {

  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${params.slug}/?key=${CONTENT_API_KEY}&fields=title,slug,html,feature_image,`
  );

  const data = await res.json();
  const post = data.posts;
  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { post },
    revalidate: 10,
  }
}


function Post({ post }) {

  const [enableLoadComments, setEnableLoadComments] = useState(true)

  const router = useRouter();

  function loadComments() {
    setEnableLoadComments(false)
  }

  return !router.isFallback ? (
    <div className={styles.container}>
      <Head>
        <title>JoMoto</title>
        <link rel="icon" href="/icon1.ico" />
      </Head>

      <Link href="/"><a>Home</a></Link>

      <div dir="rtl">
        <img src={post[0].feature_image} className></img>
        <h1> {post[0].title} </h1>
        <div dangerouslySetInnerHTML={{ __html: post[0].html }}></div>
      </div>



      {/* <DisqusComments post={post[0]} /> */}

    </div >
  ) : (
    <h1>Loading..</h1>
  )
}


export default Post
