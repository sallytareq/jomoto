import Header from '../components/header';
import Footer from '../components/footer';

import EmailRoundedIcon from '@material-ui/icons/EmailRounded';

export default function About(props) {
    return (
        <div className='page__container'>
            <Header home={false} />
            <div className='about' dir="rtl">
                < div className='about__info'>
                    <h2 className='about__info__title'>مين رعد؟</h2>
                    <p className='about__info__profile'>
                        حب الدراجات النارية ممكن يبلش بأي عمر، صراحة من الصعب كان بالنسبة ألي أشوف كيف بلشت الدراجات النارية تنتشر بشكل كبير بالأردن بعد إنقطاع دام أكثر من 30 سنة ، بدون ما يصير عندي حب كبير إلهم، لذلك فكرة أنه أنقل هذا الحب من خلال مقاطع فيديو و مقالات إستهوتني بشكل كبير و بلشت بأول خطوة بصناعة المحتوى على صفحتي على الإنستغرام .. و اليوم بشاركم هاي المعلومات على الموقع الخاص ل جوموتو فلوق
                    </p>
                    <div className='about__info__email'>
                        <EmailRoundedIcon /> : <a href="mailto:jomotovlog650@gmail.com">jomotovlog650@gmail.com</a>
                    </div>
                </div>
                <img src='https://res.cloudinary.com/jomoto/image/upload/v1618258777/undefined/profile_wz9xfc.jpg' className='about__img' />
            </div>

            <Footer />
        </div >
    )
}
