const btn = document.getElementById('Generator')
const names = ["Harry","Oliver","Ali","Sarah","Mark","John","Luke","William","Jefferson","Andy"]
const languages = ["English","Spanish","Urdu","Mandarin",'French',"Spanish","Russian"]
const city = ["oklahoma","Tokyo","Cairo","Istanbul","New York","California","Lahore","Dubai","Cairo"]

const myDocuments = []
// use a for loop that run 10 times
// inside each forloop create an object with the random attributes above and then append it to the array.
// Once it is acheived check if it is working 
// Once it works the data is saved to a database called company inside a collection called employees 
// Every time the button is clicked the previously created collection is deleted and a new collection with the new data is made.
console.log('btn clicked')

async function saveEmployee(employeeData){
    try {
    console.log("Sending request...")
    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Employee saved:', result);
    return result;
  } catch (error) {
    console.error('Error saving employee:', error);
    throw error;
  }
}

btn.addEventListener('click', async () => {
  console.log('btn clicked');
  myDocuments.length = 0;

  // Generate 10 random employee documents
  for (let i = 0; i < 10; i++) {
    const doc = {
      name: names[Math.floor(Math.random() * names.length)],
      language: languages[Math.floor(Math.random() * languages.length)],
      city: city[Math.floor(Math.random() * city.length)]
    };
    myDocuments.push(doc);
  }

  console.log(myDocuments);

  await Promise.all(myDocuments.map(emp => saveEmployee(emp)));
});



