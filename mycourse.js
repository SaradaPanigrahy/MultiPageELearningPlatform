// myCourses.js
function searchCourses(){

    let input = document.getElementById("courseSearch").value.toLowerCase();
    let cards = document.querySelectorAll(".mycourse-card");

    cards.forEach(card=>{

    let title = card.querySelector(".mycourse-title").innerText.toLowerCase();

    if(title.includes(input)){card.style.display="block";}
    else{card.style.display="none";}

    });

}

document.addEventListener("DOMContentLoaded", function () {
    let myCourses = JSON.parse(localStorage.getItem("myCoursesData")) || {
        javascript: { total: 10, watched: 0, TotLec: 100, watchedLec: 0 },
        html: { total: 8, watched: 0, TotLec: 80, watchedLec: 0 },
        css: { total: 7, watched: 0, TotLec: 70, watchedLec: 0 },
        react: { total: 12, watched: 0, TotLec: 120, watchedLec: 0 }
    };
    localStorage.setItem("myCoursesData", JSON.stringify(myCourses));

    let completedCourses = JSON.parse(localStorage.getItem("completedCourses")) || [];

    function updateCourseCards() {
        for (let courseName in myCourses) {
            const course = myCourses[courseName];
            const watchText = document.getElementById(`watch-${courseName}`);
            const progressBar = document.getElementById(`progress-${courseName}`);
            const btn = document.querySelector(`.resume-btn[data-course="${courseName}"]`);
            
            if (watchText && progressBar) {
                watchText.innerText = `${course.watched} / ${course.total} hours watched`;
                const percent = Math.min(Math.round((course.watched / course.total) * 100), 100);
                progressBar.style.width = percent + "%";

                if (percent >= 100 && btn) btn.disabled = true;
            }
        }
    }

    function resumeCourse(courseName) {
        const course = myCourses[courseName];
        if (!course) return;

        if (course.watched < course.total) {
            course.watched += 1;
            course.watchedLec += course.TotLec / course.total;
            if (course.watched > course.total) course.watched = course.total;
            if (course.watchedLec > course.TotLec) course.watchedLec = course.TotLec;

            if (course.watched >= course.total && !completedCourses.includes(courseName)) {
                completedCourses.push(courseName);
                alert(`🎉 You completed ${courseName}!`);
            }

            localStorage.setItem("myCoursesData", JSON.stringify(myCourses));
            localStorage.setItem("completedCourses", JSON.stringify(completedCourses));

            updateCourseCards();
        } else {
            alert(`${courseName} already completed`);
        }
    }

    // Attach resume buttons
    document.querySelectorAll(".resume-btn").forEach(btn => {
        btn.addEventListener("click", () => resumeCourse(btn.dataset.course));
    });

    updateCourseCards();

    // Search function
    window.searchCourses = function () {
        let input = document.getElementById("courseSearch").value.toLowerCase();
        document.querySelectorAll(".mycourse-card").forEach(card => {
            let title = card.querySelector(".mycourse-title").innerText.toLowerCase();
            card.style.display = title.includes(input) ? "block" : "none";
        });
    }
});