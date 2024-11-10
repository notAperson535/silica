let output = 'convert logo.png -write mpr:img +delete '
let array = [16, 22, 24, 32, 48, 64, 128, 256, 512]
for (let i = 0; i < array.length; i++) {
  output += `\\( mpr:img -resize ${array[i]}x${array[i]} +write logo${array[i]}.png \\) `
}
output += 'null:'
const { exec } = require('child_process')

exec(output, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`)
    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})
