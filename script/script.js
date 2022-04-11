const cards = document.querySelector('#cards');
const done = document.querySelector('.done');
const cancel = document.querySelector('.cancel');

get_tasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
get_tasks_status = () => JSON.parse(localStorage.getItem('tasks_status')) || {id: 0, doneValue: 0, cancelValue: 0};

add_task = task => localStorage.setItem('tasks', JSON.stringify([...get_tasks(), task]));

remove_task = task =>{
	const twin_task = get_tasks().filter(elem => elem.id !== task.id);
	localStorage.setItem('tasks', JSON.stringify(twin_task));
};

add_done_status = ()=>{
	const task_status = get_tasks_status();
	task_status.doneValue++;
	localStorage.setItem('tasks_status', JSON.stringify(task_status));
};

add_cancel_status = ()=>{
	const task_status = get_tasks_status();
	task_status.cancelValue++;
	localStorage.setItem('tasks_status', JSON.stringify(task_status));
};

 render = (list)=>{
	let {doneValue, cancelValue} = get_tasks_status();
	done.innerText = 'Сделано ' + doneValue;
	cancel.innerText ='Отменено ' + cancelValue;

	cards.innerText = '';
	for(let elem of list){
		const card = document.createElement('div');
		const taskName = document.createElement('div');
		const taskText =document.createElement('div');
		const pName = document.createElement('p');
		const pText = document.createElement('p');
		const btnDone = document.createElement('button');
		const btnCancel = document.createElement('button');
		
		card.classList.add('card');
		taskName.classList.add('task-name');
		taskText.classList.add('task-text');
		btnDone.classList.add('btn-done');
		btnCancel.classList.add('btn-cancel');
		
		cards.appendChild(card);
		card.append(taskName, taskText);
		taskName.append(pName, btnDone);
		taskText.append(pText, btnCancel);
		
		pName.innerText = elem.title;
		pText.innerText = elem.text;

		btnDone.addEventListener('click', ()=>{
			add_done_status();
			remove_task(elem);
			render(get_tasks());
		});	
		
		btnCancel.addEventListener('click', ()=>{
			add_cancel_status();
			remove_task(elem);
			render(get_tasks());
		});
	};
};

document.forms[0].addEventListener('submit', event=>{
	event.preventDefault();
	const {title, text} = event.target;
	if(title.value !== ''){
		const idTask = get_tasks_status();
		add_task({
			id: idTask.id,
			title: title.value,
			text: text.value,
		});
		idTask.id++;
		localStorage.setItem('tasks_status', JSON.stringify(idTask));
	}
	title.value = '';
	text.value = '';
	render(get_tasks());
});

render(get_tasks());



