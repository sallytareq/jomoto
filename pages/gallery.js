// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import Footer from '../components/footer'
import Header from '../components/header'
var cloudinary = require('cloudinary');
const { CLOUDINARY_API_KEY , CLOUDINARY_API_SECRET , CLOUD_NAME } = process.env

cloudinary.v2.api.resources(
    { max_results: 20 },
    function(error, result) {console.log(result, error); });

function Gallery(props) {
    
    
    return (
        <div dir="rtl">
            <Header home={false} />
            <main>

            </main>
            <Footer />
        </div>
    )
}


export default Gallery