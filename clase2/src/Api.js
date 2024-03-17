import axios from "axios";

const searchImages = async (term) =>{
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        headers:{
            Authorization:"Client-ID a2ZgGUan5eJnh6TdpLZz8Cb91bcCiWpzDD6REWWunT4"
        },
        params:{
            query: term
        }
});

return response.data.results;
}

export default searchImages;