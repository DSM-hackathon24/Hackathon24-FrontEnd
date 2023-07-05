import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;

        width: max-content;
        
        font-family: "Pretendard"; 
        line-height: 150%;
        text-align: start;
        
        box-sizing: border-box;
        
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        -webkit-user-select: none;
        user-select: none;
    }

    html,
    body {
        background-color: ${({ theme }) => theme.colors.background1};

        max-width: 100vw;

        overflow: hidden;
        overflow-y: auto;
    }

    a {
        text-decoration: none;
    }

    button {
        cursor: pointer;
    }

    input {
        outline: none;
    }

    button,
    input {
        background-color: transparent;

        border: none;
    }

    ul {
        list-style-type: none;
    }
    
    figure,
    picture {
        display: flex;
    }
`;
