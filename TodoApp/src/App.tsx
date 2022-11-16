// to use bootstrap library 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewNote } from './componentss/NewNote';
import { useLocalStorage } from './useLocalStorage';
import {useMemo} from 'react'
// import {v4 as uuidV4} from 'uuid'; // creates string everytime for new id
import { NoteList } from './componentss/NoteList';
import {v4 as uuidV4} from 'uuid';
import { NoteLayout } from './componentss/NoteLayout';
import { Note } from './componentss/Note';
import { EditNote } from './componentss/EditNote';

export type Note = {
  id: string 
 
}  & NoteData
export type NoteData = {
  title: string 
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string 
  label: string
}

export type RawNote ={
  id: string

} & RawNoteData
export type RawNoteData = {
  title: string 
  markdown: string
  tagIds: string[]
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...notes, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4()  , tagIds: tags.map(tag => tag.id)}]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function onUpdateNote(id: string, {tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id) {
          return {...tag, label}
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return( 
  <Container className='my-4'>
  <Routes>
    <Route path='/' element={<NoteList onUpdateTag={updateTag} onDeleteTag={deleteTag} notes={notesWithTags} availableTags={tags} />}/>
    <Route path='/new' element={<NewNote onAddTag={addTag} availableTags={tags} onSubmit={onCreateNote} />}/>

    <Route path='/:id' element={<NoteLayout notes={notesWithTags} />} > 
      <Route index element={<Note onDelete={onDeleteNote} />} />
      <Route path='edit' element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
    </Route>
    {/* When they go to a page that does not exist they get sent back to regular page. This would be useful in many apps */}
    <Route path='*' element={<Navigate to='/' />} /> 


  </Routes>
  </Container>
  )
}

export default App
