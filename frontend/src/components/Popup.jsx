
function Popup({
    entryCountry, 
    entryYear, 
    listItems, 
    popupContent
}) {

    return (
        <li key={entryCountry + entryYear} className="card">
            <button className="btn" onClick={()=>document.getElementById(`modal_${entryCountry}_${entryYear}`).showModal()}>
                <ul>
                    {listItems}
                </ul>
            </button>
            <dialog id={`modal_${entryCountry}_${entryYear}`} className="modal">
            <div className="modal-box w-11/12 max-w-2xl text-center content-center">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
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