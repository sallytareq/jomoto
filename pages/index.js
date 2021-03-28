import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

const { BLOG_URL, CONTENT_API_KEY } = process.env

export async function getStaticProps(context) {
  
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  )
  
  const data = await res.json()
  const posts = data.posts
  
  console.log(posts)
  
  if (!posts) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { posts },
    revalidate: 10,
  }
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>JoMoto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>JoMoto Blog</h1>

        <ul dir="rtl">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
