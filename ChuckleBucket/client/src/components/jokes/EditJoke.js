import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { getAllCategories } from "../../modules/categoriesManager";
import { deleteJoke, getJokeById, updateJoke } from "../../modules/jokesManager";


const EditJoke = ({ userData }) => {
    const [text, setText] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [authorId, setAuthorId] = useState(0);
    const [jokeId, setJokeId] = useState(0);
    const [categories, setCategories] = useState([]);
    const [textInvalid, setTextInvalid] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getJokeById(id)
            .then(jokeData => {
                setText(jokeData.text);
                setCategoryId(jokeData.categoryId);
                setAuthorId(jokeData.userProfileId);
                setJokeId(jokeData.id);
            })

        getAllCategories()
            .then(categoriesData => {
                setCategories(categoriesData);
            })
    }, []);

    const handleTextInput = (event) => {
        setTextInvalid(false);
        setText(event.target.value);
    }

    const handleCategorySelect = (event) => {
        setCategoryId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text.trim().length === 0) {
            setTextInvalid(true);
            return null;
        }
        updateJoke(id, {
            id: jokeId,
            text: text,
            categoryId: categoryId
        }).then(() => { navigate("/jokes/my") })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteJoke(jokeId)
            .then(() => {
                navigate("/jokes/my")
            })
    }

    if (userData.id !== authorId) {
        return <h3>Whoops!  You are not authorized to edit this joke.</h3>;
    }

    return (
        <>
            <h1>Edit Joke</h1>
            <Form>
                <FormGroup>
                    <Label for="jokeTextInput">Joke Text</Label>
                    <Input type="textarea"
                        id="jokeTextInput"
                        name="text"
                        value={text}
                        invalid={textInvalid}
                        onChange={handleTextInput}></Input>
                    <FormFeedback>
                        Must write something here.
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="categorySelect">Category</Label>
                    <Input type="select"
                        id="categorySelect"
                        name="category"
                        defaultValue={categoryId}
                        onChange={handleCategorySelect}>
                        {categories.map(category => <option key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>)}
                    </Input>
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
                {' '}
                <Button onClick={() => { navigate("/jokes/my") }}>Cancel</Button>
                {' '}
                {confirmDelete ? <>Delete? <Button onClick={handleDelete} color="danger">Yes</Button>
                    <Button onClick={() => { setConfirmDelete(false) }}>No</Button></>
                    : <Button color="danger" onClick={() => { setConfirmDelete(true) }}>Delete</Button>}

            </Form>
        </>
    )
}

export default EditJoke;