const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const tabs=$$(".tab-item")
const panes=$$(".tab-pane")
const tabActive =$(".tab-item.active")
const line =$(".line")
// requestIdleCallback(()=>{
//     line.style.width=tabActive.style.width+"px"
//     line.style.left=tabActive.style.width+"px"  
// })
tabs.forEach((element,index) => {
    const pane = panes[index]
    element.onclick = function() {
        line.style.width = this.offsetWidth+"px"
        line.style.left = this.offsetLeft+"px"
        $(".tab-item.active").classList.remove("active")
        $(".tab-pane.active").classList.remove("active")
        this.classList.add("active")
        pane.classList.add("active")
    }
});