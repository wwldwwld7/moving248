import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // react-router-dom 라이브러리에서 Link 컴포넌트 불러오기

import ImgBox from '../../components/ImgBox/ImgBox';
import './ApplyList.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberTypeAtom } from '../../atom';

const ApplyList = props => {
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);

    const [dataList, setDataList] = useState([]);

    //////////////// Filter start ////////////////

    const [sidoOptions, setSidoOptions] = useState([]);
    const [guOptions, setGuOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([
        { category_code: 1, category_name: '전체' },
        { category_code: 2, category_name: '참여' },
        { category_code: 3, category_name: '미참여' },
        { category_code: 4, category_name: '확정' },
    ]);
    const [selectedSido, setSelectedSido] = useState('');
    const [selectedGu, setSelectedGu] = useState('');
    const [selectedCartegory, setSelectedCartegory] = useState('');

    useEffect(() => {
        // 서버에서 데이터 가져오기
        axios
            .get('https://i9b301.p.ssafy.io/api/form')
            .then(response => {
                setDataList(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // 시도 목록 가져오기
        axios
            .get('https://i9b301.p.ssafy.io/api/form/sido')
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
                .get(`https://i9b301.p.ssafy.io/api/form/gu/${selectedSido}`)
                .then(response => {
                    setGuOptions(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching gu:', error);
                });
        }
    }, [selectedSido]);

    const handleSearch = () => {
        // 선택된 값을 서버로 보내는 로직
        if (!selectedSido || !selectedGu || !selectedCartegory) {
            alert('모든 필터 항목을 선택해주세요.');
            return;
        }
        axios
            .get(`https://i9b301.p.ssafy.io/api/form/${selectedSido}/${selectedGu}/${selectedCartegory}/${memberId}`)
            .then(response => {
                // 서버 응답 처리 로직
                const filteredData = response.data;
                // console.log(filteredData);
                setDataList(filteredData.data);
                setCurrentPage(1); // 결과가 변경되면 페이지를 1로 초기화
            })
            .catch(error => {
                console.error('Error searching data:', error);
            });
    };

    const handleCategoryChange = categoryCode => {
        setSelectedCartegory(categoryCode);
    };
    //////////////// Pagination start ////////////////
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 아이템 수

    const totalPages = Math.ceil(dataList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = dataList.slice(startIndex, endIndex);

    const navi = useNavigate();

    const goToDetail = id => {
        navi(`/apply-detail/${id}`);
    };

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
        <div>
            <div className='margin-box one-section'>
                <div className='sec-one-one-container'>
                    <div className='filter-container'>
                        <div className='filter-dropAndButton'>
                            <div className='filter-dropdown'>
                                <div className='filter-label'>
                                    <label>
                                        <select className='select-css' value={selectedSido} onChange={e => setSelectedSido(e.target.value)}>
                                            <option value=''>시도분류</option>
                                            {sidoOptions.map(option => (
                                                <option key={option.sido_code} value={option.sido_code}>
                                                    {option.sido_name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className='filter-label'>
                                    <label>
                                        <select className='select-css' value={selectedGu} onChange={e => setSelectedGu(e.target.value)}>
                                            <option value=''>구군분류</option>
                                            {guOptions.map(option => (
                                                <option key={option.gu_code} value={option.gu_code}>
                                                    {option.gu_name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className='filter-label'>
                                    <label>
                                        <select className='select-css' value={selectedCartegory} onChange={e => handleCategoryChange(e.target.value)}>
                                            <option value=''>상태(견적)</option>
                                            {categoryOptions.map(option => (
                                                <option key={option.category_code} value={option.category_code}>
                                                    {option.category_name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            {/* <div className='buttons-box'> */}
                            {/* </div> */}
                        </div>
                        <div className='filter-dropAndButton'>
                            <button className='filter-buttons' onClick={handleSearch}>
                                조회하기
                            </button>
                        </div>
                    </div>

                    {/* <div className='filter-container'>
                        <div className='filter-status'>
                            {categoryOptions.map(option => (
                                <button key={option.category_code} className={selectedCartegory === option.category_code ? 'active' : ''} onClick={() => handleCategoryChange(option.category_code)}>
                                    {option.category_name}
                                </button>
                            ))}
                        </div>
                    </div> */}

                    <table className='listTable'>
                        <tbody>
                            {currentPageData.map((rowData, index) => {
                                const parsedDate = new Date(rowData.f_date);
                                const month = parsedDate.getMonth() + 1; // Months are zero-based
                                const day = parsedDate.getDate();
                                const formattedDate = `${month}월 ${day}일`;

                                return (
                                    <tr onClick={() => goToDetail(rowData.f_id)} className='listTable-row' key={index}>
                                        {/* <td className='listTable-column-double'>{rowData.f_id}</td> */}

                                        {/* 상세 신청서 페이지 이동 */}
                                        <td className='listTable-column-double list-table__fixed-width1'>
                                            <div className={`listTable-column ${rowData.f_status === 1 ? '입찰' : rowData.f_status === 2 ? '확정' : rowData.f_status === 3 ? '완료' : ''}`}>
                                                <p className='dynamic'>{rowData.f_status === 1 ? '입찰' : rowData.f_status === 2 ? '확정' : rowData.f_status === 3 ? '완료' : ''}</p>
                                            </div>
                                        </td>
                                        <td className='listTable-column-double list-table__fixed-width2'>
                                            <div className='listTable-column-child'>
                                                <p className='dynamic'>
                                                    출발 : {rowData.f_dep_sido} {rowData.f_dep_gungu}
                                                </p>
                                            </div>
                                            <div className='listTable-column-child'>
                                                <p className='dynamic'>
                                                    도착 : {rowData.f_arr_sido} {rowData.f_arr_gungu}
                                                </p>
                                            </div>
                                        </td>
                                        <td className='listTable-column-double list-table__fixed-width3'>
                                            <div className='listTable-column-child'>
                                                <p className='dynamic'>{formattedDate}</p>
                                            </div>
                                            <div className='listTable-column-child'>
                                                <p className='dynamic'>{rowData.f_category}</p>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* </CommonTable> */}
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
            </div>
        </div>
    );
};

export default ApplyList;
