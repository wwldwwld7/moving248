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
                setSidoOptions(response.data.data);
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
                    setGuOptions(response.data.data);
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
