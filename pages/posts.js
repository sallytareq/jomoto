import Footer from '../components/footer'
import Header from '../components/header'
import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

const { BLOG_URL, CONTENT_API_KEY } = process.env

export async function getStaticProps(context) {

  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,published_at`
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

export default function Home({ posts }) {

  return (
    <div >
      <Header home={false} />
      <main className="single" >
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post,index) => (
              <tr dir="rtl">
                <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                  <td>{post.title}</td>
                </Link>
                <td>{new Date(Date.parse(post.published_at)).toDateString().split(/ (.*)/)[1]}</td>
              </tr>
            ))}
          </tbody>
        </Table>

      </main>
      <Footer />
    </div>
  )
}