import Header from '../components/header'
import Footer from '../components/footer'

export default function Error(props) {
    return (
        <div>
            <Header home={false} />
                <div className='error__text'>Looks like you've reached a deadend!</div>
                <img src='https://res.cloudinary.com/jomoto/image/upload/v1618009224/undefined/404_lpcpax.png' className='error__img'/>
            <Footer />
        </div>
    )
}
