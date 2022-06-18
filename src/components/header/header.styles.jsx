import styled from 'styled-components';

export const HeaderContainer = styled.div`
font-family: "Fira Sans Condensed";
padding: 10px;
justify-content: center;
display: flex;
flex-direction: column;
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  .title-name {
    font-weight: bold;
    cursor: pointer;   
  }
  .logo {
    width: 60px;
    height: 100px;
    @media screen and (max-width: 800px) {        
      width: 40px;
      height:80px;    
    }  
  }
  .title-name {
    margin-left: 30px;
    @media screen and (max-width: 800px) {
      margin-left: 10px;
    }
  }
  h1 {
    margin-bottom: 0;
    @media screen and (max-width: 800px) {
      font-size:25px
    }
  }
}
.buttons {
  display: inline-flex;
  @media screen and (max-width: 800px) {
    width:100%
  }
  .sign-in-and-sign-up-and-sign-out {
    justify-content: space-between;
    display: inline-flex;
    margin-left: auto;
  }
  .button {
    padding-left: 1vw;
    padding-right: 1vw;
    @media screen and (max-width: 800px) {
      padding-left: 2px;
      padding-right: 2px;
    }
    .buttonstyle{
      @media screen and (max-width: 800px) {
         height:30px;
         font-size:10px;         
      }
    }
  }
}
`;

