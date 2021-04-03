import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react'

function ControlledCarousel(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} prevLabel="" nextLabel="">
            {props.posts.map((post, index) => (
                <Carousel.Item>
                    <img
                        className="carousel__img"
                        src={post.feature_image}
                        alt={post.title}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ControlledCarousel