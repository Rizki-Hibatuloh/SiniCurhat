const fs = require('fs');
const path = require('path');
const  { generateAIResponse } = require ('../chatAI/curhatAI');
const dataPath = path.join(__dirname, '../data/journals.json');

function loadData () {
    return JSON.parse(fs.readFileSync(dataPath));
}

function saveData (data){
    fs.writeFileSync(dataPath,JSON.stringify(data, null, 2));
}

exports.getAllJournals = (req,res ) => {
    const data = loadData();
    res.json(data);
};

exports.getJournalById = ( req, res ) => {
    const data = loadData();
    const journal = data.find(journal => journal.id === parseInt(req.params.id));
    if(!journal) return res.status(404).json({message : "Not Found"});
    res.json(journal);
};

exports.createJournal = (req, res) => {
    const { title, content , category } = req.body;
    const data = loadData();

    if(!['work','diary','study','travel','schedule','other'].includes(category)){
        return res.status(404).json({ message : "Category Invalid"});
    }

    const newJournal ={
        id: Date.now(),
        title,
        content,
        category,
        createdAt : new Date().toISOString()
    };
    data.push(newJournal);
    saveData(data);
    res.status(201).json(newJournal);
};

exports.updateJournal = (req, res) => {
    const data = loadData();
    const index = data.findIndex(journal => journal.id === parseInt(req.params.id));

    if( index === -1 ) return res.status(404).json({ message : "Not Found"});

    const updated = {
        ...data[index],
        ...req.body,
        updatedAt : new Date().toISOString()
    };

    data[index] = updated;
    saveData(data);

    res.json(updated);
};

exports.deleteJournal = (req, res ) => {
    const data = loadData();
    const index = data.findIndex(journal => journal.id === parseInt(req.params.id));
    if(index === -1 ) return res.status(404).json({ message : "Not Found"});

    data.splice(index, 1);
    saveData(data);

    res.json({ message : "Deleted Successfully" });
};

exports.curhatAi = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const aiResponse = await generateAIResponse(message);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ message: "AI service error" });
  }
};


