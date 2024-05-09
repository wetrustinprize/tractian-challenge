import styled from "styled-components";

const Container = styled.div`
    flex: 1 1 auto;

    height: 100%;

    margin: 8px;
    padding: 16px;

    border: 1px solid #D8DFE6;
    border-radius: 4px;
    background-color: white;

    display: flex;
    flex-direction: column;

    overflow: hidden;

    > p.select {
        color: #77818C;

        text-align: center;
    }
`

const Header = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.section`
    display: flex;
    align-items: center;
    gap: 7px;

    >h1 {
        color: #24292F;
        font-size: 28px;
        font-weight: 600;
    }

    >h2 {
        color: #77818C;
        font-size: 14px;
    }
`

const Details = styled.section`
    display: grid;
    grid-template-columns: 20% 80%;
    gap: 6px;
    overflow: hidden;

    flex: 1 1 auto;

    section.left {
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        overflow: hidden;
    }

    section.right {}
`

export const CompanyDetailsStyles = {
    Container,
    Title,
    Details,
    Header,
};