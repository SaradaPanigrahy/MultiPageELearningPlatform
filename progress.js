// progressPage.js
document.addEventListener("DOMContentLoaded", function () {
    const myCourses = JSON.parse(localStorage.getItem("myCoursesData")) || {};
    const quizScore = parseInt(localStorage.getItem("quizScore") || 0);

    let totalLectures = 0;
    let watchedLectures = 0;
    let watchDuration = 0;

    for (let courseName in myCourses) {
        const course = myCourses[courseName];
        totalLectures += course.TotLec;
        watchedLectures += course.watchedLec;
        watchDuration += course.watched;
    }

    document.getElementById("LectureWatched").innerText = watchedLectures;
    document.getElementById("watchDur").innerText = watchDuration + " hrs";
    document.getElementById("QuizzMark").innerText = quizScore + "%";

    const ctx = document.getElementById("progressChart").getContext("2d");
    const percent = totalLectures ? Math.round((watchedLectures / totalLectures) * 100) : 0;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Completed", "Remaining"],
            datasets: [{
                data: [percent, 100 - percent],
                backgroundColor: ["#0e9d3e", "#e0e0e0"]
            }]
        },
        options: { responsive: true }
    });
});