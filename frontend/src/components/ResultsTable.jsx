
function ResultsTable({
    includeRunningOrder,
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
                <th> Points </th>
                { includeRunningOrder && <th> Running Order </th> }
            </tr>
            </thead>
            <tbody>
                {results.map(result => (
                    <tr
                        key={result.country + result.year}
                        onClick={() => document.getElementById(`modal_${result.country}_${result.year}`).showModal()}
                    >
                        <td> {result.position} </td>
                        <td> {result.country} </td>
                        <td> {result.points} </td>
                        { includeRunningOrder && <td> {result.running_order} </td> }
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
                    { renderPopupContent(result) }
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