// API_NOTIFICATION_MESSAGES


export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading.....",
        message: 'Data is Being Loaded, Please Wait'
    },
    success: {
        title: 'Success',
        message: 'Data is Successfuly Loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server,please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while Parsing requested Data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect to the server right now'
    }
}


// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: {url:'/',method:'POST/GET/UPDATE/DELETE',params:true/false,query:true/false}
export const SERVICE_URLS = {
    subAdminReg: { url: "/subuser/signup", method: "POST" },
    subAdminLog: { url: "/subuser/signin", method: "POST" },
    getCookie:{url:"/getcookie",method:"GET"},
    userLogOut:{url:"/subuser/logout",method:"GET"},
    getluckyNum:{url:"/lucky/get",method:'GET',params:true},
    updateluckynum: { url: "/lucky/update", method: "POST" },

    // api for ads
    getAds: { url: "/ad/get", method: "GET" },
    addAds: { url: "/ad/create", method: "POST" },
    editAds: { url: "/ad/update", method: "POST" },

    // api for guessingtable
    getGuessings:{ url: "/guessing/get", method: "GET" },
    createGuessings: { url: "/guessing/create", method: "POST" },
    updateGuessings:{ url: "/guessing/update", method: "POST" },
    
}

