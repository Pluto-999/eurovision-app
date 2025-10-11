import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import Entry from "../../components/Entry"
import "ldrs/react/Ring.css"

function CurrentUserRanking() {
    const params = useParams()
    const [allEntries, setAllEntries] = useState([])
    const sensors = useSensors(
        useSensor(PointerSensor)
    )

    function fetchRankings() {
        axios.get(`http://localhost:3000/api/ranking/currentUserRankings/${params.year}`,
            { withCredentials: true }
        )
        .then((response) => {
            const unranked = response.data.unranked_entries
            const ranked = response.data.ranked_entries
            setAllEntries(ranked.concat(unranked))
        })
        .catch(error => {
            if (error.response?.status === 401) {
                return
            }
            if (error.response?.data?.message) {
                toast(error.response.data.message)
            }
            else {
                toast("Something has gone wrong, please try again")
            }
        })
    }

    useEffect(() => {
        fetchRankings()
    }, [])

    function handleDragEnd(event) {
        const {active, over} = event
        
        const activeId = active.id
        const overId = over.id

        const activeEntry = allEntries.find(entry => entry.country + entry.year === activeId)

        const overEntry = allEntries.find(entry => entry.country + entry.year === overId)
        
        if (!activeEntry || !overEntry) {
            return
        }

        const newPosition = allEntries.findIndex(
            entry => entry.country + entry.year === overId
        ) + 1


        axios.patch("http://localhost:3000/api/ranking/changeRanking", {
            country: activeEntry.country,
            year: activeEntry.year,
            position: newPosition
        }, { withCredentials: true })
        .then(() => {
            fetchRankings()
            toast.success("Ranking successfully updated")
        })
        .catch(error => {
            toast.error(error.response?.data?.message || "An error has occurred updating ranking. Please try again")
        })

    }

    return (
        <div className="whole_page w-full">
            <h1> My {params.year} Ranking</h1>
            
            <DndContext 
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCenter}
            >
                <SortableContext
                    items={allEntries.map(entry => entry.country + entry.year)}
                    strategy={rectSortingStrategy}
                >
                    {
                        allEntries.map(entry => (
                            <Entry 
                                key={entry.country + entry.year} 
                                id={entry.country + entry.year}
                                country={entry.country}
                                year={entry.year}
                                position={entry.position}
                            />
                        ))
                    }
                </SortableContext>
                
                <DragOverlay />
            </DndContext>
        </div>
    )
}

export default CurrentUserRanking