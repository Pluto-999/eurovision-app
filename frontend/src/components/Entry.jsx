import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Link } from "react-router-dom"
import Popup from './Popup';
import CountryIndividualEntryPage from '../pages/entries_pages/CountryIndividualEntryPage';

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

  const hasPoints = props.position > 0 && props.position <= 10 ? true : false
  
  const rankedStyle = isRanked ? "bg-indigo-200 hover:bg-indigo-300" : "bg-gray-200 hover:bg-gray-300"

  const points = {
    1: "12",
    2: "10",
    3: "8",
    4: "7",
    5: "6",
    6: "5",
    7: "4",
    8: "3",
    9: "2",
    10: "1"
  }

  return (
    <>
    <div 
        ref={setNodeRef} 
        style={style} 
        className={`p-3 mb-2 rounded-lg shadow cursor-pointer ${rankedStyle}`}
    >
        <div {...attributes} {...listeners}>
          {isRanked ? props.position + ")" : ""} {props.country} {hasPoints ? `: ${points[props.position]} points` : ""}
        </div>
        <ul>
          <li>
            <Popup 
              entryCountry={props.country}
              entryYear={props.year}
              listItems={
                <>
                  <li> View Entry </li>
                </>
              }
              popupContent={
                <CountryIndividualEntryPage 
                  entryCountry={props.country}
                  entryYear={props.year}
                />
              }
            />
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