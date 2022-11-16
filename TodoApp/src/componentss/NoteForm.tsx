import {Form, Stack, Row, Col, Button} from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable';
import {Link, useNavigate} from 'react-router-dom'
import {FormEvent, useRef, useState} from 'react'
import { NoteData, Tag } from '../App';
import {v4 as uuidV4} from 'uuid';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void 
    availableTags: Tag[] 
} & Partial<NoteData>

export function NoteForm({ onSubmit, onAddTag, availableTags, title='', markdown='', tags=[] } : NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null) 
    const markDownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markDownRef.current!.value,
            tags: selectedTags,
        })

        navigate('..')

    }

    return(
        <Form onSubmit={handleSubmit}>
            <Stack
                gap={4}
            >
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                            onCreateOption={label => {
                                const newTag ={id: uuidV4(), label}
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                            }}
                            options={availableTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })}
                            value={selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })}
                             isMulti
                            onChange={tags => {
                                setSelectedTags(tags.map(tag => {
                                    return { label: tag.label, id: tag.value}
                                }))
                            }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Form.Group controlId='markdown'>
                            <Form.Label>Body</Form.Label>
                            <Form.Control defaultValue={markdown} ref={markDownRef} required as='textarea' rows={15} /> 
                        </Form.Group>
                        <Stack direction='horizontal' gap={2} className='justify-content-end'>
                            <Button onClick={handleSubmit} type='submit' variant='primary'>Save</Button>
                            {/* Will bring us to the previous page with '..' */}
                            <Link to='..'>
                            <Button type='button' variant='outline-secondary'>Cancel</Button>
                            </Link>
                        </Stack>
                </Row>
            </Stack>
        </Form>)

}