const buttonHandler = () => {
    const itemDesc = document.getElementById('itemDesc');
    const itemAmount = document.getElementById('itemAmount');
    
    const incomeList = document.getElementById('inc')
    const expenseList = document.getElementById('exp')
    const userId = window.location.href.split('/')[window.location.href.split('/').length - 1];

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
        console.log(toJson)

        const newListItem = document.createElement('LI');
        const listContent = await document.createTextNode(`${itemDesc.value} ${itemAmount.value.toString()}`);
        await newListItem.appendChild(listContent);
        await incomeList.appendChild(newListItem);

        itemDesc.value = '';
        itemAmount.value = '';
    })

    document.getElementById('addExp').addEventListener('click', async (e) => {
        
        const message = await fetch(`http://localhost:3000/dash/${userId}/budget/exp`, {
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
        console.log(toJson)

        const newListItem = document.createElement('LI');
        const listContent = await document.createTextNode(`${itemDesc.value} ${itemAmount.value.toString()}`);
        await newListItem.appendChild(listContent);
        await expenseList.appendChild(newListItem);

        itemDesc.value = ''
        itemAmount.value = '';
    })
}

buttonHandler();