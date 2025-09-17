import { Rating } from "react-simple-star-rating"
import "../styles/table.css"

function ResultsTable({
    includePoints,
    includeRunningOrder,
    includeStarsRating,
    results,
    renderPopupContent
}) {
    return (
        <>
        <table>
            <thead>
            <tr>
                <th> Position </th>
                <th> Country </th>
                {includePoints && <th> Points </th>}
                {includeRunningOrder && <th> Running Order </th>}
                {includeStarsRating && <th> Rating </th>} 
            </tr>
            </thead>
            <tbody>
                {results.map(result => (
                    <tr
                        key={result.country + result.year}
                        onClick={() => document.getElementById(`modal_${result.country}_${result.year}`).showModal()}
                        className={
                            `hover:bg-[#646cff] cursor-pointer
                            ${result.position <= 0 ? "bg-gray-300" : ""}
                            `
                        }
                    >
                        <td> {result.position > 0 ? (
                            <> {result.position} </>
                        ): (
                            <div> - </div>
                        )} </td>
                        <td> {result.country} </td>
                        {includePoints && <td> {result.points} </td>}
                        {includeRunningOrder && <td> {result.running_order} </td>}
                        {includeStarsRating && 
                            <td>
                            {result.stars_rating === 0 ? (
                                <Rating 
                                    readonly
                                    SVGclassName="inline"
                                />
                            ) : (
                                <Rating
                                    readonly
                                    initialValue={result.rating}
                                    SVGclassName="inline"
                                />
                            )}
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>

        {results.map(result => (
            <dialog 
                key={result.country + result.year}
                id={`modal_${result.country}_${result.year}`} className="modal"
            >
                <div className="modal-box w-11/12 max-w-2xl text-center content-center">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {renderPopupContent(result)}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        ))}
        </>
    )
}

export default ResultsTable