const list =  document.getElementById('unassigned-list');
const showList = document.getElementById('unassigned-toggle');
const addStaff = document.getElementById('add-staff');
const search = document.getElementById("search-staff");
const unassignedCount = document.getElementById('number-unassigned');
const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save");
const staffExp = document.getElementById("staff-experience");
const imgUrl = document.getElementById("image-url");
const profilImg = document.getElementById("staff-image");
const staffRole = document.getElementById("role");
const staffPhone = document.getElementById("phone");
const staffEmail = document.getElementById("email");
const staffName = document.getElementById("name");
const modal = document.getElementById("new-staff");

let workers = [];
let staff = {
    id : new Date(),
    nom : "",
    role : "",
    image : "",
    email : "", 
    telephone : "",
    experiences : [],
};
let experience = {
    title : "",
    company : "",
    startDate : "",
    endDate : "",
    type : ""
};
showList.addEventListener('click', ()=> {
    list.classList.toggle('hidden');
});

addStaff.addEventListener('click', ()=> {
    modal.classList.remove('hidden');
});


