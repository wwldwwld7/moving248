import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import './ApplyFormInput.css';
import LocationDropdown from './LocationDropdown';
import axios from 'axios';

const ApplyFormInput = props => {
    const [isChecked, setIsChecked] = useState({
        dep_ev: false,
        dep_ladder: false,
        arr_ev: false,
        arr_ladder: false,
    });
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [selectedOption, setSelectedOption] = useState('');
    const [isMovingType, setIsMovingType] = useState(null);
    const [textareaValue, setTextareaValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedDepSido, setSelectedDepSido] = useState(''); // 추가된 부분
    const [selectedDepGu, setSelectedDepGu] = useState(''); // 추가된 부분
    const [selectedArrSido, setSelectedArrSido] = useState(''); // 추가된 부분
    const [selectedArrGu, setSelectedArrGu] = useState(''); // 추가된 부분

    const handleCheckboxChange = key => {
        setIsChecked(prevState => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const handleRadioChange = value => {
        setSelectedOption(value);
        setIsMovingType(value === 'packing' ? '1' : value === 'ordinary' ? '2' : null);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const formatDate = date => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleTextareaChange = event => {
        setTextareaValue(event.target.value);
    };
    const radioOptions = [
        { label: '포장이사', value: 'packing' },
        { label: '일반이사', value: 'ordinary' },
    ];

    const [file, setFile] = useState(null);

    // const handleFileChange = event => {
    //     setFile(event.target.files[0]);
    // };

    const [imageSrc, setImageSrc] = useState('');
    const defaultThumbnailURL = 'video-thumbnail-default.png'; // Replace with the actual path

    const handleFileChange = fileBlob => {
        const selectedFile = fileBlob.target.files[0];

        // Check if a file was selected
        if (!selectedFile) {
            setFile(null);
            setImageSrc('');
            return;
        }

        setFile(selectedFile);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
            setImageSrc(reader.result);
        };
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (!isMovingType) {
            setErrorMessage('이사 종류를 선택해주세요.');
            return;
        }

        if (!selectedDepSido || !selectedDepGu) {
            setErrorMessage('출발 장소를 선택해주세요.');
            return;
        }

        if (!selectedArrSido || !selectedArrGu) {
            setErrorMessage('도착 장소를 선택해주세요.');
            return;
        }
        if (!file) {
            setErrorMessage('파일을 선택해주세요.');
            return;
        }
        setErrorMessage('');

        const formData = new FormData();
        formData.append('file', file);
        const jsonData = {
            m_id: 1, //int
            f_category: isMovingType, // string으로
            f_date: formatDate(selectedDate),
            f_dep_ev: isChecked.dep_ev ? 't' : 'f', // char T F
            f_dep_ladder: isChecked.dep_ladder ? 't' : 'f',
            f_arr_ev: isChecked.arr_ev ? 't' : 'f',
            f_arr_ladder: isChecked.arr_ladder ? 't' : 'f',
            f_req_desc: textareaValue, //String
            f_dep_sido: selectedDepSido, //String  '1'
            f_dep_gungu: selectedDepGu, //String  '34'
            f_arr_sido: selectedArrSido, //String  '2'
            f_arr_gungu: selectedArrGu, //String  '22'
        };
        formData.append(
            'data',
            new Blob([JSON.stringify(jsonData)], {
                type: 'application/json',
            })
        );

        try {
            const response = await axios.post('http://localhost:8080/form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('서버 응답:', response.data);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    return (
        <>
            <section className='max-container section'>
                <div className='sec-two-one-container inner__section  overlap-imgbox'>
                    <div className='apply-form-innerbox'>
                        <h3>이사 종류</h3>
                        <RadioButton options={radioOptions} selectedOption={selectedOption} onChange={handleRadioChange} />
                    </div>
                    <div className='apply-form-innerbox'>
                        <h3>날짜 선택</h3>
                        <DatePicker
                            dateFormat='yyyy-MM-dd' // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            minDate={new Date()} // minDate 이전 날짜 선택 불가
                            maxDate={new Date('2024-12-31')} // maxDate 이후 날짜 선택 불가
                            selected={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className='apply-form-innerbox'>
                        <h3>기존 주소</h3>
                        <LocationDropdown label='출발' selectedSido={selectedDepSido} setSelectedSido={setSelectedDepSido} selectedGu={selectedDepGu} setSelectedGu={setSelectedDepGu} />
                        <div>
                            <Checkbox name='dep_ev' checked={isChecked.dep_ev} onChange={() => handleCheckboxChange('dep_ev')} onClick={() => handleCheckboxChange('dep_ev')} />
                            <label onClick={() => handleCheckboxChange('dep_ev')}>엘리베이터 사용</label>
                        </div>
                        <div>
                            <Checkbox name='dep_ladder' checked={isChecked.dep_ladder} onChange={() => handleCheckboxChange('dep_ladder')} onClick={() => handleCheckboxChange('dep_ladder')} />
                            <label onClick={() => handleCheckboxChange('dep_ladder')}>사다리차 사용</label>
                        </div>
                    </div>
                    <div className='apply-form-innerbox'>
                        <h3>변경 주소</h3>
                        <LocationDropdown label='도착' selectedSido={selectedArrSido} setSelectedSido={setSelectedArrSido} selectedGu={selectedArrGu} setSelectedGu={setSelectedArrGu} />
                        <div>
                            <Checkbox name='arr_ev' checked={isChecked.arr_ev} onChange={() => handleCheckboxChange('arr_ev')} onClick={() => handleCheckboxChange('arr_ev')} />
                            <label onClick={() => handleCheckboxChange('arr_ev')}>엘리베이터 사용</label>
                        </div>
                        <div>
                            <Checkbox name='arr_ladder' checked={isChecked.arr_ladder} onChange={() => handleCheckboxChange('arr_ladder')} onClick={() => handleCheckboxChange('arr_ladder')} />
                            <label onClick={() => handleCheckboxChange('arr_ladder')}>사다리차 사용</label>
                        </div>
                    </div>
                    <div className='apply-form-innerbox'>
                        <h3>방 정보</h3>

                        {/* 파일 선택 폼 */}
                        <div>
                            <label>파일 선택:</label>
                            <input type='file' onChange={handleFileChange} />
                        </div>
                        {/* Conditionally render video or default thumbnail */}
                        {imageSrc ? <video src={imageSrc} controls></video> : <img className='thumbnail-image' src={defaultThumbnailURL} alt='default-thumbnail' />}

                        {/* <div className='preview'>{imageSrc && <img src={imageSrc} alt='preview-img' />}</div> */}
                    </div>
                    <div className='apply-form-innerbox'>
                        <h3>상세 설명</h3>
                        <textarea
                            className='apply-form-desc'
                            type='textarea'
                            name='apply-form-desc'
                            value={textareaValue}
                            onChange={handleTextareaChange}
                            placeholder='ex) 짐이 많아 직원이 더 필요합니다.'
                        ></textarea>
                    </div>
                    {/* </div> */}
                    <div className='apply-form-innerbox-e'>{errorMessage && <p className='form-error-message'>{errorMessage}</p>}</div>
                    {/* <div className='form-submit-button'> */}
                    <button className='form-submit-button' type='button' onClick={handleSubmit}>
                        신청서 등록
                    </button>
                </div>

                <div className='sec-two-two-container inner__section'></div>
            </section>
        </>
    );
};

export default ApplyFormInput;
