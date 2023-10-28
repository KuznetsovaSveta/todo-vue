const vm = new Vue({
    el:"#app",
    data:{
        nameInput: '',
        descriptionInput: '',
        toDoList: [],
        completeList: [],
        // categoriesList: ['All'],
        currentPopup: false,
        // currentMenu: false,
        modalTitle: 'Add Task',
        isEditing: false,
        editingIndex: '',
        // categoryInput: '',
    },
    methods:{
        //работа с полем ввода
        setTitle(event){
            //Присваиваем переменной nameInput введенное пользователем значение
            this.nameInput = event.target.value;
        },
        setDescription(event){
            this.descriptionInput = event.target.value;
        },
        // addNewCategory(){
        //     if(this.categoryInput === '') {return}
        //     this.categoriesList.push({
        //         id: Math.random(),
        //         title: this.categoryInput,
        //     });
        //     this.categoryInput = '';
        // },
        addNewTask(){
            //если пустая строка
            if(this.nameInput === '') {return}

            //присваиваем введенное пользователем значение в title элемента из массива toDoList
            this.toDoList.push({
                id: Math.random(),
                title: this.nameInput,
                description: this.descriptionInput,
            });
            this.descriptionInput = '';
            this.nameInput = '';
            this.currentPopup = false;
        },
        doCheck(index, type){
            //если у пункта тип "need"
            if(type === 'need'){
                //удаляем один пункт из туДу списка
                const completeMask = this.toDoList.splice(index, 1);
                //и вставляем его в массив выполненных задач
                this.completeList.push(...completeMask);
                console.log(index);
            } else{
                //если нажимаем на чекбокс выполненного пункта, то из массива выполненных задач удаляем один пункт
                const notCompleteMask = this.completeList.splice(index, 1);
                //и вставляем его в массив не выполненных задач
                this.toDoList.push(...notCompleteMask);
                console.log(index);
            }
        },
        removeTask(index, type){
            const list = type === 'need' ? this.toDoList : this.completeList;
            list.splice(index,1);
        },
        startEditTask(index){
            this.showPopup('edit');
            //пишем текущее имя в поле ввода
            this.nameInput = this.toDoList[index].title;
            this.descriptionInput = this.toDoList[index].description;
            this.editingIndex = index;
        },
        setNewData(){
            //проверяем на пустоту
            if(this.nameInput === '') { return }

            //присваиваем новое имя
            this.toDoList[this.editingIndex].title = this.nameInput;
            this.toDoList[this.editingIndex].description = this.descriptionInput;

            //очищаем поле ввода
            this.nameInput = '';
            this.descriptionInput = '';
            //и текущий индекс
            this.editingIndex = '';

            //    закрываем модальное окно
            this.currentPopup = false;
        },
        showPopup(action){
            this.currentPopup = true;
            if(action === 'edit'){
                this.modalTitle = 'Edit Task';
                this.isEditing = true;
            } else {
                this.modalTitle = 'Add Task';
                this.isEditing = false;
            }
        },
        closePopup(){
            this.currentPopup = false;
        },
        toggleMenu(event) {
            event.target.closest('.task__right').lastChild.classList.toggle('task__menu-active');
        },
    },
    computed: {
        localeDate(){
            return new Date;
        },
        currentDay(){
            let day = this.localeDate.getDay();
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[day] + ',';
        },
        currentNum() {
            let num = this.localeDate.getDate();
            return  num > 9 ? num + 'th' : ' 0' + num + 'th';
        },
        currentMonth(){
            let month = this.localeDate.getMonth();
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[month];
        }
    },
    created() {
        this.intervalId = setInterval(() => this.date = Date.now(), 1000);
    },
    beforeDestroy() {
        if (this.intervalId) clearInterval(this.intervalId)
    },
})