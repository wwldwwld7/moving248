import React, { useState, useEffect } from 'react';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import classes from '../UI/Card.module.css';
import './ApplyList.css';

const ApplyList = props => {
    const [dataList, setDataList] = useState([]);

    //////////////// Filter start ////////////////

    const [currentStatus, setCurrentStatus] = useState('전체'); // '전체', '확정' 중 하나
    const [currentDeparture, setCurrentDeparture] = useState('전체'); // 추가
    const [currentArrival, setCurrentArrival] = useState('전체'); // 추가

    const resetFilters = () => {
        setCurrentStatus('전체');
        setCurrentDeparture('전체');
        setCurrentArrival('전체');
    };

    const filterData = dataList.filter(row => {
        const statusMatch = currentStatus === '전체' || row[1] === currentStatus;
        const departureMatch = currentDeparture === '전체' || row[2].includes(currentDeparture);
        const arrivalMatch = currentArrival === '전체' || row[3].includes(currentArrival);
        return statusMatch && departureMatch && arrivalMatch;
    });

    const handleStatusChange = newStatus => {
        setCurrentStatus(newStatus);
        setCurrentPage(1); // 상태 변경시 페이지를 1로 초기화
    };

    const handleDepartureChange = newDeparture => {
        setCurrentDeparture(newDeparture);
        setCurrentPage(1);
    };
    const departureOptions = ['전체', '대전', '천안', '서울', '제주'];

    const handleArrivalChange = newArrival => {
        setCurrentArrival(newArrival);
        setCurrentPage(1);
    };

    const arrivalOptions = ['전체', '대전', '천안', '서울', '제주'];

    //////////////// Filter end ////////////////

    useEffect(() => {
        const data = [
            [1, '확정', '대전 유성구', '천안 두정동', '2020-7-14', '포장'],
            [2, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [3, '입찰', '대전 유성구', '천안 두정동', '2020-7-14', '일반'],
            [4, '확정', '서울 강남구', '천안 두정동', '2020-7-14', '포장'],
            [5, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [6, '입찰', '서울 강남구', '천안 두정동', '2020-7-14', '일반'],
            [7, '확정', '대전 유성구', '천안 두정동', '2020-7-14', '포장'],
            [8, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [9, '입찰', '서울 강남구', '천안 두정동', '2020-7-14', '일반'],
            [10, '확정', '서울 강남구', '천안 두정동', '2020-7-14', '포장'],
            [11, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [12, '입찰', '서울 강남구', '천안 두정동', '2020-7-14', '일반'],
            [13, '확정', '서울 중구', '제주 서귀포', '2023-5-13', '일반'],
            [14, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [15, '입찰', '대전 동구', '천안 두정동', '2020-7-14', '일반'],
            [16, '확정', '서울 중구', '제주 서귀포', '2023-5-13', '일반'],
            [17, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [18, '입찰', '대전 유성구', '천안 두정동', '2020-7-14', '일반'],
            [19, '확정', '서울 중구', '제주 서귀포', '2023-5-13', '일반'],
            [20, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [21, '입찰', '서울 강남구', '천안 두정동', '2020-7-14', '일반'],
            [22, '확정', '서울 중구', '제주 서귀포', '2023-5-13', '일반'],
            [23, '완료', '천안 서북구', '서울', '2020-8-14', '포장'],
            [24, '입찰', '대전 유성구', '천안 두정동', '2020-7-14', '일반'],
            [25, '확정', '서울 중구', '제주 서귀포', '2023-5-13', '일반'],
        ];

        setDataList(data);
    }, []);

    //////////////// Pagination start ////////////////
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 아이템 수

    const totalPages = Math.ceil(filterData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filterData.slice(startIndex, endIndex);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    const moveBeforePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const moveNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    //////////////// Pagination end ////////////////

    return (
        <div className={classes.wide_card}>
            <div className='filter-container'>
                <div className='filter-dropdown'>
                    <label>
                        출발지:
                        <select value={currentDeparture} onChange={e => handleDepartureChange(e.target.value)}>
                            {departureOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        도착지:
                        <select value={currentArrival} onChange={e => handleArrivalChange(e.target.value)}>
                            {arrivalOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button className='reset-button' onClick={resetFilters} value='필터리셋'>
                    필터리셋
                </button>
            </div>
            <div className='filter-container'>
                <div className='filter-status'>
                    <button className={currentStatus === '전체' ? 'active' : ''} onClick={() => handleStatusChange('전체')}>
                        전체
                    </button>
                    <button className={currentStatus === '확정' ? 'active' : ''} onClick={() => handleStatusChange('확정')}>
                        확정
                    </button>
                    <button className={currentStatus === '참여' ? 'active' : ''} onClick={() => handleStatusChange('참여')}>
                        참여
                    </button>
                    <button className={currentStatus === '미참여' ? 'active' : ''} onClick={() => handleStatusChange('미참여')}>
                        미참여
                    </button>
                </div>
            </div>
            <CommonTable headersName={['번호', '상태', '출발', '도착', '일자', '이사구분']}>
                {currentPageData.map((rowData, rowIndex) => (
                    <CommonTableRow key={rowIndex}>
                        {rowData.map((cellData, cellIndex) => {
                            if (cellIndex === 1) {
                                return (
                                    <CommonTableColumn
                                        key={cellIndex}
                                        className={`status-cell ${cellData === '확정' ? '확정' : ''} ${cellData === '완료' ? '완료' : ''}
                                    ${cellData === '입찰' ? '입찰' : ''}`}
                                    >
                                        {cellData}
                                    </CommonTableColumn>
                                );
                            } else {
                                return <CommonTableColumn key={cellIndex}>{cellData}</CommonTableColumn>;
                            }
                        })}
                    </CommonTableRow>
                ))}
            </CommonTable>
            <div className='pagination'>
                <button onClick={moveBeforePage}>&lt;</button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={index + 1 === currentPage ? 'active' : ''} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={moveNextPage}>&gt;</button>
            </div>
        </div>
    );
};

export default ApplyList;
