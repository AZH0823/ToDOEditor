function focusHandle() {
    // console.log(this)
    $("input.task_name").closest('.task_add_block').addClass("-on")
}

function blurHandle() {
    $("input.task_name").closest('.task_add_block').removeClass("-on")
}

function addlistitem() {
    if ($("input.task_name").val().trim() === "") return alert("代辦事項為空值")
    $('.task_list').prepend(`
    <li>
        <div class="item_flex">
        <div class="left_block">
            <div class="btn_flex">
            <button type="button" class="btn_up">往上</button>
            <button type="button" class="btn_down">往下</button>
            </div>
        </div>
        <div class="middle_block">
            <div class="star_block">
            <span class="star" data-star="1"><i class="fas fa-star"></i></span>
            <span class="star" data-star="2"><i class="fas fa-star"></i></span>
            <span class="star" data-star="3"><i class="fas fa-star"></i></span>
            <span class="star" data-star="4"><i class="fas fa-star"></i></span>
            <span class="star" data-star="5"><i class="fas fa-star"></i></span>
            </div>
            <p class="para">${$("input.task_name").val()}</p>
            <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${$("input.task_name").val()}">
        </div>
        <div class="right_block">
            <div class="btn_flex">
            <button type="button" class="btn_update">更新</button>
            <button type="button" class="btn_delete">移除</button>
            </div>
        </div>
        </div>
    </li>`)
    removeInputbox()

}

function removeInputbox() {
    $("input.task_name").val("")
}

function removeElemnt() {
    if (this.className === "btn_empty") {
        let confrim = confirm('確定刪除全部資料')
        if (confrim && $('li').length > 0) {
            $('li').fadeOut(1000, function () {
                $('li').remove()
            })
        } else alert('沒有工作項目資料可以刪除')
    } else if (this.className === 'btn_delete') {
        // $('btn_delete').prompt("Please enter your name", "Harry Potter");
        let confrim = confirm('確定刪除此筆資料')
        let LIitem = $(this).closest('li')

        if (confrim) {
            $(LIitem).fadeOut(1000, function () {
                $(LIitem).remove()
            })
        }
    }
}

function updateElemnt() {
    if (this.className === 'btn_update') {
        // 抓到最近的P段落文字
        let para = $(this).closest('.right_block').prev(".middle_block").find('.para')

        //抓到最近中間INPUT
        let task_name_update = $(this).closest('.right_block').prev(".middle_block").find('.task_name_update')



        $(para).toggleClass("-none")
        $(task_name_update).toggleClass('-none')


        if ($(para).attr('class') === 'para' &&
            $(para).text().trim() !== $(task_name_update).val().trim() &&
            $(task_name_update).val().trim() !== "") {
            let confirmMod = confirm(`確定修改此筆資料`)
            if (confirmMod) {
                $(para).text(`${$(task_name_update).val().trim()}`)
            } else {
                $(task_name_update).val($(para).text())
            }
        } else {
            $(task_name_update).val('')
        }
    }
}

function updateStars() {
    const nowLi = $(this).closest('li')
    const clickStatsIndex = $(this).data('star')
    $(nowLi).find('.star').removeClass("-on")

    for (let i = 0; i < clickStatsIndex; i++) {
        $(nowLi).find('.star').eq(`${i}`).addClass('-on')
    }
}

function orderlist() {
    const nowLi = $(this).closest('li')

    if ($(this)[0].className === "btn_up" && !$(nowLi).is(':first-child')) {

        let preLi = $(nowLi).prev()
        $(preLi).before($(nowLi).clone(true))
        $(nowLi).remove()
    } else if ($(this)[0].className === "btn_down" && !$(nowLi).is(':last-child')) {

        let nextLi = $(nowLi).next()
        $(nextLi).after($(nowLi).clone(true))
        $(nowLi).remove()
    }
}

function keyupHandler(e) {
    if (e.keyCode === 13) {
        addlistitem()
    }

}

$("input.task_name").on('focus', focusHandle)
$("input.task_name").on('blur', blurHandle)

$("button.task_add").on('click', addlistitem)
$('input.task_name').on('keyup', keyupHandler)
$('.btn_empty').on('click', removeElemnt)

// li item Delete
$(document).on('click', '.btn_delete', removeElemnt)

//li item Update
$(document).on('click', '.btn_update', updateElemnt)

// order Update
$(document).on('click', '.btn_up', orderlist)
$(document).on('click', '.btn_down', orderlist)
//star update
$(document).on('click', '.star', updateStars)