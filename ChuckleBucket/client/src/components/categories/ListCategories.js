import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { getAllCategories } from "../../modules/categoriesManager";
import "./categories.css"


const ListCategories = () => {
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const getCategories = () => {
        getAllCategories()
            .then(categoriesData => {
                setCategories(categoriesData)
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <h1 className="page-top margin-bottom">Categories</h1>
            <div className="categories-list">
                {categories.map(category => {
                    return <Button className="strong-margin"
                        key={category.id}
                        onClick={() => { navigate(`/jokes/category/${category.id}`) }}>
                        <h5>{category.name}</h5>
                    </Button>
                })}
            </div>
        </>
    )
}

export default ListCategories;