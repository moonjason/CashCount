const userId = window.location.href.split('/')[window.location.href.split('/').length - 1];

if (document.getElementById('addInc').value === '' || document.getElementById('addExp').value === '') {

}

const inputHandler = () => {
    const itemDesc = document.getElementById('itemDesc');
    const itemAmount = document.getElementById('itemAmount');
    
    const incomeList = document.getElementById('inc')
    const expenseList = document.getElementById('exp')

    document.getElementById('addInc').addEventListener('click', async (e) => {
    
        const message = await fetch(`http://localhost:3000/dash/${userId}/budget/inc`, {
            method: "POST",
            body: JSON.stringify({
                description: itemDesc.value,
                amount: itemAmount.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }) // get call 
        const toJson = await message.json();
        console.log(toJson, '<--- Add Inc')
        const form = createDeleteFormInc(toJson);  
        const edit = createEditFormInc(toJson);

        const newListItem = document.createElement('LI');
        newListItem.dataset.id = toJson._id
        const listContent = await document.createTextNode(`${itemDesc.value} ${itemAmount.value.toString()}`);
        newListItem.appendChild(listContent);
        newListItem.appendChild(form);

        const editBtn = document.createElement('button')
        editBtn.setAttribute('class', 'editInc');
        editBtn.innerHTML = 'Edit';
        newListItem.appendChild(editBtn);
        newListItem.appendChild(edit);

        incomeList.appendChild(newListItem);

        itemDesc.value = '';
        itemAmount.value = '';
        location.reload();
    })

    document.getElementById('addExp').addEventListener('click', async (e) => {
        const url = `http://localhost:3000/dash/${userId}/budget/exp`

        console.log(url)
        
        const message = await fetch(url     , {
            method: "POST",
            body: JSON.stringify({
                description: itemDesc.value,
                amount: itemAmount.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }) // get call 
        const toJson = await message.json();
        console.log(toJson, '<---add Exp')
        const form = createDeleteFormExp(toJson);  
        const edit = createEditFormExp(toJson);
        const newListItem = document.createElement('LI');
        newListItem.dataset.id = toJson._id
        const listContent = await document.createTextNode(`${itemDesc.value} ${itemAmount.value.toString()}`);
        newListItem.appendChild(listContent);
        newListItem.appendChild(form);
        
        const editBtn = document.createElement('button')
        editBtn.setAttribute('class', 'editExp');
        editBtn.innerHTML = 'Edit';
        newListItem.appendChild(editBtn);
        newListItem.appendChild(edit);

        expenseList.appendChild(newListItem);   

        itemDesc.value = '';
        itemAmount.value = '';
    })

    console.log(document.querySelectorAll('.editInc'))
    const allIncEdits = document.querySelectorAll('.editInc');
    allIncEdits.forEach(edit => {
        edit.addEventListener('click', (e) => {
            const index = edit.classList[1]
            const modal = document.getElementsByClassName(`editModalInc ${index}`);
            modal[0].style.display = 'block';
        })
    })

    console.log(document.querySelectorAll(".editExp"))
    const allExpEdits = document.querySelectorAll('.editExp');
    allExpEdits.forEach(edit => {
        edit.addEventListener('click', (e) => {
            const index = edit.classList[1]
            const modal = document.getElementsByClassName(`editModalExp ${index}`);
            modal[0].style.display = 'block';
        })
    })

    console.log(document.querySelectorAll('.doneInc'))
    const allIncDones = document.querySelectorAll('.doneInc');
    allIncDones.forEach(done=> {
        done.addEventListener('click', () => {
            const index = done.classList[1]
            const modal = document.getElementsByClassName(`editModalInc ${index}`);
            console.log(modal)
            modal[0].style.display = 'none';
        }) 
    })

    console.log(document.querySelectorAll('.doneExp'))
    const allExpDones = document.querySelectorAll('.doneExp');
    allExpDones.forEach(done=> {
        done.addEventListener('click', () => {
            const index = done.classList[1]
            const modal = document.getElementsByClassName(`editModalExp ${index}`);
            console.log(modal)
            modal[0].style.display = 'none';
        }) 
    })

}



const createDeleteFormInc = (obj) => {
    const form = document.createElement('form')
    const btn = document.createElement('button')
    btn.setAttribute('type', 'submit')
    btn.innerText = 'X'
    form.dataset.id = obj._id

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/inc?_method=DELETE`) 

    // add btn to form
    form.appendChild(btn)
    // form.onsubmit = onSubmit
    return form;
}

const createDeleteFormExp = (obj) => {
    const form = document.createElement('form')
    const btn = document.createElement('button')
    btn.setAttribute('type', 'submit')
    btn.innerText = 'X'
    form.dataset.id = obj._id

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/exp?_method=DELETE`) 

    // add btn to form
    form.appendChild(btn)
    // form.onsubmit = onSubmit
    return form;
}

const createEditFormInc = (obj) => {
    const div = document.createElement('div');
    const form = document.createElement('form');
    const inputDesc = document.createElement('input');
    const inputAmt = document.createElement('input');
    const editBtn = document.createElement('button');

    editBtn.setAttribute('id', 'done1');
    editBtn.innerHTML = 'Done';

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/inc?_method=PUT`) 

    inputAmt.setAttribute('type', 'number');
    inputAmt.setAttribute('value', obj.amount);
    inputAmt.setAttribute('name', 'amount');

    inputDesc.setAttribute('type', 'text');
    inputDesc.setAttribute('value', obj.description);
    inputDesc.setAttribute('name', 'description');

    div.setAttribute('class', 'editModalInc'); 

    form.appendChild(inputDesc)
    form.appendChild(inputAmt)
    form.appendChild(editBtn)
    div.appendChild(form)

    return div;
}

const createEditFormExp = (obj) => {
    const div = document.createElement('div');
    const form = document.createElement('form');
    const inputDesc = document.createElement('input');
    const inputAmt = document.createElement('input');
    const editBtn = document.createElement('button');

    editBtn.setAttribute('id', 'done2');
    editBtn.innerHTML = 'Done';

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/exp?_method=PUT`) 

    inputAmt.setAttribute('type', 'number');
    inputAmt.setAttribute('value', obj.amount);
    inputAmt.setAttribute('name', 'amount');

    inputDesc.setAttribute('type', 'text');
    inputDesc.setAttribute('value', obj.description);
    inputDesc.setAttribute('name', 'description');

    div.setAttribute('class', 'editModalExp'); 
    
    form.appendChild(inputDesc)
    form.appendChild(inputAmt)
    form.appendChild(editBtn)
    div.appendChild(form)

    return div;
}

inputHandler();