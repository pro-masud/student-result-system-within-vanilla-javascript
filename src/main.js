// get student data for student create form here

const studentDataForm = document.getElementById("student_create_form");
const msg   = document.querySelector(".msg");

// get student data here

const getStudentData = () => {
    
    // get data to LS 
    const getData = getDataLS("students");

    console.log(getData);
}


// student form data 

studentDataForm.onsubmit = (e) => {
    // form prevent default here
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    // form data to validation here now
    if(!data.name && !data.roll && !data.reg ){
        msg.innerHTML = createAlert("All Fired required!!!");
    }else if(!inNumber(data.roll)){
        msg.innerHTML = createAlert("Invalid Roll Number!!!");
    }else if(!inNumber(data.reg)){
        msg.innerHTML = createAlert("Invalid Registation Number!!!");
    }else{

        // old student date here now
        const oldStudentData = getDataLS("students");
        oldStudentData.push(data);
        

        // set data for LS
        sendDataLS("students", oldStudentData);
        e.target.reset();
        msg.innerHTML = createAlert(`${data.name} You Are Successfully`, "success");


    }
}