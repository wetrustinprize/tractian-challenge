import styled from "styled-components";

const Container = styled.div`
    margin: 2px 0;
`

const Data = styled.section<{ $selected?: boolean, $clickable?: boolean; }>`
    padding: 4px;

    display: flex;
    gap: 8px;
    align-items: center;

    cursor: ${({ $clickable }) => $clickable ? "pointer" : "default"};

    background-color: ${({ $selected: selected }) => selected ? "#2188FF" : "transparent"};

    color: ${({ $selected: selected }) => selected ? "white" : "black"};

    > svg {
        color: ${({ $selected: selected }) => selected ? "white" : "#2188FF"};
    }
`

const ChildrenContainer = styled.div`
    margin-left: 32px;
`

export const TreeItemStyles = {
    Container,
    ChildrenContainer,
    Data,
};