import PartnerMyPageDetail from '../../components/MyPage/PartnerMyPageDetail';
import ImgBox from '../../components/ImgBox/ImgBox';
import { Helmet } from 'react-helmet-async';

const PartnerMyPage = props => {
    return (
        <>
            <Helmet>
                <title>248 | 파트너 마이페이지</title>
            </Helmet>
            <ImgBox imgSrc='partner-mypage' imgTitle='파트너 마이페이지' />
            <section className='max-container section'>
                <PartnerMyPageDetail />
            </section>
        </>
    );
};

export default PartnerMyPage;
