
const BASE_URL = `https://v2.nba.api-sports.io/teams/`;

//Creating new instance object from Headers Class
const myHeaders = new Headers();
    //The append() method ADDS a property to the "myHeaders" object - the first argument corresponds to the property key and the second corresponds to the property value (Here, we are adding/appending two properties with their respective keys and values)
myHeaders.append("x-rapidapi-key", "a6772187213dee415d6917c80afb0825");
myHeaders.append("x-rapidapi-host", "v2.nba.api-sports.io");

const options = {
    method: "GET",
    headers: myHeaders, //NOTE: We need to add our created object from the Headers Class to satisfy the requirements for the API we are using - We need our API Key and API Host information
};

const fetchBasketballData = async (team) => {
    try {
        const response = await fetch(`${BASE_URL}?name=${team}`, options);
        const data = await response.json();
        const filteredData = data.response.filter((element)=>{
            return element.nbaFranchise === true;
        })
        console.log(filteredData);
        return filteredData;
    }catch(error){
        console.error(error);
    }
};

module.exports = fetchBasketballData;