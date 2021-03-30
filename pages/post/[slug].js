import { useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import Skeleton from '@material-ui/lab/Skeleton';
import Footer from '../../components/footer'
import Header from '../../components/header'
// import DisqusComments from '../components/disqus'

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

  return false ? (
    <div>
      <Head>
        <title>JoMoto</title>
        <link rel="icon" href="/icon1.ico" />
      </Head>
      <Header />

      <div dir="rtl" className="single">
        <div className="single__content">
          <h1> {post[0].title} </h1>
          <div dangerouslySetInnerHTML={{ __html: post[0].html }}></div>
        </div>
        <img src={post[0].feature_image} className="single__img"></img>
      </div>

      <Footer />

      {/* <DisqusComments post={post[0]} /> */}

    </div >
  ) : (
    <>
      <Head>
        <title>JoMoto</title>
        <link rel="icon" href="/icon1.ico" />
      </Head>
      <Header />
      <div dir="rtl" className="single">
        <div className="single__content">
          <h1> <Skeleton variant="text" /></h1>
          <div>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        </div>
        <Skeleton variant="rect" width={350} height={350} className="single__img" />
      </div>
      <Footer />
    </>
  )
}


export default Post
