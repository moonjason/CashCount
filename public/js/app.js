const userId = window.location.href.split('/')[window.location.href.split('/').length - 1];

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

        const newListItem = document.createElement('LI');
        newListItem.dataset.id = toJson._id
        const listContent = await document.createTextNode(`${itemDesc.value} ${itemAmount.value.toString()}`);
        newListItem.appendChild(listContent);
        newListItem.appendChild(form);
        incomeList.appendChild(newListItem);

        itemDesc.value = '';
        itemAmount.value = '';
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
        newListItem.appendChild(edit);
        
        const editBtn = document.createElement('button')
        editBtn.innerHTML = 'Edit';
        newListItem.appendChild(editBtn);

        expenseList.appendChild(newListItem);   


        itemDesc.value = ''
        itemAmount.value = '';
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

const createEditFormExp = (obj) => {
    const div = document.createElement('div');
    const form = document.createElement('form');
    const inputDesc = document.createElement('input');
    const inputAmt = document.createElement('input');
    const editBtn = document.createElement('button');

    editBtn.innerHTML = 'Done';

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/exp?_method=PUT`) 

    inputAmt.setAttribute('type', 'number');
    inputAmt.setAttribute('value', obj.amount);
    inputAmt.setAttribute('name', 'amount');

    inputDesc.setAttribute('type', 'text');
    inputDesc.setAttribute('value', obj.description);
    inputDesc.setAttribute('name', 'description');

    div.setAttribute('id', 'editModal'); 
    
    form.appendChild(inputDesc)
    form.appendChild(inputAmt)
    form.appendChild(editBtn)
    div.appendChild(form)

    return div;
}


const editModal = document.querySelector('#editModal');


inputHandler();
