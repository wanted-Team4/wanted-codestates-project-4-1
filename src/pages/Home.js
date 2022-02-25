import { octokit } from '../utils/octokit';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Repos } from '../atoms';
import styled from 'styled-components';
import Issue from '../components/Issue';
import Store from '../components/Store';
import Search from '../components/Search';

const Container = styled.div`
    display: flex;
`;
const MainContainer = styled.div`
    width: 70%;
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
        border-bottom: 1px solid #457cc7;
    }

    .focused {
        border-bottom: 5px solid #457cc7;
    }
`;

const MenuContent = styled.li`
    height: 100%;
`;

const Desc = styled.div`
    text-align: center;
    padding: 2.5em 0 4em 0;
    font-weight: bold;
`;

const StoreContainer = styled.div`
    width: 30%;
    height: 100vh;
    border-left: solid 1px #457cc7;

    h2 {
        font-size: 1.5em;
        font-weight: bold;
        width: 100%;
        height: 155px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 1rem 0;
    }
`;

const Home = () => {
    const [repoData, setRepoData] = useState();
    const [issueData, setIssueData] = useState();
    const [repos, setRepos] = useRecoilState(Repos);
    const [currentTab, setCurrntTab] = useState(0);
    const [repoList, setRepoList] = useState([]);

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
        {
            name: 'Search',
            content: <Search repoList={repoList} setRepoList={setRepoList} />,
        },
        {
            name: 'Issue',
            content: <Issue user={user}></Issue>,
        },
        {
            name: 'Store',
            content: <Store repoList={repoList}></Store>,
        },
    ];

    // const menuArr = [
    //   { name: 'Search', content: <Search repoList={repoList} setRepoList={setRepoList} /> },
    //   { name: 'Issue', content: <Issue userName='songgao' userRepo='water'></Issue> }
    // ];

    const selectMenuHandler = (index) => {
        setCurrntTab(index);
    };

    const addRepo = () => setRepos({ 1: '1' });

    useEffect(() => {
        searchRepo('water');
        searchIssues('songgao', 'water');
    }, []);

    if (repoData) console.log(repoData[0].full_name.split('/'));
    console.log(issueData);

    return (
        <Container>
            <MainContainer>
                <Navbar>
                    <LogoText>PayHere</LogoText>

                    <TabMenu>
                        {menuArr.map((el, idx) => (
                            <li
                                key={idx}
                                onClick={() => selectMenuHandler(idx)}
                                className={
                                    idx === currentTab
                                        ? 'submenu focused'
                                        : 'submenu'
                                }
                            >
                                {el.name}
                            </li>
                        ))}
                    </TabMenu>
                </Navbar>
                <Desc>
                    <p>{menuArr[currentTab].content}</p>
                </Desc>
            </MainContainer>
            <StoreContainer>
                <h2>Public Repository</h2>
                <Store repoList={repoList} />
            </StoreContainer>
        </Container>
    );

    async function searchRepo(q) {
        await octokit
            .request('GET /search/repositories', {
                q: q,
            })
            .then((res) => {
                const loadData = res.data.items;
                setRepoData(loadData);
            })
            .catch((err) => alert(`에러 ${err}`));
    }

    async function searchIssues(owner, repo) {
        await octokit
            .request('GET /repos/{owner}/{repo}/issues', {
                owner: owner,
                repo: repo,
            })
            .then((res) => {
                const loadData = res.data;
                setIssueData(loadData);
            })
            .catch((err) => alert(`에러 ${err}`));
    }
};
export default Home;
