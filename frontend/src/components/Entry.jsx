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
  
  const rankedStyle = isRanked ? "bg-indigo-200 hover:bg-indigo-300" : "bg-gray-200 hover:bg-gray-300"

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
        <ul>
          <li>
            <Link 
              to={`/entries/${props.country}/${props.year}`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-800 hover:text-blue-600 font-medium"
            > 
            View Entry
            </Link>
          </li>
          <li>
            <Link
              to={`/user/change_rating/${props.country}/${props.year}`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Edit Rating
            </Link>
          </li>
      </ul>
    </div>
    </>
  );
}

export default Entry