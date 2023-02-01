import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../modules/categoriesManager";
import "./categories.css"


const ListCategories = () => {
    const [categories, setCategories] = useState([]);

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
            <ul className="categories-list">
                {categories.map(category => {
                    return <li className="category">
                        <Link to={`/jokes/category/${category.id}`}>{category.name}</Link>
                    </li>
                })}
            </ul>
        </>
    )
}

export default ListCategories;