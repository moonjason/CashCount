const buttonHandler = () => {
    document.getElementById('addItem').addEventListener('click', async (e) => {
        const itemDesc = document.getElementById('itemDesc').value;
        const itemAmount = document.getElementById('itemAmount').value;
        const message = await fetch('http://localhost:3000/dash/budget', {
            method: "POST",
            body: JSON.stringify({description: itemDesc,
                                  amount: itemAmount}),
            headers: {
                'Content-Type': 'application/json'
            }
        }) // get call 
        const toJson = await message.json();
        console.log(toJson)
    })
}

buttonHandler()