import { useState } from 'react';

import Link from 'next/link';

import cloudinary from 'cloudinary';

import IconButton from '@material-ui/core/IconButton';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

import Footer from '../components/footer';
import Header from '../components/header';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUD_NAME } = process.env;

export async function getServerSideProps() {
  // Image backend configuration
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  // Image backend fetch 20 images
  const data = await cloudinary.v2.api.resources({ max_results: 22 });
  const allImages = data.resources;
  const images = [];

  // filteration of images
  allImages.forEach((image) => {
    if (image.public_id.includes('gallery/')) {
      images.push(image);
    }
  });

  if (!images) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { images },
  };
}

export default function Gallery({ images }) {
  const [selected, setSelected] = useState(0);

  // next button handle
  const nextImage = () => {
    let index;
    if (selected === 19) {
      index = 0;
    } else {
      index = selected + 1;
    }
    setSelected(index);
  };

  // previous button handle
  const prevImage = () => {
    let index;
    if (selected === 0) {
      index = 19;
    } else {
      index = selected - 1;
    }
    setSelected(index);
  };

  return (
    <div>
      <Header home={false} />
      <div id="selected" />
      <main>
        <div className="gallery__hero">
          <IconButton>
            <NavigateBeforeRoundedIcon onClick={prevImage} />
          </IconButton>
          <img src={selected ? images[selected].secure_url : images[0].secure_url} alt="selected" className="gallery__selected" />
          <IconButton>
            <NavigateNextRoundedIcon onClick={nextImage} />
          </IconButton>
        </div>
        <div className="gallery">
          {images.map((image, index) => (
            <Link href="#selected">
              <div className="gallery__card">
                <img src={image.secure_url} key={index} className="gallery__img" onClick={() => setSelected(index)} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
