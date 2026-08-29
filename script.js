// ---------- Animated Statistics ----------

function animateValue(id,target,suffix){

let element=document.getElementById(id);

let count=0;

let speed=target/120;

let interval=setInterval(()=>{

count+=speed;

if(count>=target){

count=target;
clearInterval(interval);

}

element.innerHTML=Math.floor(count)+suffix;

},20);

}

animateValue("teens",50000,"+");
animateValue("companies",2000,"+");
animateValue("projects",15000,"+");
animateValue("earnings",500,"L+");

// ---------- FAQ ----------

const questions=document.querySelectorAll(".faq-question");

questions.forEach(question=>{

question.addEventListener("click",()=>{

const answer=question.nextElementSibling;

if(answer.style.display==="block"){

answer.style.display="none";

}else{

answer.style.display="block";

}

});

});
document.querySelectorAll('a[href="#contact-section"]').forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const contact = document.getElementById("contact-section");

        if (contact) {
            contact.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".faq-question").forEach(function (button) {
        button.addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("show");
        });
    });
});