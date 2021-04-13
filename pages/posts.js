import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import Footer from '../components/footer';
import SinglePost from '../components/post';
import SinglePostWide from '../components/postWide';
import Header, { windowSize } from '../components/header';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

let results = [];

export async function getServerSideProps() {
  // Ghost API fetch all posts
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&limit=all&fields=title,slug,published_at,feature_image,custom_excerpt&include=tags`,
  );
  const data = await res.json();
  // console.log(data);
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
  const pages = new Array(Math.ceil(totalPosts / 6)).fill(0)
  const [formData, setFormData] = useState();
  const [mobile, setMobile] = useState(false);
  const [pageChange, setPageChange] = useState(1)
  const [submitted, setSubmitted] = useState(false);
  const [resultExists, setResultExists] = useState(false);
  
  let end;
  let start;
  let allPosts = { posts }.posts;
  let allPostsCopy = [... { posts }.posts];
  let pagesPosts = allPostsCopy.splice(0, 6)
  
  console.log(pagesPosts);

  // handle pagination
  const pageNum = (num) => {
    allPostsCopy = [... { posts }.posts];
    if (num * 6 <= totalPosts) {
      start = num * 6 - 6;
      if (start + 5 < totalPosts) {
        end = start + 6
      } else {
        end = totalPosts
      }
      allPostsCopy = allPostsCopy.splice(start, end)
    } else {
      allPostsCopy = allPostsCopy.splice(totalPosts - ((num) * 6), totalPosts)
    }
    useEffect(() => { setPageChange(num); }, []);

  }
  // pageNum(1)
  // console.log(pagesPosts);
  // pageNum(2)
  // console.log(pagesPosts);

  // Window size response
  useEffect(() => { setMobile(windowSize()); }, []);
  useEffect(() => { window.addEventListener('resize', () => setMobile(windowSize(1040))); }, []);

  // handle input change
  const handleChange = (event) => {
    setResultExists(false);
    setSubmitted(false);
    setFormData(event.target.value);
  };

  // adjust search results based on input change
  const handleSubmit = (event) => {
    event.preventDefault();
    results = [];

    allPosts.forEach((post) => {
      let exists = false;
      post.tags.forEach((tag) => {
        if (tag.name.includes(formData)) {
          exists = true;
        }
      });
      if (exists) {
        results.push(post);
      }
    });

    if (results.length > 0) {
      setResultExists(true);
    }
    setSubmitted(true);
  };

  return { posts } || resultExists ? (
    <div className='page__container'>
      <Header home={false} />
      <main className="directory" dir="rtl">
        <form className="search__form" onSubmit={handleSubmit}>
          <input id="search" name="search" type="text" placeholder="بحث" onChange={handleChange} className="search__input" />
          <Button variant="dark" type="submit" className="search__button" >
            <img src="https://img.icons8.com/ios/25/ffffff/search--v1.png" />
          </Button>
        </form>
        <div className="directory__container">
          {!submitted 
            ? pagesPosts.map((post, index) => (
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
              <button className='directory__pages__button' type='submit' onSubmit={pageNum(i + 1)} key={p + i}>{i + 1}</button>
            )) : <></>}
        </div>
      </main>
      <Footer />
    </div>
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
