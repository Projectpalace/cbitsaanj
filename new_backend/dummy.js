const fs = require('fs');
const pdf = require('pdf-parse');



const sendMatter = async () => {

    async function sendData(){
        const dataBuffer = fs.readFileSync('./report.pdf');
        const data = await pdf(dataBuffer);
        return data;
    }

    sendData().then((data) => {
        console.log(data.text);
    })

    
   
}

sendMatter();