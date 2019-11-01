const userId = window.location.href.split('/')[window.location.href.split('/').length - 1];

const inputHandler = () => {
    const itemDesc = document.getElementById('itemDesc');
    const itemAmount = document.getElementById('itemAmount');
    
    const incomeList = document.getElementById('inc');
    const expenseList = document.getElementById('exp');

    document.getElementById('addInc').addEventListener('click', async (e) => {
        if (document.getElementById('itemAmount').value.length === 0) {
            return; 
        }
        console.log(budget)
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
        const editForm = createEditFormInc(toJson);

        const newListItem = document.createElement('LI');
        newListItem.dataset.id = toJson._id;
        newListItem.setAttribute('class', 'animated slideInUp fast');
        const listContent = await document.createTextNode(`${itemDesc.value} \u00A0\u00A0\u00A0\u00A0 ${itemAmount.value.toString()}`);
        newListItem.appendChild(listContent);
        newListItem.appendChild(form);

        const num = document.querySelectorAll('.editInc');

        const editBtn = document.createElement('button')
        editBtn.setAttribute('class', `editInc ${num.length}`);
        editBtn.innerHTML = 'Edit';

        editBtn.addEventListener('click', () => {
            const index = editBtn.classList[1]
            const modal = document.getElementsByClassName(`editModalInc ${index}`);
            modal[0].style.display = 'block';
        })

        newListItem.appendChild(editBtn);
        newListItem.appendChild(editForm);

        incomeList.appendChild(newListItem);

        document.getElementById('budget').innerText = (parseFloat(document.getElementById('budget').innerText) + parseFloat(itemAmount.value)).toFixed(2)
        itemDesc.value = '';
        itemAmount.value = '';
    })

    document.getElementById('addExp').addEventListener('click', async (e) => {
        if (document.getElementById('itemAmount').value.length === 0) {
            return; 
        }

        const url = `http://localhost:3000/dash/${userId}/budget/exp`

        const message = await fetch(url, {
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

        const delForm = createDeleteFormExp(toJson);  
        const editForm = createEditFormExp(toJson);
        const newListItem = document.createElement('LI');
        newListItem.dataset.id = toJson._id
        const listContent = await document.createTextNode(`${itemDesc.value} \u00A0\u00A0\u00A0\u00A0 ${itemAmount.value.toString()}`);
        newListItem.appendChild(listContent);
        newListItem.appendChild(delForm);
        
        const num = document.querySelectorAll('.editExp');
    
        const editBtn = document.createElement('button')
        editBtn.setAttribute('class', `editExp ${num.length}`);
        editBtn.innerHTML = 'Edit';

        editBtn.addEventListener('click', () => {
            const index = editBtn.classList[1]
            const modal = document.getElementsByClassName(`editModalExp ${index}`);
            modal[0].style.display = 'block';
        })
        newListItem.appendChild(editBtn);
        newListItem.appendChild(editForm);
        newListItem.setAttribute('class', 'animated slideInUp fast');

        expenseList.appendChild(newListItem);   

        document.getElementById('budget').innerText = (parseFloat(document.getElementById('budget').innerText) - parseFloat(itemAmount.value)).toFixed(2)

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
            console.log(index, '<--- index');
            modal[0].style.display = 'block';
        })
    })

    console.log(document.querySelectorAll('.doneInc'))
    const allIncDones = document.querySelectorAll('.doneInc');
    allIncDones.forEach(done=> {
        done.addEventListener('click', async () => {
            const index = done.classList[1]
            const modal = document.getElementsByClassName(`editModalInc ${index}`);
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

    const numDone = document.querySelectorAll('.doneInc');
    editBtn.setAttribute('class', `doneInc ${numDone.length}`);
    editBtn.innerHTML = 'Done';

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/inc?_method=PUT`) 

    inputAmt.setAttribute('type', 'number');
    inputAmt.setAttribute('value', obj.amount);
    inputAmt.setAttribute('name', 'amount');
    inputAmt.setAttribute('step', '0.1')

    inputDesc.setAttribute('type', 'text');
    inputDesc.setAttribute('value', obj.description);
    inputDesc.setAttribute('name', 'description');

    const num = document.querySelectorAll('.editModalInc');
    div.setAttribute('class', `editModalInc ${num.length} animated fadeInLeft faster`); 

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

    const numDone = document.querySelectorAll('.doneExp');
    editBtn.setAttribute('class', `doneExp ${numDone.length}`);
    editBtn.innerHTML = 'Done';

    form.setAttribute('method', 'POST')
    form.setAttribute('action', `/dash/${obj._id}/exp?_method=PUT`) 

    inputAmt.setAttribute('type', 'number');
    inputAmt.setAttribute('value', obj.amount);
    inputAmt.setAttribute('name', 'amount');
    inputAmt.setAttribute('step', '0.1')

    inputDesc.setAttribute('type', 'text');
    inputDesc.setAttribute('value', obj.description);
    inputDesc.setAttribute('name', 'description');

    const numModal = document.querySelectorAll('.editModalExp');
    div.setAttribute('class', `editModalExp ${numModal.length} animated fadeInLeft faster`); 
    
    form.appendChild(inputDesc)
    form.appendChild(inputAmt)
    form.appendChild(editBtn)
    div.appendChild(form)

    return div;
}

inputHandler();