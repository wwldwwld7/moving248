import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationDropdown.css';

const LocationDropdown = ({ label, selectedSido, setSelectedSido, selectedGu, setSelectedGu }) => {
    const [sidoOptions, setSidoOptions] = useState([]);
    const [guOptions, setGuOptions] = useState([]);

    useEffect(() => {
        // 시도 목록 가져오기
        axios
            .get('http://localhost:8080/form/sido')
            .then(response => {
                // 이사신청서 작성할 때 시도목록을 필요 없으니깐
                const filterSido = response.data.data.filter(option => option.sido_name !== '전체');
                setSidoOptions(filterSido);
            })
            .catch(error => {
                console.error('Error fetching sido:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedSido) {
            // 선택된 시도에 해당하는 군구 목록 가져오기
            axios
                .get(`http://localhost:8080/form/gu/${selectedSido}`)
                .then(response => {
                    //이사신청서 작성할 때 구군 목록에서 전체 필요없음
                    const filterGu = response.data.data.filter(option => option.gu_name !== '전체');
                    setGuOptions(filterGu);
                })
                .catch(error => {
                    console.error('Error fetching gu:', error);
                });
        }
    }, [selectedSido]);

    return (
        <div className='loc-filter-dropdown'>
            <label>{label}: </label>
            <select className='select-css' value={selectedSido} onChange={e => setSelectedSido(e.target.value)}>
                <option value=''>시도 선택</option>
                {sidoOptions.map(option => (
                    <option key={option.sido_code} value={option.sido_code}>
                        {option.sido_name}
                    </option>
                ))}
            </select>
            {/* <label>{label} </label> */}
            <select className='select-css' value={selectedGu} onChange={e => setSelectedGu(e.target.value)}>
                <option value=''>군구 선택</option>
                {guOptions.map(option => (
                    <option key={option.gu_code} value={option.gu_code}>
                        {option.gu_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationDropdown;
