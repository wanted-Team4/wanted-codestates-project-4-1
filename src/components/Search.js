import { useState, useRef } from "react";
import { octokit } from '../utils/octokit';
import styled from "styled-components";
import ContentBox from "./ContentBox";
import Pagination from "./Pagination";
import Loading from "./Loading";

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
    margin-bottom: 1em;
`

const SearchInput = styled.input`
    width: 50em;
    height: 3em;
    border-radius: 5px;
    margin-right: 0.5em;
    padding-left: 1em;
    border: 1px solid #D1D1D1;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
    :focus {
        outline:none;
        }
`

const SearchBtn = styled.button`
    width: 5em;
    height: 2.8em;
    border-radius: 5px;
    border: none;
    background-color: #457CC7;
    border: 1px solid #457CC7;
    color: #ffffff;
    font-size: 0.9em;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
    :hover {
        cursor: pointer;
        background-color: #ffffff;
        color: #457CC7;
        border: 1px solid #457CC7;
    }
`
const EmptyBox = styled.div`
    height: 42em;
`
const ListBox = styled.div`
    height: 42em;
`

const Search = ({setUpdate}) => {
    const inputRef = useRef("");
    const [repoList, setRepoList] = useState([]);
    const [loading, setLoading] = useState(null);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const getSearchData = async () => {
        await octokit.request(
            'GET /search/repositories', {
            q: inputRef.current.value
        }).then((res) => {
            const loadData = res.data.items;
            setRepoList(loadData);
            setLoading(false);
            if (loadData.length === 0) {
                alert('검색 결과가 없습니다.')
            }
        })
            .catch((err) => alert(`에러 ${err}`));
    };

    const handleSearch = () => {
        if (inputRef.current.value === "") {
            return alert('Repository 제목을 입력해주세요.')
        }
        getSearchData();
        setLoading(true);
    }

    const onClick = () => {
        handleSearch();
    }
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <>
            <Container>
                <SearchBox>
                    <SearchInput
                        type="search"
                        placeholder="Repository 제목을 검색하세요."
                        name="repoSearch"
                        onKeyPress={onKeyPress}
                        ref={inputRef}
                    ></SearchInput>
                    <SearchBtn onClick={onClick}>검색</SearchBtn>
                </SearchBox>{loading ? <Loading /> : <></>}
                <ListBox>
                    {repoList.length === 0 ?
                        <EmptyBox></EmptyBox> : (
                            <>
                                {
                                    repoList.slice(offset, offset + limit).map((repo) => (
                                        < ContentBox
                                            key={repo.id}
                                            repo={repo}
                                            setUpdate={setUpdate}
                                        />
                                    ))
                                }
                                <Pagination
                                    total={repoList.length}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}
                                />
                            </>
                        )}
                </ListBox>
            </Container >
        </>
    )
}

export default Search;
