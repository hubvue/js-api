async function test() {
  console.log(1)
  const result2 = await test2()
  console.log(result2)
  const result1 = await test1()
  console.log(2)
  console.log(result1)
}
async function test1() {
  console.log(3)
  const result2 = await test2()
  console.log(4)
  console.log(result2)
  return '123'
}
async function test2() {
  return 'Hello world'
}

const bindTest = test.bind(null)

async function run() {
  console.log('11')
  await '123'
  console.log('22')
  await bindTest()
  console.log('33')
}
run()
