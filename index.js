let btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', ()=>{
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    if(name === "" && age === ""){
        alert("Campos vacíos:(")
    }
    else{
        if(btnAdd.value === "Enviar"){
            axios.post('https://stark-journey-54614.herokuapp.com/users', {name, age})
            .then(response=>{
                console.info(response.data)
                document.getElementById('name').value = ""
                document.getElementById('age').value = ""
                getData()
            })
            .catch(err=>console.error(err.data))
        }
        if(btnAdd.value === "Editar"){
            axios.put('https://stark-journey-54614.herokuapp.com/users/'+localStorage.getItem("_id"), {name, age})
            .then(response=>{
                console.info(response.data)
                document.getElementById('name').value = ""
                document.getElementById('age').value = ""
                document.getElementById('btn-add').value = "Enviar"
                localStorage.removeItem("_id")
                getData()
            })
            .catch(err=>console.error(err.data))
        }
    }
})

async function getData(){
    let container = document.getElementById('get');
    let response = await axios.get("https://stark-journey-54614.herokuapp.com/users")
    container.innerHTML = ""
    response.data.map(data=>{
        container.innerHTML += `
        <div class="item">
            <span class="info">${data.name}</span>
            <span class="info">${data.age}</span>
            <span class="update" onclick="getUser('${data._id}')">Editar</span>
            <span class="delete" onclick="Delete('${data._id}')">Eliminar</span>
        </div>`
    })
}
getData()

function Delete(id){
    if(window.confirm("Deseas eliminar este usuario?")){
        axios.delete('https://stark-journey-54614.herokuapp.com/users/'+id)
        .then(response=>{
            console.info(response.data)
            getData()
        })
        .catch(err=>console.error(err.data))
    }
}
async function getUser(id){
    document.getElementById('btn-add').value = "Editar"
    let response = await axios.get("https://stark-journey-54614.herokuapp.com/users/"+id)
    document.getElementById('name').value = response.data.name
    document.getElementById('age').value = response.data.age
    localStorage.setItem("_id", id);
}