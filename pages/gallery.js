// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import ReactDOM from 'react-dom';
import Footer from '../components/footer'
import Header from '../components/header'
import cloudinary from 'cloudinary'
import { useState } from 'react';
import { useEffect } from 'react'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUD_NAME } = process.env


export async function getServerSideProps() {

    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });

    const data = await cloudinary.v2.api.resources({ max_results: 21 })
    const images = data.resources

    // console.log("IMAGES",images);

    if (!images) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { images },
    }
}

export default function Gallery({ images }) {
    // console.log(images[0]);
    const [selected, setSelected] = useState(0)

    const nextImage = () => {
        let index;
        if (selected === 19) {
            index = 0
        } else {
            index = selected + 1;
        }
        setSelected(index)
        console.log(selected);
    }

    const prevImage = () => {
        let index;
        if (selected === 0) {
            index = 19
        } else {
            index = selected - 1;
        }
        setSelected(index)
        console.log(selected);
    }


    return (
        <div>
            <Header home={false} />
            <main>
                <div className='gallery__hero'>
                    <NavigateBeforeRoundedIcon onClick={prevImage} />
                    <img src={selected ? images[selected].secure_url : images[0].secure_url} alt='selected' className='gallery__selected' />
                    <NavigateNextRoundedIcon onClick={nextImage} />
                </div>
                <div className='gallery'>
                    {images.map((image, index) => {
                        if (image.public_id.includes('gallery/')) {
                            return (
                                <div className='gallery__card' >
                                    <img src={image.secure_url} key={index} className='gallery__img' onClick={() => setSelected(index)} />
                                </div>
                            )
                        }
                    })}
                </div>
            </main>
            <Footer />
        </div>
    )
}