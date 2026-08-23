import { Authorize } from "./authorize.js";
import { UiElement } from "./uielement.js";

//UI

const userinfodiv = document.getElementById('userinfo');
const logoutbtn = document.getElementById('logoutbtn');

// authorize instance
const authorize = Authorize();

//Uielement instance
const uiele = UiElement(userinfodiv);

//get info & render
authorize.getUser((data) => {
    //console.log(data);

    uiele.userInfoEle(data);


    
})

// Logout
logoutbtn.addEventListener('click', (e) => {
  
    const { logoutUser } = Authorize();
    logoutUser();
});
