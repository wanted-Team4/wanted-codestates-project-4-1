import { octokit } from '../utils/octokit';
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { Repos } from '../atoms';
import styled from "styled-components";
import Search from "../components/Search";
import Issue from "../components/Issue";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Navbar = styled.div`
  width: 100%;
`;

const LogoText = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin-left: 0.7em;
  margin-top: 0.7em;
  margin-bottom: 1em;
`;

const TabMenu = styled.ul`
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    list-style: none;
    padding: 0;

    .submenu {
        padding: 0.5rem;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #457CC7;
    }

    .focused {
        border-bottom: 5px solid #457CC7;
    }
`;

const Desc = styled.div`
    text-align: center;
    padding: 2.5rem 0;
    font-weight: bold;
    background-color: #f1f1f1;
    height: 100%;
`;

const Home = () => {
  const [repoData, setRepoData] = useState();
  const [issueData, setIssueData] = useState();
  const [repos, setRepos] = useRecoilState(Repos);
  const [currentTab, setCurrntTab] = useState(0)

  const user = [
    {
      userName: 'songgao',
      userRepo: 'water',
    },
    {
      userName: 'balderdashy',
      userRepo: 'waterline',
    },
  ];

  const menuArr = [
    { name: 'Search', content: <Search /> },
    {
      name: 'Issue',
      content: <Issue user={user}></Issue>
    }
  ];

  // const menuArr = [
  //   { name: 'Search', content: <Search /> },
  //   { name: 'Issue', content: <Issue userName='songgao' userRepo='water'></Issue> }
  // ];

  const selectMenuHandler = (index) => {
    setCurrntTab(index)
  };

  const addRepo = () => setRepos({ 1: '1', });

  useEffect(() => {
    searchRepo('water');
    searchIssues('songgao', 'water');
  }, []);

  // if (repoData)
  //   console.log(repoData[0].full_name.split('/'));
  // console.log(issueData);

  return (
    <MainContainer>
      <Navbar>
        <LogoText>PayHere</LogoText>
        <TabMenu>
          {menuArr.map((el, idx) => (
            <li
              key={idx}
              onClick={() => selectMenuHandler(idx)}
              className={idx === currentTab ? 'submenu focused' : 'submenu'}
            >{el.name}</li>
          ))}
        </TabMenu>
      </Navbar>
      <Desc>
        {menuArr[currentTab].content}
      </Desc>
    </MainContainer>
  );

  async function searchRepo(q) {
    await octokit.request(
      'GET /search/repositories', {
      q: q
    }).then(res => {
      const loadData = res.data.items;
      setRepoData(loadData);
    }).catch((err) => alert(`에러 ${err}`));
  }

  async function searchIssues(owner, repo) {
    await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo
    }).then(res => {
      const loadData = res.data;
      setIssueData(loadData);
    }).catch((err) => alert(`에러 ${err}`));
  }
}
export default Home;