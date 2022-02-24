import { octokit } from '../utils/octokit';
import styled from "styled-components";
import { useEffect, useState } from "react";

const IssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;

const IssueRepo = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  padding: 20px;
  box-sizing: content-box;
`
const Context = styled.div`
  height: 100px;
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: start;
  font-weight: normal;
  h2 {
    font-weight: bold;
  }
  p {
    font-size: 1rem;
  }
`;

const Issue = (props) => {
  const [issueData, setIssueData] = useState();

  useEffect(() => {
    props.user.map((user) => 
      searchIssues(user.userName, user.userRepo)
    );
  }, []);
  
  return (
    <IssueWrapper>
      { (issueData) ? (
        <>
        { issueData.map((issue) => 
          <IssueRepo>
            <a href={issue.user.html_url}>
              <UserImage src={issue.user.avatar_url}/>
            </a>
            <a href={issue.html_url}>
              <Context>
                <h2>{issue.title}</h2>
                <p>{issue.body ? issue.body.slice(0, 50) + " ..." : "Empty"}</p>
                <p style={{fontSize: "0.8rem"}}>update at {issue.updated_at.split('T')[0]} by {issue.user.login}</p>
              </Context>
            </a>
          </IssueRepo>
        )}
        </>
        ) : "NOT ISSUE!" 
      }
    </IssueWrapper>
  );

  async function searchIssues(owner, repo) {
    await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo
    }).then(res =>{
      const loadData = res.data;
      setIssueData((prev) => prev ? [...prev, ...loadData] : loadData);
    }).catch((err) => alert(`에러 ${err}`));
  }
}

export default Issue;