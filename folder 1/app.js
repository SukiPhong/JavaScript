const api ='http://localhost:3000/courses'
const start=()=>{
    getCourse(renderCourses)
}
const getCourse=(cb)=>{
    fetch(api)
    .then(rs=>rs.json())
    .then(cb)
}

const renderCourses=(courses)=>{
    const list = document.querySelector("#list");
    const html = courses.map((el)=>`
        <h4>${el.name}</h4>
        <p>${el.description}</p>
    `).join('')
    list.innerHTML = html;
}
start();