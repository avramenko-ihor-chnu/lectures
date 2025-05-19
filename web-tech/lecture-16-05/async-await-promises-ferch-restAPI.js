// Async await in JS, Promises, fetch and working with REST API

// 1. Promises 

// Promises in JS - incapsulation of task execution; 
// Has two methods - method to process result of promise and method to process error;

const myNewPromise = new Promise((resolve, reject) => {
    let returnObject = {
        userName: "Bohdan",
        role: "Admin",
        isActive: true,
        age: 20
    }

    let errorMessage = {
        message: "Incorrect password"
    }
    setTimeout(() => { 
        resolve(returnObject) }, 
        1000)
});

// myNewPromise.then((data) => {
//     if(data.role === "Admin"){
//         console.log("You are overlord of this server");
//     }
//     console.log(data);
//     return true;
// }).catch((error) => {
//     console.error(error.message);
// });


// Chaining of promises
// myNewPromise.then((data) => {
//     if(data.role === "Admin"){
//         console.log("You are overlord of this server");
//     }
//     console.log(data);
//     let userData = {
//         user: data,
//         email: data.userName + "@chnu.edu.ua"
//     }
//     return userData;
// }).then((emailData) => {
//     console.log(emailData.email)
//     return true;
// })
// .catch((error) => {
//     console.error(error.message);
// });



// 2. Async-await

async function someWork(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function asyncTasksExecution(){
    console.log('first call to backend:')
    await someWork(2000);

    console.log('second call to backend:')
    await someWork(1000);

    console.log('third call to backend:')
    await someWork(1000);
}

// asyncTasksExecution();


// myNewPromise.then((data) => {
//     if(data.role === "Admin"){
//         console.log("You are overlord of this server");
//     }
//     console.log(data);
//     return true;
// }).catch((error) => {
//     console.error(error.message);
// });


// 3. Fetch, rest api, requests to backend

// fetch - built in function in js, for making http requests. Fetch always returns a promise
// Rest - representational state transfer, standart for http communication (client-server, microservices)
// (graphQl)
// Rest (verbs): GET, POST, PUT, PATCH, DELETE, OPTIONS


async function getDataFromStudentBackend(){
    // let response = await fetch('https://chnu-student-interview-preparation.netlify.app/.netlify/functions/listItems');

    // if(!response.ok){
    //     console.error('not 200');
    // }

    // const data = await response.json();
    // console.log(data);

    fetch('https://chnu-student-interview-preparation.netlify.app/.netlify/functions/listItems')
    .then((response) => {
        console.log(response);
    }).catch((error) => { console.error(error); })
}

// getDataFromStudentBackend();


let token = "";
let role = "";

async function addItem(){
    let payload = {
        category: "teeth",
        description: "golden teeth",
        price: 100
    }

    let response = await fetch('https://chnu-student-interview-preparation.netlify.app/.netlify/functions/userCreateItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if(!response.ok){
        console.error(response);
    }

    let data = await response.json();
    console.log(data);
}

async function requestBackend(){
    let payload = {
        username: "va.m",
        password: "pass1234"
    }

    let response = await fetch('https://chnu-student-interview-preparation.netlify.app/.netlify/functions/userLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if(!response.ok){
        console.error(response);
    }

    let data = await response.json();
    token = data.token;
    role = data.role;
    console.log(`role: ${role}`);

    if(role === "admin"){
        await addItem();
    }
}

requestBackend();

















