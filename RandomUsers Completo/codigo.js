// Asíncrona
// Esperar a que se ejecute por completo una instruccion sin obstruir el hilo de procesos

// formas de manejar la asincronia

/*
*1 Callbacks >> Desuso
*2 Promesas
*3 Async / Await  >> la mejor  opcion
*/

// CALLBACKS
/* function getUsersWithCallback(callback){
    fetch('https://randomuser.me/api/')// consulta a un EndPoint barrita de busqueda
        .then(response => response.json()) // traducir o entender el Json
        .then(data =>{
            const {results} = data; //desestructurar un objeto  
            callback(null, results) // 1. Error / 2. Respuesta
        })
        .catch(error=>{
            console.error(error);
            callback(error, null)
        })
    // llamar asíncrona
    //Consultar a spotify
    //3ms
};
 

getUsersWithCallback((error, results)=>{
    if(error) console.error(error)               
     const name=document.getElementById('name');
    const surname=document.getElementById('surname');
    const phone=document.getElementById('phone')
    for (const user of results) {
        name.innerText=user.name.first
        surname.innerText=user.name.last
        phone.innerText=user.phone
    }
    
}) */



/* // PROMISES
const getUsersWithPromise = () =>{
    // a + b
    // c + x
    return new Promise((resolve, reject)=>{
        fetch('https://randomuser.me/api/')
        .then(response=>response.json())
        .then(data=>{
            const {results}=data
            resolve(results)
        })
        .catch(error => reject(error))
    })
};

getUsersWithPromise()
    .then(results=>{
        const name=document.getElementById('name');
        const surname=document.getElementById('surname');
        const phone=document.getElementById('phone');
        for (const user of results) {
            name.innerText=user.name.first;
            surname.innerText=user.name.last;
            phone.innerText=user.phone;
        }
    })
    .catch(error => console.error(error)) */


// ASYNC AWAIT
const getUsersWithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10'); //automáticamente lo guarda en la constante
        const { results } = await response.json(); //desestructuro        
        const users = document.getElementById('users')
        for (const user of results) {
            users.innerHTML += `
            <tr>
                    <td>${user.name.first}</td>
                    <td>${user.name.last}</td>
                    <td>${user.phone}</td>
                </tr>
                `
        }

    } catch (error) {
        console.error(error);
    }
}


getUsersWithAsync();