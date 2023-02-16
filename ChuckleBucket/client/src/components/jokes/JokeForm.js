import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { getAllCategories } from "../../modules/categoriesManager";
import { addJoke } from "../../modules/jokesManager";
import "../forms.css";


const JokeForm = ({ userData }) => {
    const [text, setText] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [categories, setCategories] = useState([]);
    const [textInvalid, setTextInvalid] = useState(false);
    const [categoryInvalid, setCategoryInvalid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
            .then(categoriesData => {
                setCategories(categoriesData)
            });
    }, [])

    const handleTextInput = (event) => {
        setTextInvalid(false);
        setText(event.target.value);
    }

    const handleCategorySelect = (event) => {
        setCategoryInvalid(false);
        setCategoryId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text.trim().length === 0) {
            setTextInvalid(true);
            return null;
        }
        if (categoryId === 0) {
            setCategoryInvalid(true);
            return null;
        }
        addJoke({
            text: text,
            userProfileId: userData.id,
            categoryId: categoryId
        }).then(() => { navigate("/jokes/my") })
    }

    return (
        <>
            <h1 className="page-top margin-bottom">Create a New Joke</h1>
            <Form className="side-margins">
                <FormGroup className="form-group">
                    <Label className="form-label" for="jokeTextInput">Joke Text</Label>
                    <Input type="textarea"
                        id="jokeTextInput"
                        name="text"
                        className="joke-text-input"
                        placeholder="Type joke here..."
                        invalid={textInvalid}
                        onChange={handleTextInput}></Input>
                    <FormFeedback>
                        Must write something here.
                    </FormFeedback>
                </FormGroup>
                <FormGroup className="form-group">
                    <Label for="categorySelect">Category</Label>
                    <Input type="select"
                        id="categorySelect"
                        name="category"
                        invalid={categoryInvalid}
                        onChange={handleCategorySelect}>
                        <option value={0}>Select a category...</option>
                        {categories.map(category => <option key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>)}
                    </Input>
                    <FormFeedback>
                        Must select a category.
                    </FormFeedback>
                </FormGroup>
                <div className="margin-bottom">
                    <Button onClick={handleSubmit}>Submit</Button>
                    {" "}
                    <Button onClick={() => { navigate("/jokes/my") }}>Cancel</Button>
                </div>
            </Form>
        </>
    )
}

export default JokeForm;