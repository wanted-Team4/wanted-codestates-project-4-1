import styled from "styled-components";
import ContentBox from "./ContentBox";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

const SearchBox = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
`

const SearchInput = styled.input`
    width: 50em;
    height: 3em;
    border-radius: 5px;
    margin-right: 0.5em;
    padding-left: 1em;
    border: 1px solid #D1D1D1;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
`

const SearchBtn = styled.button`
    width: 4em;
    height: 2.8em;
    border-radius: 5px;
    border: none;
    background-color: #457CC7;
    color: #ffffff;
    font-size: 0.9em;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
`

const RepoBox = styled.div`
    
`

const Search = () => {
    return (
        <Container>
            <SearchBox>
                <SearchInput placeholder="Repository 제목을 검색하세요."></SearchInput>
                <SearchBtn>검색</SearchBtn>
            </SearchBox>
            <ContentBox />
        </Container>
    )
}

export default Search;