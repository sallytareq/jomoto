import Footer from '../components/footer'
import Header from '../components/header'
import ControlledCarousel from '../components/carousel'
import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
const { BLOG_URL, CONTENT_API_KEY } = process.env

export async function getStaticProps(context) {

  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,published_at,feature_image`
  )

  const data = await res.json()
  const posts = data.posts
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
    props: { posts },
    revalidate: 10,
  }
}

export default function Home({ posts }) {

  return (
    <div >
      <Header home={false} />
      <main className="directory" dir="rtl">
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Published</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr>
                <td>{new Date(Date.parse(post.published_at)).toDateString().split(/ (.*)/)[1]}</td>
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <td>{post.title}</td>
                </Link>
              </tr>
            ))}
          </tbody>
        </Table>
        <ControlledCarousel posts={posts} />
      </main>
      <Footer />
    </div>
  )
}