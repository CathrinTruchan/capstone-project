import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
     
     /* add to project*/
     
     :root {
          --text-dark: #363946;
          --text-light: #F5F5F5;
          --background-neutral: #F5F5F5;
          --background-primary: #ffffff;
          --primary: #5D6BEA;
          --primary-light: #7B87FA;
          --primary-gradient: linear-gradient(266.87deg, #5D6BEA 5%, #7B87FA 93.2%);
          --highlight: #FF8667;
          --highlight-light: #FF987D;
          --highlight-gradient: linear-gradient(86.93deg, #FF8667 4.63%, #FF987D 94.35%);
          --drop-shadow-gray:  0px 0px 4px rgba(0, 0, 0, 0.25);
          --drop-shadow-color: 0px 0px 4px rgba(93, 107, 234, 0.42); 
          --drop-shadow-bottom-color: 0px 15px 10px -15px rgba(93, 107, 234, 0.42);
          --drop-shadow-bottom-hover: 0px 20px 15px -20px rgba(93, 107, 234, 0.42);
          --font-small: 0.8rem;

      }


      * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 100%;
}




/* montserrat-alternates-regular - latin */
@font-face {
  font-family: 'Montserrat Alternates';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url('/fonts/montserrat-alternates-v17-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/montserrat-alternates-v17-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}


/* dm-sans-regular - latin */
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url('/fonts/dm-sans-v11-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/dm-sans-v11-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

  /* add to project */
  h1 {
    font-size: 2rem;
    color: var(--primary);
    text-align: center;
    margin: 1rem 0;
    font-family: "Montserrat Alternates", "Open Sans", Helvetica, Arial, sans-serif;
  }   

  h2 {
    font-size: 1.5rem;
    color: var(--primary);
    text-align: center;
    margin: 1rem 0;
    font-family: "Montserrat Alternates", "Open Sans", Helvetica, Arial, sans-serif;
  }

  h3{
    font-size: 1.25rem;
    color: var(--text-dark);
    text-align: center;
    margin: 1rem 0;
    font-family: "Montserrat Alternates", "Open Sans", Helvetica, Arial, sans-serif;
  }
  



      body {
          font-family: 'DM Sans', sans-serif;
          background-color: var(--background-primary);
          color: var(--text-dark);
          font-size: 1rem; /* add to project */
        
      }
  `;

export default GlobalStyle;
