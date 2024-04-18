import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageNumbers = 3;
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

    let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (totalPages <= maxPageNumbers) {
        startPage = 1;
        endPage = totalPages;
    } else if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    return (
        <nav className="inline-block">
            <ul className="flex">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 mx-1 bg-persian-blue1 text-white rounded-md disabled:opacity-15"
                    >
                        Prev
                    </button>
                </li>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <li key={startPage + i}>
                        <button
                            onClick={() => onPageChange(startPage + i)}
                            className={`px-3 py-1 mx-1 ${
                                currentPage === startPage + i
                                    ? 'bg-persian-blue5 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } rounded-md`}
                        >
                            {startPage + i}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 mx-1 bg-persian-blue1 text-white rounded-md disabled:opacity-15"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
