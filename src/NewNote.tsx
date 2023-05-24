import { NoteData, Tag } from './App';
import NoteForm from './NoteForm';

type Props = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}


const NewNote = ({ onSubmit, onAddTag, availableTags }: Props) => {
  return (
    <div>
      <h1 className="mb-4">NewNote</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}></NoteForm>
    </div>
  )
}

export default NewNote;