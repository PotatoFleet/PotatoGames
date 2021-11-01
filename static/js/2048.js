const slots = document.querySelectorAll(".slot");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

class Number {
  static numbers = [];

  constructor(row, column, num) {
    this.row = row;
    this.column = column;
    this.slot = this.row * 4 + this.column;

    this.num = num;

    let number = document.createElement("div");
    number.classList.add("number");
    number.innerHTML = this.num;

    this.color = `rgb(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200})`
    this.numberDiv = number;
    this.numberDiv.style.backgroundColor = this.color;

    slots[this.slot].appendChild(this.numberDiv);

    Number.numbers.push(this);
  }

  async slideLeft() {
    while (
      this.column > 0 &&
      slots[this.row * 4 + this.column - 1].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 50) {
        this.numberDiv.style.transform = `translateX(-${i}px)`;
        await sleep();
      }

      slots[this.slot].removeChild(this.numberDiv);

      this.slot--;
      this.column--;

      let number = document.createElement("div");
      number.classList.add("number");
      number.innerHTML = this.num;

      this.numberDiv = number;
      this.numberDiv.style.backgroundColor = this.color;

      slots[this.slot].appendChild(this.numberDiv);
    }

    let s = null;
    
    for (const number of Number.numbers) {
      if (number.row === this.row && number.column === this.column - 1) {
        s = number;
      }
    }

    if (this.column > 0 && s != null && s.num == this.num) {
      slots[this.slot].removeChild(this.numberDiv);
      s.numberDiv.innerHTML = 2 * this.num;
      s.number = 2 * this.num;
      s.num *= 2;

      let newNumbers = [];

      for (const number of Number.numbers) {
        if (number != this) newNumbers.push(number);
      }

      Number.numbers = newNumbers;

      delete this;
    }
  }

  async slideRight() {
    while (
      this.column < 3 &&
      slots[this.row * 4 + this.column + 1].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 50) {
        this.numberDiv.style.transform = `translateX(${i}px)`;
        await sleep();
      }

      slots[this.slot].removeChild(this.numberDiv);

      this.slot++;
      this.column++;

      let number = document.createElement("div");
      number.classList.add("number");
      number.innerHTML = this.num;

      this.numberDiv = number;
      this.numberDiv.style.backgroundColor = this.color;

      slots[this.slot].appendChild(this.numberDiv);
    }

    let s = null;

    for (const number of Number.numbers) {
      if (number.row === this.row && number.column === this.column + 1) {
        s = number;
      }
    }

    if (this.column < 3 && s != null && s.num == this.num) {
      slots[this.slot].removeChild(this.numberDiv);
      s.numberDiv.innerHTML = 2 * this.num;
      s.number = 2 * this.num;
      s.num *= 2;

      let newNumbers = [];

      for (const number of Number.numbers) {
        if (number != this) newNumbers.push(number);
      }

      Number.numbers = newNumbers;

      delete this;
    }
  }

  async slideUp() {
    while (
      this.row > 0 &&
      slots[(this.row - 1) * 4 + this.column].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 50) {
        this.numberDiv.style.transform = `translateY(-${i}px)`;
        await sleep();
      }

      slots[this.slot].removeChild(this.numberDiv);

      this.slot -= 4;
      this.row--;

      let number = document.createElement("div");
      number.classList.add("number");
      number.innerHTML = this.num;

      this.numberDiv = number;
      this.numberDiv.style.backgroundColor = this.color;

      slots[this.slot].appendChild(this.numberDiv);
    }

    let s = null;

    for (const number of Number.numbers) {
      if (number.column === this.column && number.row === this.row - 1) {
        s = number;
      }
    }

    if (this.row > 0 && s != null && s.num == this.num) {
      slots[this.slot].removeChild(this.numberDiv);
      s.numberDiv.innerHTML = 2 * this.num;
      s.number = 2 * this.num;
      s.num *= 2;

      let newNumbers = [];

      for (const number of Number.numbers) {
        if (number != this) newNumbers.push(number);
      }

      Number.numbers = newNumbers;

      delete this;
    }
  }

  async slideDown() {
    while (
      this.row < 3 &&
      slots[(this.row + 1) * 4 + this.column].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 50) {
        this.numberDiv.style.transform = `translateY(${i}px)`;
        await sleep();
      }

      slots[this.slot].removeChild(this.numberDiv);

      this.slot += 4;
      this.row++;

      let number = document.createElement("div");
      number.classList.add("number");
      number.innerHTML = this.num;

      this.numberDiv = number;
      this.numberDiv.style.backgroundColor = this.color;

      slots[this.slot].appendChild(this.numberDiv);
    }

    let s = null;

    for (const number of Number.numbers) {
      if (number.column === this.column && number.row === this.row + 1) {
        s = number;
      }
    }

    if (this.row < 3 && s != null && s.num == this.num) {
      slots[this.slot].removeChild(this.numberDiv);
      s.numberDiv.innerHTML = 2 * this.num;
      s.number = 2 * this.num;
      s.num *= 2;

      let newNumbers = [];

      for (const number of Number.numbers) {
        if (number != this) newNumbers.push(number);
      }

      Number.numbers = newNumbers;

      delete this;
    }
  }
}

function createNumber() {

  let emptySlots = [];

  for (let i = 0; i < slots.length; i++) {
    emptySlots.push(i);
  }

  for (const number of Number.numbers) {
    emptySlots.splice(emptySlots.indexOf(number.slot), 1);
  }

  let spawnIndex = Math.floor(Math.random() * (emptySlots.length - 1))

  let spawnSlot = emptySlots[spawnIndex];

  console.log(emptySlots);
  console.log(spawnSlot, Math.floor(spawnSlot / 4), spawnSlot % 4);

  new Number(Math.floor(spawnSlot / 4), spawnSlot % 4, 2);

}

let finished = true;

document.addEventListener("keydown", async (e) => {
  if (finished) {
    finished = false;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      switch (e.keyCode) {
        case 37:
          for (let i = 0; i < Number.numbers.length; i++) {
            for (const number of Number.numbers) {
              await number.slideLeft();
            }
          }
          break;
        case 38:
          for (let i = 0; i < Number.numbers.length; i++) {
            for (const number of Number.numbers) {
              await number.slideUp();
            }
          }
          break;
        case 39:
          for (let i = 0; i < Number.numbers.length; i++) {
            for (const number of Number.numbers) {
              await number.slideRight();
            }
          }
          break;
        case 40:
          for (let i = 0; i < Number.numbers.length; i++) {
            for (const number of Number.numbers) {
              await number.slideDown();
            }
          }
          break;
      }
      await sleep(100);
      createNumber();
    }
    finished = true;
  }
});

createNumber();
