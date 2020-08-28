 function delay(ms) {
   return new Promise(function(resolve, reject) {
     setTimeout(() => {
       console.log('Работаем над вашим запросом')
    }, 1000)
   });

};
delay(3000).then(() => alert('Выполнилось через 3 секунды'));

// Или выразим через стрелочную функцию.

let delay2 = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve, ms)
  })
}
delay2(3000).then(() => alert('Выполнилось через 3 секунды'));



