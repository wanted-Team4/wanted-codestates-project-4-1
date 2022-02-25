import { useState, useEffect } from "react";
import styled from "styled-components";

const RepoListBox = styled.div`
    width: 44em;
    height: 6.5em;
    border-radius: 5px;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
    display: flex;
    justify-content: space-between;
    padding: 0.8em 1em;
    background-color: #ffffff;
    margin-bottom: 1em;
    transition: 0.2s;

    :hover {
    cursor: pointer;
    transform: translateY(-3px);
    }

    >.checked{
        fill: #fd9999;
    }
    >.unchecked{
        fill: #CBC3C3;
    }
`
const InfoBox = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
    max-width: 40em;
`

const ImageBox = styled.img`
    width: 3em;
    height: 3em;
    border-radius: 50%;
    margin-right: 1.5em;
`
const TextBox = styled.div`
`
const Title = styled.p`
    margin-bottom: 0.4em;
    font-size: 1.1em;
    color: #457CC7;
`
const Desc = styled.p`
    width: 45em;
    font-size: 0.8em;
    font-weight: 400;
    margin-bottom: 0.5em;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const Date = styled.p`
    font-size: 0.8em;
    font-weight: 400;
`
const LinkBox = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;

    :visited {
        color: black;
    }
`

const ContentBox = ({ repo }) => {
    const { name, description, updated_at, owner, full_name, html_url } = repo
    const [isOn, setIsOn] = useState(false);


    const toggleHandler = () => {
        setIsOn(!isOn)
    }

    const repoHandler = (fullName, url, title, date) => {
        const name = fullName.split('/')
        let saveRepos = JSON.parse(localStorage.getItem("repoBookmark"));

        if (!saveRepos) {
            const repoBookmark = JSON.stringify([{ user: name[0], repo: name[1], url, title, date }]);
            localStorage.setItem("repoBookmark", repoBookmark);
            toggleHandler();
        } else {
            let check = true;
            saveRepos.forEach((el) => {
                if (el.user === name[0]) {
                    const repoBookmark = JSON.parse(localStorage.getItem("repoBookmark"));
                    const newRepoBookmark = repoBookmark.filter((el) => el.user !== name[0]);
                    localStorage.setItem("repoBookmark", JSON.stringify(newRepoBookmark));
                    toggleHandler();
                    check = false;
                }
            });
            if (saveRepos.length < 4 && check) {
                const addRepoBookmark = JSON.stringify([...saveRepos, { user: name[0], repo: name[1], url, title, date }]);
                localStorage.setItem("repoBookmark", addRepoBookmark);
                toggleHandler();
            } else if (saveRepos.length >= 4 && !isOn) {
                alert("Repository는 최대 4개까지 등록할 수 있습니다");
            }
        }
    };

    let checkSavedRepos = JSON.parse(localStorage.getItem("repoBookmark"));
    const userInfo = full_name.split('/')

    useEffect(() => {
        if (checkSavedRepos) {
            checkSavedRepos.map((repo) => {
                if (repo.user === userInfo[0] && repo.repo === userInfo[1])
                    setIsOn(true);
            })
        }
    }, []);

    console.log(localStorage)

    return (
        <RepoListBox>
            <InfoBox>
                <LinkBox href={html_url} target="_blank">
                    <ImageBox src={owner.avatar_url}></ImageBox>
                    <TextBox>
                        <Title>{name}</Title>
                        <Desc>{description}</Desc>
                        <Date>update at {updated_at.split('T')[0]}</Date>
                    </TextBox>
                </LinkBox>
            </InfoBox>
            <svg
                className={`${isOn ? "checked" : "unchecked"}`}
                onClick={() => repoHandler(full_name, owner.avatar_url, name, updated_at)}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#CBC3C3">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </RepoListBox>
    )
}

export default ContentBox;