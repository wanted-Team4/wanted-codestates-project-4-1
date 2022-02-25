import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Repos } from '../atoms';
import ContentBox from './ContentBox';

const Store = () => {
    const [isOn, setIsOn] = useState(false);
    let saveRepos = JSON.parse(localStorage.getItem('repoBookmark')); //클릭시 issue에 인자로 보내줌
    console.log('>>>', saveRepos);

    const toggleHandler = () => {
        setIsOn(!isOn);
    };

    /*
    date: "2018-11-09T22:47:08Z"
    repo: "Delphi_Calculate"
    title: "Delphi_Calculate"
    url: "https://avatars.githubusercontent.com/u/35592924?v=4"
    user: "HyoGeunGit"
    */

    const bookmarkHandler = () => {
        /*if (!saveRepos) {

        } else {

        }
        */
        let saveRepos = JSON.parse(localStorage.getItem('repoBookmark'));
    };

    return (
        <StoreWrapper>
            {/* {repoBookmark &&
                repoBookmark.map((repoItem, i) => (
                    <Container key={i} onClick={() => {}}>
                        <InfoBox>
                            <ImageBox>
                                <img src={repoItem.url} alt='프로필' />
                            </ImageBox>
                            <TextBox>
                                <Title>{repoItem.title}</Title>
                                <Date>{repoItem.date}</Date>
                            </TextBox>
                        </InfoBox>

                        <svg
                            className={`${isOn ? 'checked' : 'unchecked'}`}
                            onClick={bookmarkHandler}
                            xmlns='http://www.w3.org/2000/svg'
                            height='24px'
                            viewBox='0 0 24 24'
                            width='24px'
                            key={i}
                        >
                            <path d='M0 0h24v24H0z' fill='none' />
                            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                        </svg>
                    </Container>
                ))} */}
        </StoreWrapper>
    );
};

export default Store;

const StoreWrapper = styled.div``;

const Container = styled.div`
    width: 100%;
    border: 1px solid #444;
    height: 100px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
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
    border: black solid 1px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TextBox = styled.div``;

const Title = styled.p`
    margin-bottom: 0.2em;
    font-size: 1.1em;
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
