import Footer from '../components/footer'
import Header from '../components/header'
const { BLOG_URL, CONTENT_API_KEY } = process.env
import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';


export async function getStaticProps(context) {

  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,created_at`
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
  const data = []
  posts.map((post, index) => (
    data.push({id: index, article: posts.title , date: new Date(Date.parse( posts.created_at)).toDateString()})
  ))
  console.log(posts.created_at);
  // const rows: GridRowsProp = [
  //   { id: 1, article: 'Hello', date: 'World' },
  // ];
  
  // const columns: GridColDef[] = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];
  
  return (
    <div >
      <Header home={false} />
      <main >

      </main>
      <Footer />
    </div>
  )
}