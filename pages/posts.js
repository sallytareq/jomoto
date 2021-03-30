import Footer from '../components/footer'
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
    <div >
      <Header home={false} />
      <main >

      </main>
      <Footer />
    </div>
  )
}