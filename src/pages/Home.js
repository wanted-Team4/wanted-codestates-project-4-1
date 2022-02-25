import { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import Issue from "../components/Issue";

const MainContainer = styled.main`
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

const MenuContent = styled.li`
  height: 100%;
`;

const Desc = styled.div`
    text-align: center;
    padding: 2.5em 0 4em 0;
    font-weight: bold;
    background-color: #f1f1f1;
    height: 100%;
`;

const Home = () => {
  let saveRepos = JSON.parse(localStorage.getItem("repoBookmark"));
  const [currentTab, setCurrntTab] = useState(0)

  const menuArr = [
    { name: 'Search', content: <Search /> },
    {
      name: 'Issue',
      content: <Issue user={saveRepos} />
    }
  ];

  const selectMenuHandler = (index) => {
    setCurrntTab(index)
  };

  return (
    <MainContainer>
      <Navbar>
        <LogoText>PayHere</LogoText>
        <TabMenu>
          {menuArr.map((el, idx) => (
            <MenuContent
              key={idx}
              onClick={() => selectMenuHandler(idx)}
              className={idx === currentTab ? 'submenu focused' : 'submenu'}
            >{el.name}</MenuContent>
          ))}
        </TabMenu>
      </Navbar>
      <Desc>
        {menuArr[currentTab].content}
      </Desc>
    </MainContainer>
  );
}
export default Home;