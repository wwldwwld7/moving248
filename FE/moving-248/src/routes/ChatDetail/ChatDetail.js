import Header from '../../components/header/Header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faVideo, faUser } from '@fortawesome/free-solid-svg-icons';
import './ChatDetail.css';
export default function ChatDetail() {
    return (
        <div>
            {/* <Header /> */}

            {/* <FontAwesomeIcon icon={faSearch} className='search' /> */}
            <h2 className='header'>248 메신저</h2>

            <div className='member'>
                <div>
                    <div className='circle'>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#f1ebd6' }} /> <div>김승용</div>
                    </div>
                </div>

                <button
                    className='btn_close'
                    onClick={() => {
                        window.close();
                    }}
                >
                    대화방 나가기
                </button>
            </div>

            <FontAwesomeIcon
                icon={faPaperPlane}
                onClick={() => {
                    window.open('https://i9b301.p.ssafy.io/', '_blank', 'width=700, height=700');
                }}
            />

            <FontAwesomeIcon
                icon={faVideo}
                onClick={() => {
                    window.open('https://i9b301.p.ssafy.io/', '_blank', 'width=700, height=700');
                }}
            />
        </div>
    );
}
