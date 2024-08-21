document.querySelector('.input-tasks__button').onclick = function () {
    if (document.getElementById('main-input').value === '') {
        return
    }
    let task = document.createElement('div')
    task.classList.add('tasks-place__task')
    document.querySelector('.tasks-place').insertAdjacentElement('beforeend', task)
    task.innerHTML = document.getElementById('main-input').value
    document.getElementById('main-input').value = ''

    let basket = document.createElement('div')
    basket.classList.add('delete-task')
    basket.textContent = 'Удалить'
    task.insertAdjacentElement('beforeend', basket)

    basket.onclick = function () {
        task.remove()
    }
}

document.querySelector('.tasks-place').onclick = function (click) {
    if (!click.target.classList.contains('tasks-place__task')) {
        return
    }

    if (!click.target.classList.contains('tasks-place__task_completed') && !click.target.classList.contains('tasks-place__task_inprogress')) {
        click.target.classList.add('tasks-place__task_completed')
    } else if (click.target.classList.contains('tasks-place__task_completed') && !click.target.classList.contains('tasks-place__task_inprogress')) {
        click.target.classList.replace('tasks-place__task_completed', 'tasks-place__task_inprogress')
    } else if (!click.target.classList.contains('tasks-place__task_completed') && click.target.classList.contains('tasks-place__task_inprogress')) {
        click.target.classList.replace('tasks-place__task_inprogress', 'tasks-place__task_completed')
    }
}

document.querySelector('.options').onclick = function (click) {
    // ФОРМИРУЕМ МАССИВЫ С АКТИВНЫМИ И ЗАВЕРШЕННЫМИ ЗАДАЧАМИ
    let collectionTasks = document.querySelector('.tasks-place').children // коллекция
    let arrayTasks = Array.from(collectionTasks)

    // Заполняем массив с выполнеными заданиями  
    let arrayOfCompletedTasks = []
    for (el of arrayTasks) {
        if (el.className == 'tasks-place__task tasks-place__task_completed') {
            arrayOfCompletedTasks.push(el)
        }
    }

    // Заполняем массив с заданиями, которые ещё НЕ выполнены
    let arrayOfTasksInprogress = []
    for (el of arrayTasks) {
        if (el.className == 'tasks-place__task tasks-place__task_inprogress') {
            arrayOfTasksInprogress.push(el)
        }
    }

    // Выводим те или иные вариации в To do list
    if (click.target.classList.contains('options__ended')) {
        arrayOfCompletedTasks.reverse().forEach(el => {
            document.querySelector('.tasks-place').insertAdjacentElement('afterbegin', el)
        })
    }

    if (click.target.classList.contains('options__active')) {
        arrayOfTasksInprogress.reverse().forEach(el => {
            document.querySelector('.tasks-place').insertAdjacentElement('afterbegin', el)
        })
    }
}

