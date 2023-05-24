import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from './App'

type Props = {
    notes: Note[]
}

const NoteLayout = ({ notes }: Props) => {

    const { id } = useParams();
    const note = notes.find(n => n.id === id)

    if (note === null) return <Navigate to="/" replace></Navigate>;

    return <Outlet context={note} />
}

export function useNote() {
    return useOutletContext<Note>()
}

export default NoteLayout;