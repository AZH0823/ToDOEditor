// silider 物件
let slider_length = document.querySelector(".pass-length input[type='range']")

// detail span 標籤
let details = document.querySelector(".pass-length span")
// 產生
let generBTN = document.querySelector(".gener-btn")
let options = document.querySelectorAll('.option input')
let textInput = document.querySelector('.inputbox input')
// 密碼強度
let passIndicator = document.querySelector('.pass-indicator')
let copyIcon = document.querySelector('.copy')

let charTemplate ={
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKMNOPQRSTUVWXYZ",
    number: "0123456789",
    sysboml: "^!$%&|[](){}:;.,*+-#@<>~"
}
let finshedRanderNunber = ''
// 更新silder的值給detail span
function sliderUpdate(){
    drawSlider_length(slider_length)
    generRanderClick()
    updatePassIndicator()
}
function drawSlider_length(silider){
    details.textContent=silider.value
}
function generRanderClick(){
    // 儲存Random 抽取密碼的結果
    let randomPassword =''
    // 放置使用者所勾選地的input 選項
    let tempPassword = ''
    let passLength = slider_length.value
    let excludeDulicate = false //重複出現的字母給刪除
    options.forEach((option)=>{
        if(option.checked){
            if(option.id !=='exc-duplicate' && option.id !=="spaces"){
                tempPassword += charTemplate[option.id]

            }else if(option.id === "spaces"){
                tempPassword +=`  ${tempPassword}  `
            }else{
                excludeDulicate = true
            }
        }
    })
    
    for(let i=0;i < passLength; i++){
        let randomChar = tempPassword[Math.floor(Math.random() * tempPassword.length)]
        
        if(excludeDulicate){
            if(!(randomPassword.includes(randomChar))|| randomChar==="  "){
                randomPassword += randomChar   
            }else{
                // 有重複的話，重做一次
                i--   
            }
        }else{
            randomPassword += randomChar
        }
    }
    textInput.value = randomPassword
    // console.log(randomPassword)
}

const updatePassIndicator=(()=>{
    let passwordCount = slider_length.value
    passIndicator.id = slider_length.value <= 8? 'weak' : passwordCount<=16 ? 'medium' :"Strong"
})

function copyPassword(){
    // 將輸入框中所產生的文字複製下來
    // navigator.clipboard.writeText
    // navigator.clipboard.writeText(`${randomPassword}`)
    copyIcon.style.color = "#4285F4";
    copyIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>'  
}
copyIcon.addEventListener('click',copyPassword)
slider_length.addEventListener('input',sliderUpdate)

generBTN.addEventListener('click',generRanderClick)