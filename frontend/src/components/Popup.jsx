
function Popup({entry, listItems, popupContent}) {

    return (
        <li key={entry.country + entry.year} className="card">
            <button className="btn link" onClick={()=>document.getElementById(`modal_${entry.country}_${entry.year}`).showModal()}>
                <ul>
                    {listItems}
                </ul>
            </button>
            <dialog id={`modal_${entry.country}_${entry.year}`} className="modal">
            <div className="modal-box w-11/12 max-w-2xl text-center content-center">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {/* <CountryIndividualEntryPage entry={entry} /> */}
                {popupContent}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
            </dialog>
        </li>
    )
}

export default Popup