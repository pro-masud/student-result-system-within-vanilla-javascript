// get student data for student create form here

const studentDataForm = document.getElementById("student_create_form");
const msg   = document.querySelector(".msg");
const showStudent   = document.querySelector(".all-students-data");

// get student data here

const getStudentData = () => {
    
    // get data to LS 
    const students = getDataLS("students");

    let content = "";

    students.map((student,index) => {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td><img src="${student.photo}" alt=""></td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.reg}</td>
            <td>${timeAgo(student.time)}</td>
            <td><button class="btn btn-success">Add Result</button></td>
            <td>
                <button class="btn btn-info"><i class="fa-solid fa-eye"></i></button>
                <button class="btn btn-primary"><i class="fa-solid fa-edit"></i></button>
                <button class="btn btn-danger" onclick="deleleStudent('${student.roll}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `;
    });

    showStudent.innerHTML = content;
}
getStudentData();


// Delele data form LS this Function

const deleleStudent = (roll) => {
    const oldData = getDataLS("students");

    const updateData = oldData.filter((data) => data.roll !== roll);

    sendDataLS("students", updateData);
    getStudentData();
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
        oldStudentData.push({
            ...data,
            result: null,
            time: Date.now(),
        });

        // set data for LS
        sendDataLS("students", oldStudentData);
        e.target.reset();
        msg.innerHTML = createAlert(`${data.name} You Are Successfully`, "success");
    }

    getStudentData();
}