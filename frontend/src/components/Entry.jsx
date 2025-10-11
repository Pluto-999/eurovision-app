import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Popup from './Popup';
import CountryIndividualEntryPage from '../pages/entries_pages/CountryIndividualEntryPage';
import { FaArrowsUpDown } from "react-icons/fa6"
import ChangeRating from "./ChangeRating"

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
    <div 
        ref={setNodeRef} 
        style={style} 
        className={`flex justify-between p-3 mb-2 rounded-lg shadow cursor-pointer ${rankedStyle} cursor-default`}
    >
        <div className='flex items-center gap-5'>
          <div 
            {...attributes} 
            {...listeners} 
            className='cursor-grab'
            title='Drag to change ranking'  
          >
            <FaArrowsUpDown size={50} />
          </div>
          <div className='text-lg'>
            {isRanked ? props.position + "." : ""} {props.country} {hasPoints ? `: ${points[props.position]} points` : ""}
          </div>
        </div>
        
        <div className="flex gap-5">
          <ChangeRating 
            country={props.country}
            year={props.year}
          />

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
        </div>
    </div>
  );
}

export default Entry