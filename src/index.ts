
const getUsername=document.querySelector("#user") as HTMLInputElement;
const fromSubmit=document.querySelector("#form") as HTMLFormElement;
const Home_secotion=document.querySelector(".home-section") as HTMLElement

// so lets define the content of the object
interface UserDate{
    id:number;
    login:string;
    avatar_url:string;
    url:string
}
// reusable fun
async function myCustomFetcher <T>(url:string,options?:RequestInit):Promise<T>{
    const response=await fetch(url,options);
    if(!response.ok) {

        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
    return data;
}
// show the data in a card
const showResultUI=(singleUser:UserDate)=>{
    const {avatar_url,login,url}=singleUser;
    Home_secotion.insertAdjacentHTML(
        "beforeend",
        `<div class="card" >
        <img src=${singleUser.avatar_url} alt=${singleUser.login}>
        <div class="card-content">
            <a  href="${url}">${singleUser.login}</a>
            <div class="actions">
                <button class="like">Like</button>
                <button class="dislike">Dislike</button>
            </div>
        </div>
    </div>`
        
    )
}

function fecthUserData(url: string){
myCustomFetcher<UserDate[]>(url,{}).then((userInfo)=>{
    //@ts-ignore
   for(const singleUser of userInfo){
    showResultUI(singleUser);
   }
});
}
// default function call
fecthUserData("https://api.github.com/users");

// let proform search fun
fromSubmit.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const searchintem=getUsername.value.toLowerCase();
    try{
        const url="https://api.github.com/users";
        const alluserdata=await myCustomFetcher<UserDate[]>(url,{});
        const matchinguser=alluserdata.filter((user)=>{
            return user.login.toLowerCase().includes(searchintem);
        });
        Home_secotion.innerHTML="";
        if(matchinguser.length===0)
        {
            Home_secotion?.insertAdjacentHTML(
                "beforeend",
                `<p>No matching user <p>`
            )
        }
        else{
            for(const singleUser of matchinguser){
                showResultUI(singleUser);
               }
        }
    }
    catch(error){
      console.log(error);
      
    }
    

})