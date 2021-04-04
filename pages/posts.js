import Footer from '../components/footer'
import Header from '../components/header'
import ControlledCarousel from '../components/carousel'
import React from 'react';
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import SearchIcon from '@material-ui/icons/Search';
import Button from 'react-bootstrap/Button'
import { useEffect } from 'react'
import { useState } from 'react';
const { BLOG_URL, CONTENT_API_KEY } = process.env


export async function getServerSideProps(context) {

  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,published_at,feature_image&include=tags`
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
  }
}

export default function Home({ posts }) {
  const [formData, setFormData] = useState();
  const [submitted, setSubmitted] = useState(false);
  const allPosts = {posts}.posts;
  let results = [];
  const handleChange = event => {
    setSubmitted(false);
    setFormData(event.target.value);
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    // results = [];
    
    allPosts.forEach(post => {
      let exists = false;
      post.tags.forEach(tag => {
        if (tag.name.includes(formData)){
          exists = true
        }
      });
      if (exists){
        results.push(post)
      }
    });
    
    setSubmitted(true)
    console.log(results)
  }
  
  if(submitted){console.log("HELLOOOOOOOOOOOO",results)}

  return (
    <div >
      <Header home={false} />
      <main className="directory" dir="rtl">
        <form onSubmit={handleSubmit}>
          <input id="search" name="search" type="text" placeholder="بحث" onChange={handleChange} />
          <Button variant="dark" type="submit">
            <SearchIcon />
          </Button>
        </form>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Published</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { !submitted?
              posts.map((post, index) => (
                <tr key={index}>
                  <td>{new Date(Date.parse(post.published_at)).toDateString().split(/ (.*)/)[1]}</td>
                  <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                    <td>{post.title}</td>
                  </Link>
                </tr>
              ))
              :
              (results? 
              results.map((post, index) => (
                <tr key={index}>
                  <td>{new Date(Date.parse(post.published_at)).toDateString().split(/ (.*)/)[1]}</td>
                  <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                    <td>{post.title}</td>
                  </Link>
                </tr>
              ))
              :
              <tr><td>No results found</td></tr>
              )
            }
          </tbody>
        </Table>
        <ControlledCarousel posts={posts} />
      </main>
      <Footer />
    </div>
  )
}