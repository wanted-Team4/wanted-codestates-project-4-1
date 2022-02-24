import styled from "styled-components";

const RepoListBox = styled.div`
    width: 44em;
    height: 5.5em;
    border-radius: 5px;
    box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
    display: flex;
    justify-content: space-between;
    padding: 0.8em 1em;
    background-color: #ffffff;
`
const InfoBox = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
`

const ImageBox = styled.img`
    width: 3em;
    height: 3em;
    border: 1px solid black;
    border-radius: 50%;
    margin-right: 1.5em;
`
const TextBox = styled.div`
`
const Title = styled.p`
    margin-bottom: 0.2em;
    font-size: 1.1em;
`
const Desc = styled.p`
    font-size: 0.8em;
    font-weight: 400;
    margin-bottom: 0.2em;
`
const Date = styled.p`
    font-size: 0.8em;
    font-weight: 400;
`

const ContentBox = () => {
    return (
        <RepoListBox>
            <InfoBox>
                <ImageBox src="logo192.png"></ImageBox>
                <TextBox>
                    <Title>제목입니다</Title>
                    <Desc>내용 설명입니다</Desc>
                    <Date>2021.01.21</Date>
                </TextBox>
            </InfoBox>
            <svg
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