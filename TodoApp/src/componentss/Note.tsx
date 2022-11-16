import { useNote } from "./NoteLayout"
import {Row, Col, Stack, Badge, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({onDelete}: NoteProps) {
    const navigate = useNavigate()
    const note = useNote()

    return <>
        <Row className="align-items-center mb-4">
            <Col>
                <h1>{note.title}</h1> 
                {note.tags.length > 0 && (
                    <Stack gap={2} className='align-items-center justify-content-center h-100'>
                    <span className='fs-5'>{note.title}</span>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction='horizontal'
                        className='justify-content-center flex-wrap'
                        >
                            {note.tags.map(tag => (
                                <Badge className='text-truncate' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                            </Stack>
                    )}
                </Stack>
                )}
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction='horizontal'>
                    <Link to={`/${note.id}/edit`}>
                        <Button variant='primary'>
                            Edit
                        </Button>
                    </Link>
                    <Button variant='outline-danger' onClick={() => {
                        onDelete(note.id)
                        navigate('/')
                    }}>Delete</Button>
                    <Link to='/'>
                        <Button variant='outline-danger'>Back</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
}