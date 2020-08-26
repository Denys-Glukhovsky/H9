


  let toggled = false;
  function toggle() {
    if(!toggled){
      toggled = true;
      document.getElementById("arrow-show").style.display = "block";
      document.getElementById("arrow-hide").style.display = "none";
      document.getElementById("navLink").style.display = "block";      
      return;
  }
      if(toggled) {
        toggled = false;
        document.getElementById("arrow-show").style.display = "none";
        document.getElementById("arrow-hide").style.display = "block";
        document.getElementById("navLink").style.display = "none";       
        return;
      }
        
    }
  
  




/*const openWindow = document.querySelector('[data-toggleButton]');
openWindow.addEventListener('click', button => {
  document.querySelector('navLinks').classList.toggle('navLinks.open');
})

if (window.style.display=='none'){
    window.style.display=='all';


    const openWindow = document.querySelector('[data-toggleButton]');
openWindow.addEventListener('click', function(){
  const window = document.querySelector('[data-window]');
*/

