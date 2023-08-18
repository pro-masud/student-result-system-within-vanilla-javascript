// get student data for student create form here

const studentDataForm = document.getElementById("student_create_form");
const msg   = document.querySelector(".msg");
const showStudent   = document.querySelector(".all-students-data");
const showSingleView  = document.querySelector(".single-data");
const student_edit_form  = document.getElementById("student_edit_form");

// get student data here

const getStudentData = () => {
    // get data to LS 
    const students = getDataLS("students");

    let content = "";
    if(students.length > 0){
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
                    <button data-bs-toggle="modal" data-bs-target="#show_single_student_modal" class="btn btn-info" onclick="singleView('${student.roll}')" ><i class="fa-solid fa-eye"></i></button>
                    <button data-bs-toggle="modal" data-bs-target="#edit_student_modal" onclick="editeData('${student.id}')" class="btn btn-primary"><i class="fa-solid fa-edit"></i></button>
                    <button class="btn btn-danger" onclick="deleleStudent('${student.roll}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
            `;
        });
    }else{
        content = `
            <tr>
                <td colspan="8" class="text-center text-danger">No Data Fount Here !!!</td>
            </tr>
        
        `;
    }
    showStudent.innerHTML = content;
}
getStudentData();





// single data view

const singleView = (roll) => {

    // get all student to database 
    const allStudents = getDataLS("students");

    const single = allStudents.find((student)  => student.roll == roll);

    showSingleView.innerHTML = `
        <div class="student-img">
            <img style="width: 100px; height: 100px; border-radius: 50%;" src="${single.photo}" alt="">
        </div>
        <div class="student-info">
            <h2>${single.name}</h2>
            <div class="result d-flex justify-content-center gap-5 mt-3">
                <p><strong>Roll:</strong> ${single.roll}</p>
                <p><strong>Reg:</strong>${single.reg}</p>
            </div>
        </div>
    `;
}


// Delele data form LS this Function

const deleleStudent = (roll) => {


    const oldData = getDataLS("students");

    confirm("Your Data Delete Now");
    const updateData = oldData.filter((data) => data.roll !== roll);
    sendDataLS("students", updateData);
        


    getStudentData();
}



// student data for edite here now
const editeData = (id) => {
    // get all data for LS
    const oldData = getDataLS("students");

    const data = oldData.find((data) => data.id === id);

    student_edit_form.querySelector("input[name = 'name']").value = data.name;
    student_edit_form.querySelector("input[name = 'rol']").value = data.roll;
    student_edit_form.querySelector("input[name = 'reg']").value = data.reg;
    student_edit_form.querySelector("input[name = 'id']").value = data.id;
    student_edit_form.querySelector("input[name = 'photo']").value = data.photo;
    student_edit_form.querySelector("img#prevPho").setAttribute("src", data.photo);

}


// student data update here now
student_edit_form.onsubmit = (e) => {
    // form realoed close here
    e.preventDefault();

    // form data here
    const formData = new FormData(e.target);

    // entries data here
    const data = Object.fromEntries(formData.entries());

     // get data form All students 
     const oldData = getDataLS("students");

    oldData[oldData.findIndex((item) => item.id === data.id)] = {
        ...oldData[oldData.findIndex((item) => item.id === data.id)],
        data,
    };

   

    sendDataLS("students", oldData);


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
        
        // check roll to database is allready value here
        if(oldStudentData.some((item) => item.roll === data.roll) == true){
            msg.innerHTML = createAlert("Roll Already Exists !!!");
            return;
        }


         // check reg to database is allready value here
        if(oldStudentData.some((item) => item.reg === data.reg) == true){
            msg.innerHTML = createAlert("Registation Already Exists !!!");
            return;
        }


        oldStudentData.push({
            ...data,
            result: null,
            time: Date.now(),
            id: getRandomUniqueID(26),
        });

        // set data for LS
        sendDataLS("students", oldStudentData);
        e.target.reset();
        msg.innerHTML = createAlert(`${data.name} You Are Successfully`, "success");
    }

    getStudentData();
}