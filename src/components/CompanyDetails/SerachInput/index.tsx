import { useRef, useState } from "react";
import { SearchInputStyles } from "./styles";

import SearchIcon from "./search.svg?react";
import store from "../../../store";

const SearchInput: React.FC = () => {
    const debounceTimeout = useRef<number | null>(null);
    const [search, setSearch] = useState<string>('');

    const handleSetSearch = (search: string) => {
        setSearch(search);

        if (debounceTimeout.current !== null) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            store.setState({ searchParams: search });
        }, 500);
    }

    return (
        <SearchInputStyles.Container>
            <SearchInputStyles.Input
                type="text"
                value={search}
                onChange={e => handleSetSearch(e.target.value)}
                placeholder="Search for assets or locations..."
            />
            <SearchIcon />
        </SearchInputStyles.Container>
    );
};

export default SearchInput;