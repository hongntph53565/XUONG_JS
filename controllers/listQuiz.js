import {getAllQuiz,deleteQuiz, getQuizById,updateQuiz} from '../services/api.js'
const app ={
    renderListQuiz: async function(){
        // 1. lấy danh sách quiz
        const data = await getAllQuiz();
        // console.log(data);
        // 2. duyệt mảng data và hiển ra tr
        document.querySelector("tbody").innerHTML =data.map((item,index)=>{
            return `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${item.title}</td>
                    <td>${item.isActive ? 
                            `<span class="badge text-bg-success">Kích hoạt</span>`
                            :
                           `<span class="badge text-bg-danger">Chưa kích hoạt</span>`
                        }</td>
                    <td>${item.time}</td>
                    <td>${item.description}</td>
                    <td>
                    <button data-id="${item.id}" class="btn_edit btn btn-warning">Sửa</button>
                    <button data-id="${item.id}" class="btn_delete btn btn-danger">Xóa</button>
                    </td>
                </tr>
            `
        }).join("")
        this.handleDelete();
        this.handleEditQuiz();
    },
    handleDelete : function () {
        const btnDeletes = document.querySelectorAll('.btn_delete');
        btnDeletes.forEach((item)=>{
            item.addEventListener('click', async ()=>{
                // console.log(item);
                const id = item.dataset.id;
                // console.log(id);
                if(window.confirm(`Bạn có chắc chắn xóa quiz này không?`)){
                await deleteQuiz(id);
                alert('Xóa thành công');
                }
            })
        })
    },
    handleEditQuiz: async function(){
        const btnEdits = document.querySelectorAll('.btn_edit');
        btnEdits.forEach((item)=>{
            item.addEventListener('click', async ()=>{
                // console.log(item);
                const id = item.dataset.id;
                console.log(id);
                const  quiz = await getQuizById(id);
                // console.log(quiz);
                
                const content = document.querySelector('#content')
                content.innerHTML = `
                <div id="form" class="container">
                    <h1>Cập nhật quiz</h1>

                    <form id="">
                        <div class="mb-3">
                        <label for="title" class="form-label">Tên quiz</label>
                        <input type="text" class="form-control" id="title" value="${quiz.title}">
                        </div>

                        <div class="mb-3">
                            <label for="title" class="form-label">Trạng thái</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="isActive" value="${quiz.isActive}">
                                <label class="form-check-label" for="isActive">
                                    Kích hoạt
                                </label>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="time" class="form-label">Thời gian</label>
                            <input type="number" class="form-control" id="time" value="${quiz.time}">
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Mô tả</label>
                            <textarea class="form-control" id="description" rows="3"value="${quiz.description}"></textarea>
                        </div>
                    
                    
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>`

                const formEdit = document.getElementById('form')
                    .addEventListener("submit",async(e)=>{
                    // ngăn chặn hành vi load trang
                    e.preventDefault();
                    this.handleUpdateQuiz(id);
                })
            })
        })
    },
    handleUpdateQuiz: async function(id){
        // 2. lấy input
        const inputTitle = document.getElementById('title');
        const inputIsActive = document.getElementById('isActive');
        const inputTime = document.getElementById('time')
        const inputDescription = document.getElementById('description');

        //3 . validate
        if(!inputTitle.value.trim()){
            alert("Cần nhập thông tin tên quiz");
            inputTitle.focus();
            return; // ngăn chặn thực thi các tác vụ tiếp theo
        }

        if(!inputTime.value.trim()){
            alert("Cần nhập thông tin thời gian");
            inputTime.focus();
            return; // ngăn chặn thực thi các tác vụ tiếp theo
        }

        // 4. lấy dữ liệu
        const data = {
            title : inputTitle.value,
            isActive : inputIsActive.checked,
            time: inputTime.value,
            description :inputDescription.value || ""
        }

        // 5. thêm mới db

        // console.log(data);
        await updateQuiz(id,data);
        alert("Cập nhật thành công");
        
    },
    start: function(){
        this.renderListQuiz();
    }
}

app.start();