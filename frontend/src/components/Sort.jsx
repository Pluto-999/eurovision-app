import { FaSortAlphaDown, FaSortAlphaDownAlt, FaSortAmountDown, FaSortAmountDownAlt, FaSort } from "react-icons/fa"
import { useState } from "react"
import sortHelper from "../utils/sort"

function Sort({ 
    data, 
    setData, 
    endPosition, 
    includeCountry,
    includeYear,
    includeRunningOrder
}) {

    const [sortBy, setSortBy] = useState(null)
    const [sortOrder, setSortOrder] = useState("asc")

    const clickButton = (type) => {

        let nextSortBy = null
        let nextSortOrder = null

        if (type === sortBy) {
            nextSortBy = sortBy
            nextSortOrder = sortOrder === "asc" ? "desc" : "asc"
        }
        else {
            nextSortBy = type
            nextSortOrder = "asc"
        }
        
        setSortBy(nextSortBy)
        setSortOrder(nextSortOrder)

        const sortedData = sortHelper(nextSortBy, nextSortOrder, data)
        setData(sortedData)

    }
    
    return (
        <div className={`dropdown ${endPosition ? "dropdown-end" : ""}`}>
            <div tabIndex={0} role="button" className="btn m-1">
                <FaSort />
                Sort
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            
                <li>
                    <button onClick={() => clickButton("position")}>
                    {sortBy === "position" && sortOrder === "desc" ? 
                        <FaSortAmountDown /> 
                    : 
                        <FaSortAmountDownAlt />
                    }
                    Position
                    </button>
                </li>
            
                {
                    includeRunningOrder ? 
                        <li>
                            <button onClick={() => clickButton("running_order")}>
                            {sortBy === "running_order" && sortOrder === "desc" ? 
                                <FaSortAmountDown /> 
                            : 
                                <FaSortAmountDownAlt />
                            }
                            Running Order
                            </button>
                        </li> 
                    : <></>
                }

                {
                    includeCountry ? 
                    <li>
                        <button onClick={() => clickButton("country")}>
                        {sortBy === "country" && sortOrder === "desc" ? 
                            <FaSortAlphaDownAlt />
                            
                        : 
                            <FaSortAlphaDown /> 
                        }
                        Country
                        </button>
                    </li> 
                    : <></>
                }

                {
                    includeYear ? 
                    <li>
                        <button onClick={() => clickButton("year")}>
                        {sortBy === "year" && sortOrder === "desc" ? 
                            <FaSortAmountDown /> 
                            
                        : 
                            <FaSortAmountDownAlt /> 
                        }
                        Year
                        </button>
                    </li> 
                    : <></>
                }

            </ul>
        </div>
    )
}

export default Sort