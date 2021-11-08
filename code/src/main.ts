import queue from 'queue'
const doThing = (msg: string, interval: number = 10):() => Promise<string> => {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(msg)
      }, interval)
    })
  }
}

const CONCURRENCY = 10 // 并发数
function main() {
  const taskQueue = queue({
    concurrency: CONCURRENCY
  })
  taskQueue.push(doThing('1'))
  taskQueue.push(doThing('2'))
  taskQueue.push(doThing('3'));

  console.log(typeof ((taskQueue as any).on));
  
  (taskQueue as any).on('success', msg => {
    console.log(msg)
  });

  (taskQueue as any).on('end', () => {
    console.log('所有任务完成')
  })

  taskQueue.start()
}

main()



