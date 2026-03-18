//Course js

function toggleDetails(button){

    let row = button.closest("tr").nextElementSibling;

    if(row.style.display === "table-row"){

    row.style.display = "none";
    button.innerText = "Show Details";

    }else{

    row.style.display = "table-row";
    button.innerText = "Hide Details";

    }

}

function filterCourses(category){

    let rows = document.querySelectorAll("#courseTable tr[data-category]");

    rows.forEach(row => {

    let detailRow = row.nextElementSibling;

    if(category === "all" || row.dataset.category === category){

    row.style.display = "";
    detailRow.style.display = "none";

    }else{

    row.style.display = "none";
    detailRow.style.display = "none";

    }

    });

}


function updateCourseStats(){

    let rows = document.querySelectorAll("#courseTable tr[data-category]");

    let active = 0;
    let upcoming = 0;
    let free = 0;
    let paid = 0;

    rows.forEach(row=>{

    let status = row.cells[2].innerText.toLowerCase();
    let type = row.cells[3].innerText.toLowerCase();

    if(status.includes("active")) active++;
    if(status.includes("upcoming")) upcoming++;

    if(type === "free") free++;
    if(type === "paid") paid++;

    });

    document.getElementById("activeCount").innerText = active;
    document.getElementById("upcomingCount").innerText = upcoming;
    document.getElementById("freeCount").innerText = free;
    document.getElementById("paidCount").innerText = paid;

}

updateCourseStats();



