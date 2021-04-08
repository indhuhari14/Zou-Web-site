const hamburgerBtn = document.querySelector(".hamburger-icon");
const navMenu = document.querySelector(".nav-tablet-view");
var body = document.querySelector("body");
const close = document.querySelector(".close");
hamburgerBtn.addEventListener('click',() =>{
    navMenu.classList.toggle('show');
    body.classList.toggle('prevent-scroll');
    hamburgerBtn.classList.toggle('close');
});

const header = document.querySelector("header");
const sectionOne = document.querySelector(".hero-wrapper");

const sectionOneOptions = {
  rootMargin: "-700px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(entries,sectionOneObserver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
},
sectionOneOptions);
sectionOneObserver.observe(sectionOne);
   
const circleStep = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".progress");
const changeText = document.querySelector(".change-txt");
for(let i = 0;i < circleStep.length;i++)
{
  let x=i;
  let distanceBetween;
  let distanceA;
  let distanceB;
  let isPresent;
  circleStep[x].addEventListener('click', () =>{
    if(x==0)
    {
      progressBar.style.width = "0px";
      for(let k=x+1;k < circleStep.length;k++){
        circleStep[k].classList.remove('active-circle');
      }
    }
    if(x>0){
      {
        distanceA = circleStep[x].offsetLeft;
        distanceB = circleStep[x-1].offsetLeft;
        distanceBetween = x*(distanceA - distanceB);
        progressBar.style.width = distanceBetween + "px";
        for(let j = 1;j <= x;j++){
          circleStep[j].classList.add('active-circle');
        }
        for(let k=x+1;k < circleStep.length;k++){
          isPresent = circleStep[k].classList.contains('active-circle');
          if(isPresent==true){
            circleStep[k].classList.remove('active-circle');
          }
        }
      }
    }
  });
}

