import { useRouter } from 'next/router';

import Head from 'next/head';

import Skeleton from '@material-ui/lab/Skeleton';

import Footer from '../../components/footer';
import Header from '../../components/header';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

export const getServerSideProps = async ({ params }) => {
  // Ghost API fetch individual post data
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${params.slug}/?key=${CONTENT_API_KEY}&fields=title,html,feature_image,`,
  );

  const data = await res.json();
  const post = data.posts.shift();

  if (!post) {
    return {
      fallback: true,
      notFound: true,
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { post },
    // revalidate: 10,
  };
};

function Post({ post }) {
  // const [enableLoadComments, setEnableLoadComments] = useState(true)

  const router = useRouter();

  // check existence of post and fetched data
  return !router.fallback || !post ? (
    <div className='page__container'>
      <Header home={false} />

      <div dir="rtl" className="single">
        <div className="single__content">
          <h1>
            {' '}
            {post.title}
            {' '}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <img src={post.feature_image} className="single__img" />
      </div>

      <Footer />

      {/* <DisqusComments post={post} /> */}

    </div>
  ) : (
    <>
      <Head>
        <title>JoMoto</title>
        <link rel="icon" href="/icon1.ico" />
      </Head>
      <Header />
      <div dir="rtl" className="single">
        <div className="single__content">
          <h1>
            {' '}
            <Skeleton variant="text" />
          </h1>
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
  );
}

export default Post;
