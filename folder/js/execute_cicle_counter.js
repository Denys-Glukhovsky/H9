
/*function a(i, n){
  while (i <= n){
    console.log(i)
  i++;
  }  
}
a (1, 20)*/  //Пробный запуск цикла while DOT'T pay attention to it (nvm)

function printNumbers(from, to) {
    let execute = () => {
      console.log (from);
      if (from === to) {
        clearInterval(cicle);
       }        
        from++;
      }
      execute();
      let cicle = setInterval(execute, 1000);
  }

  printNumbers(1, 20);

  // Конец кода нормативного задания

  let completed = (message) => {
    let huray = () => {
      (console.log (message));
    }
    setTimeout (huray, 20 * 1000 + 100); // Complecated record for 20,1 sec
  }
  
//let message = 'Ура! Сработало!!!';  // Или, через переменную - can be inserted as an argument of completed function

  completed ('Ура! Сработало!!!');