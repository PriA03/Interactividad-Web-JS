const surprise = document.getElementById('surprise');

surprise.addEventListener('mouseover', () => {
  surprise.classList.add('show');
  setTimeout(() => {
    surprise.classList.remove('show');
  }, 2000);
});


const pulse = document.getElementById('pulse');
const colors = ['#ff1b6b', '#45caff', '#ff0f7b', '#f89b29'];

let index = 0;

setInterval(() => {
    index = (index + 1) % colors.length; 
    pulse.style.borderColor = colors[index];
   
  }, 1000);



  const surprise2 = document.getElementById('surprise');


let index2 = 0;

setInterval(() => {
    index = (index2 + 1) % colors.length; 
   
  }, 1000);