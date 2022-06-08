import styled from 'styled-components';


export const CurrentlyReadingContainer = styled.div`
.book-info {  
    margin-top: 20px;
    background-color: gainsboro;
    width: 600px;
    display: flex;

    border: 2px solid black;
    border-radius: 10px;
    .menu-item {
      margin-top: 1vw;
      margin-bottom: 1vw;
      margin-left: 1vw;
      margin-right: 1vw;
      height: 250px;
      width: 200px;
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
  
    .content {
      .title {
        font-size: 20px;
      }
      .current-page {
        margin-top: 37px;
      }
      margin-left: 50px;
      align-self: center;
      .button {
        margin-top: 30px;
        display: flex;
  
        align-self: center;
      }
    }
    @media screen and (max-width: 800px) {
    margin-top: 20px;
    background-color: gainsboro;
    width: 250px;
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
    flex-wrap:wrap;
    .menu-item {
        margin-left:25px;
        height: 250px;
        width: 200px;
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
      


      .content 
      justify-content: center;

        .title {
          font-size: 20px;
        }
        .current-page {
          margin-top: 37px;
        }
        
       
        .button {
          margin-top: 30px;
          display: flex;
          margin-bottom: 30px;
          align-self: center;
        }
      }
    }
  }
  
`;