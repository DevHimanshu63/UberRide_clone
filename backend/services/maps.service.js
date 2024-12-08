const axios = require('axios');
module.exports.getAddressCoordinate = async (address) =>{
     const apiKey = process.env.GOOGLE_MAP_API;
     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

     try {
         const response = await axios.get(url);
         if (response.data.status === 'OK') {
             const location = response.data.results[ 0 ].geometry.location;
             return {
                 ltd: location.lat,
                 lng: location.lng
             };
         } else {
             throw new Error('Unable to fetch coordinates');
         }
     } catch (error) {
         console.error(error);
         throw error;
     }

}

module.exports.getDistanceAndTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination must be provided');
    }
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No route found between origin and destination');
            }
            const distance = response.data.rows[0].elements[0];
            // const duration = response.data.rows[0].elements[0].duration.text;
            return {
                distance,
                // duration
            };
        }else{
            throw new Error('Unable to fetch distance and time');
        }
     }catch(error){
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error('Input must be provided');
    }
    const apiKey = process.env.GOOGLE_MAP_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=(regions)&language=en&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
     }catch(error){
        console.error(error);
        throw error;
    }
}