import './VideoBox.css';

export default function VideoBox({ imgSrc = 'move' }) {
    return (
        <div className='video-box'>
            {/* <!-- [S] Movie --> */}
            <div className='jb-box '>
                <video className='.jb-video' muted autoPlay loop>
                    <source src={require('../../assets/video/truck.mp4')} type='video/mp4' />
                    <strong>Your browser does not support the video tag.</strong>
                </video>

                <div className='jb-text'>
                    <p className='vtext-big'>Move on 248</p>
                    <p className='vtext-small'>당신의 새로운 설레임에 함께 합니다.</p>
                </div>

                <div className='scroll-downs'>
                    <div className='mousey'>
                        <div className='scroller'></div>
                    </div>
                </div>
            </div>
            {/* <!-- [E] Movie --> */}
        </div>
    );
}
