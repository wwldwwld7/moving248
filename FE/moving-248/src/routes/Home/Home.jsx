import Footer from '../../components/Footer/Footer.jsx';
import VideoBox from './VideoBox.jsx';
import Header from '../../components/header/Header.jsx';
import './Home.css';

export default function Home() {
    return (
        <div>
            <Header />
            <VideoBox />

            <section className='max-container section home__sec-two-container-outer'>
                <div className='home__sec-two-one-container inner__section'>
                    <img className='home__img' src={require(`../../assets/image/camera.jpg`)} alt='img' />
                </div>
                <div className='home__sec-two-two-container inner__section'>
                    <h1 className='home__h1'>
                        촬영 한번으로 간편하게
                        <br />
                        제공받아 보세요
                    </h1>
                    <p className='dynamic'>가구, 가전 제품, 전자 기기 등</p>
                    <p className='dynamic'>
                        수많은 이사 품목들을 영상 촬영 한 번으로 여러 <b>파트너*</b>와 공유하세요!
                    </p>
                    <p className='dynamic'>(파트너* : 이사를 도와주는 전문 업체 인력)</p>
                </div>
            </section>

            <section className='max-container section home__sec-two-container-outer'>
                <div className='home__sec-two-one-container inner__section'>
                    <img className='home__img' src={require(`../../assets/image/broadcast.jpg`)} alt='img' />
                </div>
                <div className='home__sec-two-two-container inner__section'>
                    <h1 className='home__h1'>
                        방문 상담없이
                        <br />
                        파트너와 만나보세요
                    </h1>
                    <p className='dynamic'>방문 날짜 예약, 방문 상담, 최종 견적까지</p>
                    <p className='dynamic'>불편하고 번거로웠던 방문 상담 프로세스를 화상 한 번으로 해결하세요!</p>
                    <p className='dynamic'>(※ 필요 시, 화상 또는 대면 상담 병행 가능)</p>
                </div>
            </section>

            <section className='max-container section home__sec-two-container-outer'>
                <div className='home__sec-two-one-container inner__section'>
                    <img className='home__img' src={require(`../../assets/image/employee.jpg`)} alt='img' />
                </div>

                <div className='home__sec-two-two-container inner__section'>
                    <h1 className='home__h1'>
                        나만의 맞춤형 이사를
                        <br />
                        만들어 보세요
                    </h1>
                    <p className='dynamic'>내 요청사항(차량, 인력)을 기준으로 책정된 합리적인 가격을 제공받아 보세요.</p>
                    <p className='dynamic'>손쉽게 많은 파트너들과 상담 후 이사를 결정할 수 있습니다!</p>
                </div>
            </section>

            <section className='max-container section home__sec-two-container-outer'>
                <div className='section-divide'></div>
            </section>

            {/* [S] 프로세스 */}
            <section className='section max-container home__icon-outer'>
                <h1 className='home__icon-h1'>248의 프로세스</h1>
                <div className='sec-one-container inner__section'>
                    <img className='home__img home__img-big' src={require(`../../assets/image/Home/process-big.png`)} alt='img' />
                    <img className='home__img home__img-middle' src={require(`../../assets/image/Home/process-middle-1.png`)} alt='img' />
                    <img className='home__img home__img-middle' src={require(`../../assets/image/Home/process-middle-2.png`)} alt='img' />
                    <img className='home__img home__img-small' src={require(`../../assets/image/Home/process-small.png`)} alt='img' />
                </div>

                {/* <div className='sec-one-container inner__section home__icon-container'>
                    <div className='home__icon-container-inner'>
                        <img className='home__icon-img' src={require(`../../assets/image/icon/easy.png`)} alt='img src' />
                        <h2 className='home__icon-h2'>1 쉽게</h2>
                        <p className='paragraph home__icon-p'>
                            복잡한 신청서 작성 No! <br />
                            영상 업로드와 절차 간소화!
                        </p>
                    </div>

                    <div className='home__icon-container-inner'>
                        <img className='home__icon-img' src={require(`../../assets/image/icon/easy.png`)} alt='img' />
                        <h2 className='home__icon-h2'>2 명확하게</h2>
                        <p className='paragraph home__icon-p'>
                            명확한 책정 기준과 함께
                            <br />
                            손쉬운 가격 비교!
                        </p>
                    </div>

                    <div className='home__icon-container-inner'>
                        <img className='home__icon-img' src={require(`../../assets/image/icon/easy.png`)} alt='img' />
                        <h2 className='home__icon-h2'>3 편안하게</h2>
                        <p className='paragraph home__icon-p'>
                            방문없는 화상 상담 기능으로
                            <br />
                            여러 업체와 상담 비교 가능!
                        </p>
                    </div>

                    <div className='home__icon-container-inner'>
                        <img className='home__icon-img' src={require(`../../assets/image/icon/easy.png`)} alt='img' />
                        <h2 className='home__icon-h2'>4 쉽게</h2>
                        <p className='paragraph home__icon-p'>
                            복잡한 신청서 작성 No! <br />
                            영상 업로드와 절차 간소화!
                        </p>
                    </div>

                    <div className='home__icon-container-inner'>
                        <img className='home__icon-img' src={require(`../../assets/image/icon/easy.png`)} alt='img' />
                        <h2 className='home__icon-h2'>5 명확하게</h2>
                        <p className='paragraph home__icon-p'>
                            명확한 책정 기준과 함께
                            <br />
                            손쉬운 가격 비교!
                        </p>
                    </div>

                    <div className='home__icon-container-inner'>
                        <img className='home__icon-img' src={require(`../../assets/image/icon/easy.png`)} alt='img' />
                        <h2 className='home__icon-h2'>6 편안하게</h2>
                        <p className='paragraph home__icon-p'>
                            방문없는 화상 상담 기능으로
                            <br />
                            여러 업체와 상담 비교 가능!
                        </p>
                    </div>
                </div> */}
            </section>

            <section className='max-container section home__sec-two-container-outer'>
                <div className='section-divide'></div>
            </section>
            {/* [E] 프로세스 */}

            <section className='section sec-one-container-outer max-container'>
                <div className='sec-one-container inner__section'>
                    <img className='home__img' src={require(`../../assets/image/house.jpg`)} alt='img' />
                </div>

                <div className='sec-one-container inner__section'>
                    <h1 className='home__h1 text-align'>
                        새로운 설레임에
                        <br />
                        <b className='two-four-eight'>248</b>이 함께 하겠습니다
                    </h1>
                    <p className='dynamic text-align'>새로운 지역, 새로운 공간, 새로운 사람</p>
                    <p className='dynamic text-align'>
                        새로운 보금자리로의 첫 발딛음을 248이 함께 하겠습니다!
                        {/* 새로운 보금자리로의 첫 발딛음을 <b className='two-four-eight'>&lt;248&gt;</b>이 함께 하겠습니다! */}
                    </p>
                </div>
            </section>

            {/* 
            <section className='section max-container'>
                <div className='sec-one-half-container inner__section'>
                    <p>sec-one-half-container</p>
                    <p>sec-one-half-container</p>
                </div>
            </section>

            <section className='section max-container'>
                <div className='sec-one-container inner__section'>
                    <p>sec-one-container</p>
                    <p>sec-one-container</p>
                </div>
            </section>

            <section className='max-container section'>
                <div className='sec-two-one-container inner__section'>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                </div>

                <div className='sec-two-two-container inner__section'>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                </div>
            </section> 
            */}
            <Footer />
        </div>
    );
}
