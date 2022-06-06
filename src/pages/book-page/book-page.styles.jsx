import styled from 'styled-components';


export const BookPageContainer = styled.div`
.book-page {
  margin-top: 50px;
  display: flex;
  flex-direction: row;

  .menu-item {
    margin-left: 5vw;
    height: 450px;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 20%;
    overflow: hidden;

    .background-image {
      width: 100%;
      height: 100%;

      background-position: center;
      background-size: cover;
    }
  }

  .description{
      margin-left: 10vw;
      width: 78%;
      font-size: medium;

      .buttons{
          .button{
              margin-top: 10px;
          }

      }
  }
  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
    justify-content:center;
    margin:auto;
    .menu-item {
        height: 350px;
        width: 250px;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 20%;
        overflow: hidden;
    
        .background-image {
          width: 100%;
          height: 100%;
    
          background-position: center;
          background-size: cover;
        }      
    }

  }
}

  `;
