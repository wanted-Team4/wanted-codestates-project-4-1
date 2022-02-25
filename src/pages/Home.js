import { useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import Issue from "../components/Issue";
import Store from '../components/Store';


const Container = styled.main`
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
    padding-top: 2.5em;
    font-weight: bold;
    background-color: #f1f1f1;
`;

const StoreContainer = styled.div`
    width: 30%;
    height: 100vh;
    border-left: solid 1px #457CC7;

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
  let saveRepos = JSON.parse(localStorage.getItem("repoBookmark"));
  const [currentTab, setCurrntTab] = useState(0);

  const menuArr = [
    {
      name: 'Search',
      content: <Search />,
    },
    {
      name: 'Issue',
      content: <Issue user={saveRepos} />
    }
  ];

  const selectMenuHandler = (index) => {
    setCurrntTab(index);
  };

  return (
    <Container>
      <MainContainer>
        <Navbar>
          <LogoText>PayHere</LogoText>
          <TabMenu>
            {menuArr.map((el, idx) => (
              <MenuContent
                key={idx}
                onClick={() => selectMenuHandler(idx)}
                className={
                  idx === currentTab
                    ? 'submenu focused'
                    : 'submenu'
                }
              >
                {el.name}
              </MenuContent>
            ))}
          </TabMenu>
        </Navbar>
        <Desc>
          {menuArr[currentTab].content}
        </Desc>
      </MainContainer>
      <StoreContainer>
        <h2>Public Repository</h2>
        <Store />
      </StoreContainer>
    </Container>
  );
};

export default Home;
