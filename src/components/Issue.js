import { octokit } from '../utils/octokit';
import styled from "styled-components";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const IssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

const Issues = styled.div`
  height: 100%;
`;

const IssueRepo = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
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

const Issue = ({ user }) => {
  const [issueList, setIssueList] = useState();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    user.map((user) =>
      searchIssues(user.user, user.repo)
    );
  }, []);

  return (
    <IssueWrapper>
      {(issueList) ? (
        <>
          <Issues>
            {issueList.slice(offset, offset + limit).map((issue) =>
              <IssueRepo key={issue.id}>
                <a href={issue.user.html_url} target="_blank">
                  <UserImage src={issue.user.avatar_url} />
                </a>
                <a href={issue.html_url} target="_blank">
                  <Context>
                    <h2>{issue.title}</h2>
                    <p>{issue.body ? issue.body.slice(0, 50) + " ..." : "Empty"}</p>
                    <p style={{ fontSize: "0.8rem" }}>update at {issue.updated_at.split('T')[0]} by {issue.user.login}</p>
                  </Context>
                </a>
              </IssueRepo>
            )}
          </Issues>
          <Pagination
            total={issueList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </>
      ) : "NOT ISSUE!"
      }
    </IssueWrapper>
  );

  async function searchIssues(owner, repo) {
    await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo
    }).then(res => {
      const loadData = res.data;
      setIssueList((prev) => prev ? [...prev, ...loadData] : loadData);
    }).catch((err) => alert(`에러 ${err}`));
  }
}

export default Issue;