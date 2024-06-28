function addRow(){
    document.getElementById('main').insertRow(-1).innerHTML = '<th><input type="text" placeholder="Math 150" name="Course"></th><th><input type="text" value="A+" name="Grade" required></th><th><input type="number" min="1" max="4" value="3" name="Credits" required></th>'
}

function calculate(){
    var table = document.getElementById('main');
    var rowLength = table.rows.length;
    let sum = 0;
    let creditCounter = 0;
    for(let i = 1;i < rowLength;i++){
        let cellVal1 = 0, cellVal2 = 0;
        cellVal1 = table.rows[i].cells[1].getElementsByTagName('input')[0].value;
        cellVal2 = table.rows[i].cells[2].getElementsByTagName('input')[0].value;
        creditCounter += Number(cellVal2);
        if(cellVal1 === 'A+' || cellVal1 === 'A' || cellVal1 === 'a+' || cellVal1 === 'a'){
            cellVal1 = 4;
        } else if(cellVal1 === 'B+' || cellVal1 === 'b+'){
            cellVal1 = 3.5;
        } else if(cellVal1 === 'B' || cellVal1 === 'b'){
            cellVal1 = 3;
        } else if(cellVal1 === 'C+' || cellVal1 === 'c+'){
            cellVal1 = 2.5;
        } else if(cellVal1 === 'C' || cellVal1 === 'c'){
            cellVal1 = 2;
        } else if(cellVal1 === 'D' || cellVal1 === 'd'){
            cellVal1 = 1;
        } else cellVal1 = 0;
        sum += ( (Number(cellVal2)) * cellVal1);
    }
    if(creditCounter === 0){
        sum = 0;
    } else sum = sum / creditCounter;
    
    document.getElementById('GPA').innerHTML = `GPA: ${sum}`;
}

function reset(){
    fetch('https://gpa-calculator-anisur-rahman.onrender.com/api/users', {method:'DELETE'})
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })

    location.reload();
}
