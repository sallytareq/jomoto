import Footer from '../components/footer'
import styles from '../styles/Home.module.css'
import SinglePost from '../components/post'
import FeaturePost from '../components/featurePost'
import Header from '../components/header'
const { BLOG_URL, CONTENT_API_KEY } = process.env

export async function getStaticProps(context) {

  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&limit=7&fields=title,slug,custom_excerpt,feature_image,html`
  )

  const data = await res.json()
  const posts = data.posts
  const feature = posts.shift()
  // console.log(posts)

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
  return (
    <div className={styles.container}>
      <Header home={true} />
      <main className={styles.main}>

        <h1 className={styles.title}>JoMoto Blog</h1>
        <FeaturePost post={props.feature} />
        <div className="post">
          {props.posts.map((post, index) => (
            <SinglePost post={post} key={index} />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  )
}
