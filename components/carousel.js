import { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} prevLabel="" nextLabel="">
      {props.posts.map((post, indexLoop) => (
        <Carousel.Item key={indexLoop}>
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

export default ControlledCarousel;
