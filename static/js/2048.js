const slots = document.querySelectorAll(".slot");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

class Number {
  static numbers = [];

  constructor(row, column, num) {
    this.row = row;
    this.column = column;
    this.num = num;

    let number = document.createElement("div");
    number.classList.add("number");
    number.innerHTML = this.num;

    this.numberDiv = number;
    this.slot = this.row * 4 + this.column;

    slots[this.slot].appendChild(this.numberDiv);

    Number.numbers.push(this);
  }

  async slideLeft() {
    while (
      this.column > 0 &&
      slots[this.row + this.column - 1].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 10) {
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

      slots[this.slot].appendChild(this.numberDiv);
    }
  }

  async slideRight() {
    while (
      this.column < 3 &&
      slots[this.row + this.column + 1].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 10) {
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

      slots[this.slot].appendChild(this.numberDiv);
    }
  }

  async slideUp() {
    while (
      this.row > 0 &&
      slots[this.row - 1 + this.column].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 10) {
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

      slots[this.slot].appendChild(this.numberDiv);
    }
  }

  async slideDown() {
    while (
      this.row < 3 &&
      slots[this.row + 1 + this.column].children.length == 0
    ) {
      for (let i = 0; i < this.numberDiv.offsetWidth; i += 10) {
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

      slots[this.slot].appendChild(this.numberDiv);
    }
  }
}

new Number(2, 1, 2);
new Number(3, 3, 2);

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      for (const number of Number.numbers) {
        number.slideLeft();
      }
      break;
    case 38:
      for (const number of Number.numbers) {
        number.slideUp();
      }
      break;
    case 39:
      for (const number of Number.numbers) {
        number.slideRight();
      }
      break;
    case 40:
      for (const number of Number.numbers) {
        number.slideDown();
      }
      break;
  }
});
