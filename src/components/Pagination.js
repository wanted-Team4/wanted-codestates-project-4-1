import { useState } from "react";
import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  const [start, setStart] = useState(1);

  const prev = () => {
    if(page === start && page !== 1)
      setStart(prev => prev - 3)
    setPage(page - 1)
  }

  const next = () => {
    if(page === start+4 && page !== numPages)
      setStart(prev => prev + 3)
    setPage(page + 1)
  }
  
  return (
    <>
      <Nav>
        <Button onClick={prev} disabled={page === 1}>
          &lt;
        </Button>
        {Array(5)
          .fill()
          .map((_, i) => (
            <Button
              key={i + start}
              onClick={() => setPage(i + start)}
              aria-current={page === i + start ? "page" : null}
            >
              {i + start}
            </Button>
          ))}
        <Button onClick={next} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;