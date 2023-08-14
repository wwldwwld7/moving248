import MoverMyPageDetail from '../../components/MyPage/MoverMyPageDetail';
import MoverMyPageHistory from '../../components/MyPage/MoverMyPageHistory';
import ImgBox from '../../components/ImgBox/ImgBox';
import { Helmet } from 'react-helmet-async';

const MoverMyPage = props => {
    return (
        <>
            {' '}
            <Helmet>
                <title>248 | 무버 마이페이지</title>
            </Helmet>
            <ImgBox imgSrc='mover-mypage' imgTitle='무버 마이페이지' />
            <section className='max-container section'>
                <MoverMyPageDetail />
                <MoverMyPageHistory />
            </section>
        </>
    );
};

export default MoverMyPage;
