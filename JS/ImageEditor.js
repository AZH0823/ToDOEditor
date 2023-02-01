const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img");
const filterSlider = document.querySelector('#filter-slider');
const filterOption = document.querySelectorAll(".filter button");
const filterName = document.querySelector('.silder-info .name')
const filterValue = document.querySelector('.silder-info .value');
const restFilterBtn = document.querySelector('.reset-filter');
const rotateOption = document.querySelectorAll('.icons button')
const saveImageBtn = document.querySelector('.save-img')

const dragArea = document.querySelector(".preview-img")

// set all slider all function default value
let filterOptionValue = {
    brightness: '100',
    saturation: '100',
    inversion: '0',
    grayscale: '0',
}
let rotate = 0,
    filpHorz = 1,
    filpVert = 1;

// img 處理事件
const applyFilterImage = () => {
    previewImg.children[0].style.transform = `rotate(${rotate}deg) scale(${filpHorz},${filpVert})`
    previewImg.children[0].style.filter = `brightness(${filterOptionValue.brightness}%) saturate(${filterOptionValue.saturation}%) invert(${filterOptionValue.inversion}%) grayscale(${filterOptionValue.grayscale}%)`
}
const loadImage = () => {
    let file = fileInput.files[0]; //get input image detail 
    if (!file) return;
    previewImg.children[0].src = URL.createObjectURL(file);
    previewImg.children[0].addEventListener('load', () => {
        document.querySelector('.editor').classList.remove('disable');
    })
}

const DefaultFilterFunction = () => {
    let confirm = window.confirm('Do you wanth delte all filter & align Effect')
    if (!confirm) return
    // console.log(`default Function`)
   
    filterOption.forEach(optionBtn =>optionBtn.classList.remove('active'));
    // 初始化相關DOM 物件 ,
    //    1.filter active 
    //    2.filterName === Brightness 
    //    3.filterval 歸零
    //    4.silder 回到100%
    //    5.sider MAX 回到Bright 200%
    filterOption[0].classList.add('active');
    filterName.innerText = 'Brightness';
    filterValue.innerText = '100%';
    filterSlider.value='100';
    filterSlider.max = 200;

    // 初始化資料結構 filterOption
    filterOptionValue.brightness = '100';
    filterOptionValue.saturation = '100';
    filterOptionValue.inversion = '0';
    filterOptionValue.grayscale = '0';
    rotate = 0,filpHorz = 1,filpVert = 1;
    
    
    // 渲染畫面
    updateSilder()
    applyFilterImage()
}

// 更新update silder
const updateSilder = function () {
    filterValue.innerText = filterSlider.value + '%';
    let selectFilter = document.querySelector('.filter .active')

                       
    switch (selectFilter.id) {
        case 'bringhtness':
            filterOptionValue.brightness = filterSlider.value;
            // console.log( filterOptionValue.brightness)
            break;
        case 'saturation':
            filterOptionValue.saturation = filterSlider.value;
            break;
        case 'inversion':
            filterOptionValue.inversion = filterSlider.value;
            break;
        case 'graysacle':
            filterOptionValue.grayscale = filterSlider.value;
            break;
    }
    applyFilterImage()
}

// 選擇filter 效果 切換Silder 相對應的參數
filterOption.forEach(optionBtn => {
    optionBtn.addEventListener('click', () => {
        document.querySelector('.filter .active').classList.remove("active");

        optionBtn.classList.add("active");
        filterName.innerText = optionBtn.innerText;

        switch (optionBtn.id) {
            case 'bringhtness':
                filterSlider.max = '200';
                filterSlider.value = filterOptionValue.brightness;
                filterValue.innerText = `${filterOptionValue.brightness}%`;
                break;
            case 'saturation':
                filterSlider.max = '200';
                filterSlider.value = filterOptionValue.saturation;
                filterValue.innerText = `${filterOptionValue.saturation}%`;
                break;
            case 'inversion':
                filterSlider.max = '100';
                filterSlider.value = filterOptionValue.inversion;
                filterValue.innerText = `${filterOptionValue.inversion}%`;
                break;
            case 'graysacle':
                filterSlider.max = '100';
                filterSlider.value = filterOptionValue.grayscale;
                filterValue.innerText = `${filterOptionValue.grayscale}%`;
                break;
        }
    })
})


// 圖片位移變形
rotateOption.forEach(optionBtn => {
    optionBtn.addEventListener('click', () => {
        // document.querySelector('.icons .active').classList.remove("active");
        // optionBtn.classList.add("active");

        switch (optionBtn.id) {
            case 'left':
                rotate -= 90;

                break;
            case 'right':
                rotate += 90;

                break;

            case 'horizontal':
                filpHorz = filpHorz === 1 ? -1 : 1;
                break;

            case 'vertical':
                filpVert = filpVert === 1 ? -1 : 1;

                break;

        }
        optionBtn.classList.add('active');
        setTimeout(()=>{
            optionBtn.classList.remove('active')
        },100)
        applyFilterImage();

    })
})

const saveImage = ()=>{
    console.log(`Save IMG`)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width =  previewImg.children[0].naturalWidth; //原始寬高
    canvas.height = previewImg.children[0].naturalHeight;
    
    ctx.filter = `brightness(${filterOptionValue.brightness}%) saturate(${filterOptionValue.saturation}%) invert(${filterOptionValue.inversion}%) grayscale(${filterOptionValue.grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 將旋轉角度更正為設定值
    // angle 參數是使用徑度，會以 canvas 的左上角為軸心去旋轉
    if(rotate !== 0) {
        //將旋轉角度轉為徑度
        ctx.rotate(rotate * Math.PI / 180);
    }
    
    // 將鏡射功能
    ctx.scale(filpHorz, filpVert);
    // 將圖片給畫出來
    ctx.drawImage(previewImg.children[0], -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // document.body.appendChild(canvas)
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}


// 將桌面上資料拖曳自Window
dragArea.addEventListener('dragover',(e)=>{
    e.stopPropagation();
    e.preventDefault();
    dragArea.style.border = "5px dotted red"
})

dragArea.addEventListener('dragleave',()=>{
    setTimeout(()=>{
        dragArea.style.border = "none"
      },300)
})
dragArea.addEventListener('drop',(e)=>{
    e.stopPropagation();
    e.preventDefault();
    const file = e.dataTransfer.files
    console.log(e.dataTransfer.files[0].type)
    // 只能丟Jpeg and PNG 觸發會有alert 畫面
    if(e.dataTransfer.files[0].type !== 'image/png' && e.dataTransfer.files[0].type !== 'image/jpeg'){
        setTimeout(()=>{
            dragArea.style.border = "none"
          },300)
        return alert('不支援此格式\n只支援Jpeg跟PNG格式')
    }
        
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    
    reader.onload = (event) => {
        previewImg.children[0].src = event.target.result;
    };

    setTimeout(()=>{
        dragArea.style.border = "none"
    },300)
})

// load image 事件監聽成功
fileInput.addEventListener('change', loadImage);
// 點擊 chooseImgBtn 可以載入圖片
chooseImgBtn.addEventListener('click', () => fileInput.click());
//sider range input addlistner
filterSlider.addEventListener('input', updateSilder);
//default all filiter all setting 
restFilterBtn.addEventListener('click', DefaultFilterFunction)

//save image
saveImageBtn.addEventListener('click',saveImage);
