// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import Footer from '../components/footer'
import Header from '../components/header'
import cloudinary from 'cloudinary'

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

    return (
        <div>
            <Header home={false} />
            <main>
                {images.map((image, index) => {
                    if (image.public_id.includes('gallery/')){
                        return(<img src={image.secure_url} key={index} className='gallery__img' />)
                    }
                })}
            </main>
            <Footer />
        </div>
    )
}