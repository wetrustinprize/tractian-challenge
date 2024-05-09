import styled from "styled-components";

const Container = styled.header`
    height: 48px;
    padding: 0px 16px;

    background-color: #17192D;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;

    > section.left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    > section.center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    > section.right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`

const Companies = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`

const CompanyButton = styled.button<{
    $selected: boolean
}>`
    background-color: ${props => props.$selected ? "#2188FF" : "#023B78"};

    border-radius: 2px;
    padding: 4px 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    color: white;
    font-weight: 600;
    font-size: 12px;

    > svg {
        height: 14px;
        width: 14px;
    }

    cursor: pointer;
`

export const HeaderStyles = {
    Container,
    Companies,
    CompanyButton
}