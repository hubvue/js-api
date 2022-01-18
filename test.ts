// async function fn1() {
// 	await fn2();
//   	console.log(2);
// }

// async function fn2() {
// 	console.log(1);
// }
// interface FunctorInterface {
//   map: (g: any) => FunctorInterface
//   runWith: (x: any) => any
// }
// const Effect = (f): FunctorInterface => ({
//   map: g => Effect(x => g(f(x))),
//   runWith: x => f(x)
// })

// const a = x => x + 1
// Effect(a)
//   .map(x => x * x)
//   .runWith(2)

// const F = (x): void => x + 1

const numbers: Array<number> = [4, 10, 0, 27, 42, 17, 15, -6, 58]
const favers: Array<any> = []
let magicNumber: number = 0

function calculateMagicNUmber(): void {
  for (let fave of favers) {
    magicNumber += fave
  }
}

function pickFavoriteNumbers(): void {
  for (let num of numbers) {
    if (num >= 10 && num <= 20) {
      favers.push(num)
    }
  }
}

function outputMas(): string {
  const msg = `The magic number is : ${magicNumber}`
  return msg
}
