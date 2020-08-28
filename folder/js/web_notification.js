Notification.requestPermission(function(permission){
  // переменная permission содержит результат запроса
  console.log('Результат запроса прав:', permission);
  });
  var notification = new Notification('Hi everyone!', {
    body: 'Another hellow.',
    dir: 'auto'
  });
  function clickFunc() { alert('Пользователь кликнул на уведомление'); }
notification.onclick = clickFunc;

 new Notification('Верните Линуса!', {
  body: 'Тестирование HTML5 Notifications',
  
  dir: 'auto'
  });