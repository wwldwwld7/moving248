import React from 'react';
import './CommonTableColumn.css'; // 컬럼 스타일 추가

const CommonTableColumn = ({ children, className }) => {
    return <td className={`common-table-column ${className}`}>{children}</td>;
};

export default CommonTableColumn;
