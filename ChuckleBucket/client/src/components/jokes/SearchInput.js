import { useState } from "react";
import { Button, Input } from "reactstrap";


const SearchInput = ({ setSearchTerms }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();

        const arrayOfTerms = searchInput.split(" ");
        let searchTermsString = "%%";
        arrayOfTerms.forEach(term => { searchTermsString += `%${term}%` });
        setSearchTerms(searchTermsString);
    }

    return (
        <div className="search-input-container">
            <Input type="text"
                name="search"
                value={searchInput}
                onChange={(e) => { setSearchInput(e.target.value) }} />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    )
}

export default SearchInput;