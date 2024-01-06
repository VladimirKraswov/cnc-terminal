export const wait = async (time: number): Promise<boolean> => await new Promise((resolve: (value: boolean) => void) => {
  setTimeout(() => { resolve(true) }, time)
})
