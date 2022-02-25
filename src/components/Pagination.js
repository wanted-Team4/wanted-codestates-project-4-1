import { useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 1em;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin: 0;
  background: #041562;
  border: 1px solid #041562;
  color: white;
  font-size: 1rem;

  &:hover {
    background: #ffffff;
    color: #041562;
    border: 1px solid #041562;
    cursor: pointer;
    font-weight: bold;
  }

  &[aria-current] {
    background: #ffffff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: #041562;
    border: 1px solid #041562;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  const [start, setStart] = useState(1);

  const prev = () => {
    if (page === start && page !== 1){
      if(page - 3 <= 1)
        setStart(prev => prev - 1)
      else setStart(prev => prev - 3)
    }
    setPage(page - 1)
  }

  const next = () => {
    if (page === start + 4 && page !== numPages){
      if(page + 3 >= numPages)
        setStart(prev => prev + 1) 
      else  setStart(prev => prev + 3)
    }
    setPage(page + 1)
  }

  return (
    <>
      <Nav>
        <Button onClick={prev} disabled={page === 1}>
          &lt;
        </Button>
        {Array( ( Math.ceil(total/limit) < 5) ? Math.ceil(total/limit) : 5)
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

export default Pagination;