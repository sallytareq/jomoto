import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import Footer from '../components/footer';
import SinglePost from '../components/post';
import SinglePostWide from '../components/postWide';
import Header, { windowSize } from '../components/header';
import { formatMs } from '@material-ui/core';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

let results = [];

export async function getServerSideProps() {
  // Ghost API fetch all posts
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&limit=all&fields=title,slug,published_at,feature_image,custom_excerpt&include=tags`,
  );
  const data = await res.json();
  const totalPosts = data.meta.pagination.total;
  const { posts } = data;

  if (!posts) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { posts, totalPosts },
  };
}

export default function Home({ posts, totalPosts }) {
  const numberOfPostsPerPage = 6;
  const [formData, setFormData] = useState();
  const [mobile, setMobile] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [postsInPage, setPostsInPage] = useState([]);
  const [inputChange, setInputChange] = useState(false);
  const [resultExists, setResultExists] = useState(false);
  const pages = new Array(Math.ceil(totalPosts / numberOfPostsPerPage)).fill(0);

  let allPosts = { posts }.posts;
  let allPostsCopy = [... { posts }.posts];

  allPostsCopy = allPostsCopy.splice(0, numberOfPostsPerPage);
  useEffect(() => { setPostsInPage(allPostsCopy); }, []);

  // handle pagination
  const pageNum = (event) => {
    event.preventDefault()
    window.scrollTo(0, 0)

    let end;
    let start;
    let num = event.target.page.value
    allPostsCopy = [... { posts }.posts];

    if (num * numberOfPostsPerPage <= totalPosts) {
      start = num * numberOfPostsPerPage - numberOfPostsPerPage;

      if (start + (numberOfPostsPerPage - 1) < totalPosts) {
        end = numberOfPostsPerPage
      } else {
        end = totalPosts
      }
      allPostsCopy = allPostsCopy.splice(start, end)
    } else {
      allPostsCopy = allPostsCopy.splice(totalPosts - ((num) * numberOfPostsPerPage), totalPosts)
    }
    setPostsInPage(allPostsCopy);
  }

  // Window size response
  useEffect(() => { setMobile(windowSize(1040)); }, []);
  useEffect(() => { window.addEventListener('resize', () => setMobile(windowSize(1040))); }, []);

  // handle input change
  const handleChange = (event) => {
    setInputChange(true);
    setResultExists(false);
    setSubmitted(false);
    setFormData(event.target.value);
  };

  // adjust search results based on input change
  const handleSubmit = (event) => {
    event.preventDefault();
    results = [];
    if (inputChange) {
      setInputChange(false)
      allPosts.forEach((post) => {
        let exists = false;
        post.tags.forEach((tag) => {
          if (formData.toLowerCase().includes(tag.name)) {
            exists = true;
          }
        });
        if (exists) {
          results.push(post);
        }
      });
    }

    if (results.length > 0) {
      setResultExists(true);
    }
    setSubmitted(true);
  };

  return { posts } || resultExists ? (
    <div className='page__container'>
      <Header home={false} />
      <div id="page"></div>
      <main className="directory" dir="rtl" >
        <form className="search__form" onSubmit={handleSubmit}>
          <input id="search" name="search" type="text" placeholder="بحث" onChange={handleChange} className="search__input" />
          <Button variant="dark" type="submit" className="search__button" >
            <img src="https://img.icons8.com/ios/25/ffffff/search--v1.png" />
          </Button>
        </form>
        <div className="directory__container">
          {!submitted
            ? postsInPage.map((post, index) => (
              (!mobile)
                ? <SinglePostWide post={post} key={index} />
                : <SinglePost post={post} key={index} />
            ))
            : ((resultExists)
              ? results.map((post, index) => (
                (!mobile)
                  ? <SinglePostWide post={post} key={index} />
                  : <SinglePost post={post} key={index} />
              ))
              : (
                <div className="directory__notFound" dir="ltr">
                  <p>
                    No results found for {formData}. Try another search
                  </p>
                  <img src="https://img.icons8.com/fluent-systems-filled/96/000000/shift-up.png" />
                </div>
              )
            )}
        </div>
        <div className='directory__pages' dir='ltr'>
          {!submitted
            ? pages.map((p, i) => (
              <form onSubmit={pageNum}>
                <button className='directory__pages__button' id='page' type="submit" value={p + i + 1} key={p + i + 10}>
                  {i + 1}
                </button>
              </form>
            )) : <></>}
        </div>
      </main>
      <Footer />
    </div >
  ) :
    (<div className='page__container'>
      <Header home={false} />
      <main className="directory" dir="rtl">
        <form className="search__form" onSubmit={handleSubmit}>
          <input id="search" name="search" type="text" placeholder="بحث" onChange={handleChange} className="search__input" />
          <Button variant="dark" type="submit" className="search__button" >
            <img src="https://img.icons8.com/ios/25/ffffff/search--v1.png" />
          </Button>
        </form>
        <div className="directory__container">
          <Skeleton variant="text" />

          <Skeleton variant="text" />

          <Skeleton variant="text" />

          <Skeleton variant="text" />

          <Skeleton variant="text" />

          <Skeleton variant="text" />
        </div>
      </main>
      <Footer />
    </div>);
}
