import { format } from "date-fns";

export function UiElement(divele) {
    
    const userInfoEle = (data) => {
        
        const uid = data.uid;
        const email = data.email;
        const fullname = data.displayName;
        const photourl = data.photoURL;
        const createdtime = data.metadata.creationTime;

        // cdn
        // const formatteddate = dateFns.format(new Date(createdtime), "do MMM yyy");

        //npm
        const formatteddate = format(new Date(createdtime), "do MMM yyy");


        const html = `
                <img src="${photourl}" width="80" alt="profile icon"/>
                <p>UID : ${uid}</p>
                <p>Display Name : ${fullname}</p>
                <p>Email : ${email}</p>
                <p>Create At : ${formatteddate}</p>
        `;

        divele.innerHTML = html;
    }

    return {userInfoEle}
}