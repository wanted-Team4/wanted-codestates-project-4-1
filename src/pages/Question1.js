import { octokit } from '../utils/octokit';
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { Repos } from '../atoms';

const Question1 = () => {
  const [repoData, setRepoData] = useState();
  const [issueData, setIssueData] = useState();
  const [repos, setRepos] = useRecoilState(Repos);

  const addRepo = () => setRepos({1:'1',});
  
  useEffect(() => {
    searchRepo('water');
    searchIssues('songgao', 'water');
    if(repoData)
      console.log(repoData[0].full_name.split('/'));
    console.log(issueData);
  }, []);

  return (
    <>
      <div>1</div>
    </>
  );

  async function searchRepo(q) {
    await octokit.request(
      'GET /search/repositories', {
        q: q
    }).then(res =>{
      const loadData = res.data.items;
      setRepoData(loadData);
    }).catch((err) => alert(`에러 ${err}`));
  }

  async function searchIssues(owner, repo) {
    await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo
    }).then(res =>{
      const loadData = res.data;
      setIssueData(loadData);
    }).catch((err) => alert(`에러 ${err}`));
  }
}
export default Question1;