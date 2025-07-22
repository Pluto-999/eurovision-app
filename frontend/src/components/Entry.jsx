import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Link } from "react-router-dom"

function Entry(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isRanked = props.position > 0 ? true : false
  
  const rankedStyle = isRanked ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-500 hover:bg-gray-400"

  return (
    <>
    <div 
        ref={setNodeRef} 
        style={style} 
        className={`p-3 mb-2 rounded-lg shadow cursor-pointer ${rankedStyle}`}
    >
        <div {...attributes} {...listeners}>
            {isRanked ? props.position : ""} {props.country}, {props.year} 
        </div>
        <Link 
            to={`/entries/${props.country}/${props.year}`}
            onClick={(e) => e.stopPropagation()}
            className="text-gray-800 hover:text-blue-600 font-medium"
        > 
        View Entry
        </Link>
    </div>
    </>
  );
}

export default Entry