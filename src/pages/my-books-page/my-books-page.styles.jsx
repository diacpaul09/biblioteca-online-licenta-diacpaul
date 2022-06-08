import styled from 'styled-components';


export const MyBooksPageContainer = styled.div`
.currently-reading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;

    @media screen and (max-width: 800px) {
        display:flexx;
        justify-content:center;
        flex-wrap:wrap;
    }
  }
  `;