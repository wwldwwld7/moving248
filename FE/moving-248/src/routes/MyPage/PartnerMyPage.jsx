import PartnerMyPageDetail from '../../components/MyPage/PartnerMyPageDetail';
import ImgBox from '../../components/ImgBox/ImgBox';

const PartnerMyPage = props => {
    return (
        <>
            <ImgBox imgSrc='moving-box' imgTitle='파트너 마이페이지' />
            <section className='max-container section'>
                <PartnerMyPageDetail />
            </section>
        </>
    );
};

export default PartnerMyPage;
