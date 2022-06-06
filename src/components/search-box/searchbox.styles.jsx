import styled from 'styled-components';


export const SearchBoxContainer = styled.div`

.search-books {
    margin-top: 30px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    @media screen and (max-width: 800px) {
        margin-top: 25px;
        border-radius: 20%;
        height: 100px;
    }
    .dropdown {
      margin-left: 10px;
      border: none;
      font-size: large;
     
      
    }
  
    .input {
      height: 40px;
      margin-left: 20px;
      width: 30vw;
      background-color: aliceblue;
      border-radius: 10%;
      padding: 0 10px;
        @media screen and (max-width: 800px) {
            width:200px;
            border-radius: 5%;
            font-size:12px;

    }
    }
  }`;