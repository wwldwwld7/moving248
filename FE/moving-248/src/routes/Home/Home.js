import Header from '../../components/header/Header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <div>
            <Header />
            <FontAwesomeIcon icon={faSearch} className='search' />
            <h1>h1</h1>
            <h4>h4</h4>
            <h5>h5</h5>
            <p>그냥 p</p>
            <p className='dynamic'>p dynamic 다이내믹</p>
            <p className='paragraph'>p paragraph 파라그래프</p>
            <p className='sub'>p 서브</p>
        </div>
    );
}
