function display_todo_list()
{
    document.getElementById("create_task_form").reset();
    document.getElementById("update_task_form").reset();
    document.getElementById('create_task').style.display = "none";
    document.getElementById('my_tasks_list').style.display = "block";
    document.getElementById('update_task').style.display = "none";
}

function display_create_form()
{
    document.getElementById('create_task').style.display = "block";
    document.getElementById('my_tasks_list').style.display = "none";
    document.getElementById('update_task').style.display = "none";
}

function submit_create_task_form() 
{
    //debugger;
    const all_tasks = localStorage.getItem('AllTasks');
    const form = document.getElementById("create_task_form");
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const email = form.querySelector('[name="email"]').value;
    let stored_tasks = []; 
    let id = 1;
    if(all_tasks)
    {
        stored_tasks = JSON.parse(all_tasks);
        id = stored_tasks.length + 1;
    }  
    const formData = { id, name, phone, email};
    //console.log(formData);
    stored_tasks.push(formData);
    localStorage.setItem("AllTasks", JSON.stringify(stored_tasks));

    //alert('Created Successfully!');

    display_data();
}

function display_data()
{
    //debugger;
    const all_tasks = localStorage.getItem('AllTasks');
    const stored_tasks = JSON.parse(all_tasks);
    const listContainer = document.getElementById("show_list");
    listContainer.innerHTML = ""; 
    
    stored_tasks.forEach(data => {
        const add_list = document.createElement("tr");
                
        const nameTD = document.createElement("td");
        nameTD.textContent = data.name;
        add_list.appendChild(nameTD);
        
        const phoneTD = document.createElement("td");
        phoneTD.textContent = data.phone;
        add_list.appendChild(phoneTD);
        
        const emailTD = document.createElement("td");
        emailTD.textContent = data.email;
        add_list.appendChild(emailTD);

        const actionTD = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn");
        editButton.onclick = function() {
            editById(data.id,data.name,data.phone,data.email);
        };
        actionTD.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn-danger");
        deleteButton.onclick = function() {
            deleteById(data.id);
        };
        actionTD.appendChild(deleteButton);
        add_list.appendChild(actionTD);
        
        listContainer.appendChild(add_list);
    });
}

function deleteById(id)
{
    //console.log(id);
    //debugger;
    const all_tasks = localStorage.getItem('AllTasks');
    const stored_tasks = JSON.parse(all_tasks);
    const getID_data = stored_tasks.findIndex((getID) => { 
        return getID.id === id
    });
    //console.log(getID_data);    
    const confirmBox = window.confirm("Are you sure you want to delete this task?");
    if(confirmBox)
    {
        const new_stored_tasks = stored_tasks.filter((DeleteData) => { 
            return DeleteData.id !== id;
        });
        localStorage.setItem("AllTasks", JSON.stringify(new_stored_tasks));

        //alert('Deleted Successfully!');

        display_data();
    }
}

function editById(id,name,phone,email)
{
    document.getElementById('up_id').value = id;
    document.getElementById('up_name').value = name;
    document.getElementById('up_phone').value = phone;
    document.getElementById('up_email').value = email;

    document.getElementById('create_task').style.display = "none";
    document.getElementById('my_tasks_list').style.display = "none";
    document.getElementById('update_task').style.display = "block";
}

function submit_update_task_form()
{
    //debugger;
    const all_tasks = localStorage.getItem('AllTasks');
    const form = document.getElementById("update_task_form");
    const up_id = parseInt(form.querySelector('[name="up_id"]').value);
    const up_name = form.querySelector('[name="up_name"]').value;
    const up_phone = form.querySelector('[name="up_phone"]').value;
    const up_email = form.querySelector('[name="up_email"]').value;

    const stored_tasks = JSON.parse(all_tasks);
    const taskToEdit = stored_tasks.find((getData) => { 
        return getData.id === up_id 
    });
    //console.log(taskToEdit);
    if((all_tasks) && (taskToEdit))
    {
        taskToEdit.name = up_name;
        taskToEdit.phone = up_phone;
        taskToEdit.email = up_email;
        localStorage.setItem("AllTasks", JSON.stringify(stored_tasks));
    }

    //alert('Updated Successfully!');

    display_data();
}

display_data();