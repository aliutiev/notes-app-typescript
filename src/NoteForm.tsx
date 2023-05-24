import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Tag } from './App';
import { v4 as uuidV4 } from "uuid";

type Props = {
    // pass our data without a return
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData> // note that this allows for partial data sharing/props, see how they're also declared with default values

const NoteForm = ({ onSubmit, onAddTag, availableTags, title="", markdown="", tags=[] }: Props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags); // auto set to existing tags, this is dope
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        });
        navigate('..')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef} defaultValue={title}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreateableReactSelect
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                options={availableTags.map(tag=>{
                                    return {label: tag.label, value: tag.id}
                                })}

                                isMulti required
                                
                                ></CreateableReactSelect>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as='textarea' rows={15} ref={markdownRef} defaultValue={markdown}></Form.Control>
                </Form.Group>
                <Stack direction='horizontal' gap={2} className="justify-content-end">
                    <Button type="submit">Save</Button>
                    {/* brings you back to previous page */}
                    <Link to="..">
                        <Button type="button" variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>

        </Form>
    )
}

export default NoteForm