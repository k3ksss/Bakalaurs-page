import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import Select from 'react-select';

const ChartComponent = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/descriptions')
      .then(response => {
        setDescriptions(response.data.map(item => ({ value: item.id, label: item.description, database: item.database })));
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedDescription) {
      axios.get(`http://localhost:3001/api/related-data/${selectedDescription.database}/${selectedDescription.value}`)
        .then(response => {
          setRelatedData(response.data.map(item => ({ name: item.x_text, value: item.value })));
        })
        .catch(err => console.error(err));
    }
  }, [selectedDescription]);

  // const options = descriptions.map(item => ({ id: item.id, label: item.description, database: item.database }));


  return (
    <div>
      <Select 
          options={descriptions} 
          onChange={option => setSelectedDescription(option)} 
      />
      {relatedData.length > 0 && (
        <BarChart width={500} height={300} data={relatedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
};

export default ChartComponent;