// найти следующий не числовой символ
const findNextNotDigitIndexFrom = (list, from = 0) => {
  let nextIndex = list.length;
  for (let i = from; i < list.length; i++) {
    if (isNaN(list[i])) {
      nextIndex = i;
      break;
    }
  }
  return nextIndex;
};

// Разбить строку на валидный массив.
// (12+3)*2
const createValidCalcArray = (list) => {
  // удалить все пробелмы. и создать массив вида ['(','1','2','+','3',')','*','2']
  list = list.replace(" /g", "").split("");
  // объеденить числа
  list.forEach((item, index, self) => {
    // если нашли не число - объеденить
    if (!isNaN(item)) {
      const start = index;
      const end = findNextNotDigitIndexFrom(self, start);
      const result = self.slice(start, end).join("");

      if (start !== end) {
        list.splice(start, result.length, result);
      }
    }
  });
  // на выходе получаем массив след вида ['(','12','+','3',')','*','2']
  return list;
};

// Посчитать вложеность скобок
const nestedBrackets = (s, i = 0) => {
  let isMatched = false;
  // список открывающихся скобок
  let open = [];
  // список закрывающихся скобок
  let close = [];
  s.forEach((item, index) => {
    if (!isMatched) {
      if (item === "(") {
        // добавляем в список (
        open = [...open, index];
      }
      if (item === ")") {
        // добавляем в список )
        close = [index, ...close];
      }
      // если количество скобок равно
      // значит мы нашли начало и конец операции которую можем выполнить
      if (open.length && open.length === close.length) {
        // останавливаем цикл
        isMatched = true;
      }
    }
  });
  return [open[0], close[0]];
};

// Главная функция для вычисления
function calc(calculate) {
  // создать подходящий массив из строки
  let calcList = createValidCalcArray(calculate);

  //  Произвести вычисления через рекурсию.
  const makeCalc = (x) => {
    //  объявляем функцию которая делает вычисления
    const makeOperation = (operation) => {
      if (x.indexOf(operation) > 0) {
        const start = x.indexOf(operation);
        const operand1 = Number(x[start - 1]);
        const operand2 = Number(x[start + 1]);
        let result = null;

        switch (operation) {
          case "+":
            result = operand1 + operand2;
            break;
          case "-":
            result = operand1 - operand2;
            break;
          case "/":
            result = operand1 / operand2;
            break;
          case "*":
            result = operand1 * operand2;
            break;
          default:
            break;
        }
        // вырезать из массива учаток который можно посчитать
        // и положить вместо него результат
        x.splice(start - 1, 3, result);
        makeCalc(x);
      }
    };

    // Если есть скобки
    if (x.indexOf("(") >= 0) {
      //  найти в них участок которые можно посчитать
      const [open, close] = nestedBrackets(x);
      const breckets = x.slice(open + 1, close);

      // удалить участок с скобками. и положить в него результат подсчетов
      x.splice(open, breckets.length + 2, ...makeCalc(breckets));
      makeCalc(x);
    }
    makeOperation("/");
    makeOperation("*");
    makeOperation("-");
    makeOperation("+");

    return x;
  };

  return makeCalc(calcList).join("");
}

// 0  -  ((12+5)+1+(1+(10-5)))

// 1  -  (12+5)+1+(1+(10-5))

// 2  -  (12+5)+1+(1+(10-5))

// 3  -  17+1+(1+(10-5))

// 4  -  17+1+(1+(10-5))

// 5  -  17+1+(1+(10-5)) -> 1+(10-5)

// 6  -  17+1+(1+(10-5)) -> 1+(10-5) - 10-5

// 7 -  17+1+(1+5)

// 8 -  17+1+6

// 9 -  24
