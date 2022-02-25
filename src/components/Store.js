import React from 'react';
import styled from 'styled-components';
import { useState, useCallback } from 'react';

const Store = ({ setIssueRepo, setUpdate, setCurrntTab }) => {
    const [isOn, setIsOn] = useState(false);
    let repoBookmark = JSON.parse(localStorage.getItem('repoBookmark')); //클릭시 issue에 인자로 보내줌

    const toggleHandler = () => {
        setIsOn(!isOn);
        setUpdate(prev => !prev);
    };

    const bookmarkHandler = (name, repo, url, title, date) => {
        let saveRepos = JSON.parse(localStorage.getItem("repoBookmark"));

        if (!saveRepos) {
            const repoBookmark = JSON.stringify([{ user: name, repo: repo, url, title, date }]);
            localStorage.setItem("repoBookmark", repoBookmark);
            toggleHandler();
        } else {
            let check = true;
            saveRepos.forEach((el) => {
                if (el.user === name) {
                    const repoBookmark = JSON.parse(localStorage.getItem("repoBookmark"));
                    const newRepoBookmark = repoBookmark.filter((el) => el.user !== name);
                    localStorage.setItem("repoBookmark", JSON.stringify(newRepoBookmark));
                    toggleHandler();
                    check = false;
                }
            });
            if (saveRepos.length < 4 && check) {
                const addRepoBookmark = JSON.stringify([...saveRepos, { user: name, repo: repo, url, title, date }]);
                localStorage.setItem("repoBookmark", addRepoBookmark);
                toggleHandler();
            }
        }
    };

    const issueHandler = (item) => {
        setIssueRepo({
            user: item.user,
            repo: item.repo
        })
        setCurrntTab(1);
    };
    /*
    date: "2018-11-09T22:47:08Z"
    repo: "Delphi_Calculate"
    title: "Delphi_Calculate"
    url: "https://avatars.githubusercontent.com/u/35592924?v=4"
    user: "HyoGeunGit"
    */

    return (
        <>
            {repoBookmark.length !== 0 ? (
                repoBookmark &&
                repoBookmark.map((repoItem, i) => (
                    <RepoListBox key={i}>
                        <InfoBox onClick={() => issueHandler(repoItem)}>
                            <ImageBox>
                                <img src={repoItem.url} alt='프로필' />
                            </ImageBox>
                            <TextBox>
                                <Title>{repoItem.title}</Title>
                                <Date>
                                    update at {repoItem.date.split('T')[0]}
                                </Date>
                            </TextBox>
                        </InfoBox>

                        <svg
                            className='checked'
                            onClick={() => {
                                bookmarkHandler(repoItem.user,
                                    repoItem.repo,
                                    repoItem.url,
                                    repoItem.title,
                                    repoItem.date)
                            }}
                            xmlns='http://www.w3.org/2000/svg'
                            height='24px'
                            viewBox='0 0 24 24'
                            width='24px'
                            key={i}
                        >
                            <path d='M0 0h24v24H0z' fill='none' />
                            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                        </svg>
                    </RepoListBox>
                ))
            ) : (
                <>
                    <MessageBox>북마크에 Repository를 추가해보세요!</MessageBox>
                </>
            )}
        </>
    );
};

export default Store;

const RepoListBox = styled.div`
    width: 90%;
    height: 6.5em;
    border-radius: 5px;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
    display: flex;
    justify-content: space-between;
    padding: 0.8em 1em;
    margin-left: 5%;
    background-color: #ffffff;
    margin-bottom: 1em;
    transition: 0.2s;

    :hover {
        cursor: pointer;
        transform: translateY(-3px);
    }

    > .checked {
        fill: #fd9999;
    }
    > .unchecked {
        fill: #cbc3c3;
    }
`;

const InfoBox = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
    max-width: 40em;
`;

const ImageBox = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TextBox = styled.div`
    padding: 1rem;
`;

const Title = styled.p`
    margin-bottom: 0.2em;
    font-size: 1.1em;
    color: #457cc7;
    font-weight: bold;
`;

const Desc = styled.p`
    font-size: 0.8em;
    font-weight: 400;
    margin-bottom: 0.2em;
`;
const Date = styled.p`
    font-size: 0.8em;
    font-weight: 400;
`;

const MessageBox = styled.p`
    text-align: center;
    padding: 1rem;
`;
