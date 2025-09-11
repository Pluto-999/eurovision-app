import { FaArrowCircleRight } from "react-icons/fa"
import { FaArrowCircleLeft } from "react-icons/fa"
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import Popup from "./Popup"
import "../styles/pagination.css"

function Pagination({ data, renderDataItem, itemsPerPage }) {

    const [pageNumber, setPageNumber] = useState(0)
    const firstItemIndex = pageNumber * itemsPerPage
    const lastItemIndex = firstItemIndex + itemsPerPage
    const pageCount = Math.ceil(data.length / itemsPerPage)
    
    const displayData = data
        .slice(firstItemIndex, lastItemIndex)
        .map((item => {
           return (
            <>
                {renderDataItem(item)}
            </>
           ) 
        }))

    const handlePageChange = (event) => {
        setPageNumber(event.selected)
    }

    return (
        <>
            {displayData}

            <div className="flex flex-col items-center justify-center gap-2">
                <ReactPaginate 
                    previousLabel={<FaArrowCircleLeft size={30}/>}
                    nextLabel={<FaArrowCircleRight size={30}/>}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName="paginate"
                    previousClassName="prevBtn"
                    nextClassName="nextBtn"
                    pageClassName="page"
                    breakClassName="break"
                />
                <div> Page {pageNumber + 1} of {pageCount} </div>
            </div>
        </>
    )
}

export default Pagination