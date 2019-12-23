if(SECID){
    axios.get(`${API}/users/subsector/${SECID}`).then(data => {
        console.log(data);
    }).catch(e=>{

    })
}