import MoverMyPageDetail from '../../components/MyPage/MoverMyPageDetail';
import MoverMyPageHistory from '../../components/MyPage/MoverMyPageHistory';
import ImgBox from '../../components/ImgBox/ImgBox';

const MoverMyPage = props => {
    return (
        <>
            <ImgBox imgSrc='moving-box' imgTitle='무버 마이페이지' />
            <section className='max-container section'>
                <MoverMyPageDetail />
                <MoverMyPageHistory />
            </section>
        </>
    );
};

export default MoverMyPage;
