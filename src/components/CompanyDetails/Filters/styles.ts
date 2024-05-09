import styled from "styled-components";

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

const Button = styled.button<{
    $selected: boolean,
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    border-radius: 3px;

    cursor: pointer;

    border: 1px solid ${({ $selected }) => $selected ? "#2188FF" : "#D8DFE6"};
    background-color: ${({ $selected }) => $selected ? "#2188FF" : "white"};

    padding: 4px 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${({ $selected }) => $selected ? "white" : "#77818C"};

    > svg {
        color: ${({ $selected }) => $selected ? "white" : "#2188FF"};
    }

    > span {
        margin-top: 4px;
    }
`

export const FiltersStyles = {
    Container,
    Button,
}