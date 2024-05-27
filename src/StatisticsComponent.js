import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';
import Select from 'react-select';

const fetchDescriptions = async () => {
  try {
    const response = await axios.get('http://localhost:3001/descriptions');
    return response.data.map(item => ({ value: item.id, label: item.description, database: item.database }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

const fetchRelatedData = async (database, id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/related-data/${database}/${id}`);
    return response.data.map(item => ({ name: item.x_datetime, value: item.value }));
  } catch (err) {
    console.error(err);
    return [];
  }
};

const ChartComponent = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [relatedDataSets, setRelatedDataSets] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchDescriptions().then(descriptions => {
    setDescriptions(descriptions);
    setLoading(false);
  });
}, []);

useEffect(() => {
  fetchDescriptions().then(descriptions => {
    setDescriptions(descriptions);
    if (descriptions.length > 0) {
      setSelectedDescription(descriptions[0]);
    }
  });
}, []);
    
  useEffect(() => {
    if (selectedDescription) {
      fetchRelatedData(selectedDescription.database, selectedDescription.value)
        .then(newData => setRelatedDataSets(prevDataSets => [...prevDataSets, {data: newData, description: selectedDescription.label}]));
    }
  }, [selectedDescription]);
  
  const deleteChart = (indexToDelete) => {
    setRelatedDataSets(prevDataSets => prevDataSets.filter((_, index) => index !== indexToDelete));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
return (
<div style={{ maxHeight: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Select 
        options={descriptions} 
        onChange={(option) => setSelectedDescription(option)} 
        isSearchable
        styles={{ container: (base) => ({ ...base, width: '50%' }) }}
    />
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {relatedDataSets.map((relatedDataSet, index) => (
        relatedDataSet.data.length > 0 && (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '45%' }}>
            <h2>{relatedDataSet.description}</h2>
            <button onClick={() => deleteChart(index)}>Dzēst diagrammu</button>
            <div style={{ width: '100%', height: '300px' }}>
              <BarChart width={500} height={300} data={relatedDataSet.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  <LabelList dataKey="value" position="top" angle="-40" offset="20"/>
                </Bar>
                {selectedFilter && <Bar dataKey="value" fill="#82ca9d" />}
              </BarChart>
            </div>
          </div>
        )
      ))}
    </div>
  </div>
);
};

export default ChartComponent;