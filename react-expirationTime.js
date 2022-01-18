
// 这个值就是 Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
// export default 1073741823;
const MAX_SIGNED_31_BIT_INT = 1073741823;

const NoWork = 0;
const Never = 1;
// Sync 的值就是Math.prow(2,30) - 1
const Sync = MAX_SIGNED_31_BIT_INT;  

const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 1;

function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  // 这个地方 | 0是取整的意思
  // 返回的值就是  Math.pow(2, 30) -2 - ((程序执行到现在的performance.now() - react加载完成的performance.now()) / 10 | 0)
  // 得到的是一个确切的数字值。
  return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}

function expirationTimeToMs(expirationTime) {
  return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
}
// 这里计算expirationTime
function ceiling(num, precision) {
  return (((num / precision) | 0) + 1) * precision;
}
// 这个地方的计算表示的是时间是基于一个单元往上加的，bucketSizeMs / 10,这个计算出来就是一个单元
// bucketSizeMs有两种取值，250和100，那么ceiling中的precision单元就是25或者10
// 就是说，如果下面一个值是currentTime为25，那么上面的值只有比25大25或者大10才会加单元

// 这个东西的作用是，在react中连续的执行了几次setState，虽然是连续执行，但是在毫秒级别上还是不一样的，就会造成优先级不能，让react练习更新。
// 使用这个方式算出来的时间，在一个单元时间内是相同的，所以就会认为优先级是相同的。优先级相同就会在一个更新队列中更新。
// TODO：这应该就是批量更新的原理。
function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs,
) {
  return (
    1073741822 -
    ceiling(
      1073741822 - currentTime + 500 / 10,
      bucketSizeMs / 10,
    )
  );
}

const LOW_PRIORITY_EXPIRATION = 5000;
const LOW_PRIORITY_BATCH_SIZE = 250;

function computeAsyncExpiration(
  currentTime
) {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  );
}
const HIGH_PRIORITY_EXPIRATION = 500;
const HIGH_PRIORITY_BATCH_SIZE = 100;

// 
function computeInteractiveExpiration(currentTime) {
  debugger;
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  );
}

console.log(computeInteractiveExpiration(0));