const app ={
    handleUpdateQuiz: async function(){
        const btnEdits = document.querySelectorAll('.btn_edit');
        btnEdits.forEach((item)=>{
            item.addEventListener('click', async ()=>{
                console.log(item);
                const id = item.dataset.id;
                console.log(id);
            })
            })
    },

    start: function(){
     this.handleUpdateQuiz();
    }
}

app.start();
