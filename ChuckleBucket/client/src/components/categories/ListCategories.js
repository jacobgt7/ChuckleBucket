import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";
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
            <h1>Categories</h1>
            <div className="categories-list">
                {categories.map(category => {
                    return <Badge pill color="light" className="side-margins margin-top" key={category.id}>
                        <Link to={`/jokes/category/${category.id}`}><h4>{category.name}</h4></Link>
                    </Badge>
                })}
            </div>
        </>
    )
}

export default ListCategories;