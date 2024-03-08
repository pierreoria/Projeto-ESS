import React, { useState } from 'react';


function Inventory() {
  const [cnpj, setCnpj] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCnpj(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/backend/api/inventory/${cnpj}`);
      if (!response.ok) {
        throw new Error('Falha na obtenção do conteúdo do inventário');
      }
      const data = await response.json();
      setResponseData(data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Falha na obtenção do conteúdo do inventário');
    }
  };

  return (
    <div>
      <h1>Visualização do Inventário</h1>
      <input
        type="text"
        value={cnpj}
        onChange={handleInputChange}
        placeholder="Digite o CNPJ"
      />
      <button onClick={handleButtonClick}>Visualizar Inventário</button>
      {error && <p>{error}</p>}
      {responseData && (
        <div>
          <h2>Status: {responseData.status_code}</h2>
          <p>Mensagem: {responseData.message}</p>
          <p>Itens:</p>
          <ul>
            {responseData.data.map((item, index) => (
              <li key={index}>
                <div>
                  <p>ID: {item.id_item}</p>
                  <p>Nome: {item.nome}</p>
                  <p>Quantidade: {item.qnt}</p>
                  <p></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Inventory;



/*
function Inventory() {
  const [cnpj, setCnpj] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCnpj(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/backend/api/inventory/${cnpj}`);
      if (!response.ok) {
        throw new Error('Falha na obtenção do conteúdo do inventário');
      }
      const data = await response.json();
      setResponseData(data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Falha na obtenção do conteúdo do inventário');
    }
  };

  return (
    <div>
      <h1>Visualização do Inventário</h1>
      <input
        type="text"
        value={cnpj}
        onChange={handleInputChange}
        placeholder="Digite o CNPJ"
      />
      <button onClick={handleButtonClick}>Visualizar Inventário</button>
      {error && <p>{error}</p>}
      {responseData.data && (
  <div>
    <h2>Status: {responseData.status_code}</h2>
    <p>Mensagem: {responseData.message}</p>
    <p>Itens:</p>
    <ul>
      {Array.isArray(responseData.data) ? (
        responseData.data.map((item, index) => (
          <li key={index}>
            <div>
              <p>ID: {item.id_item}</p>
              <p>Nome: {item.nome}</p>
              <p>Quantidade: {item.qnt}</p>
            </div>
          </li>
        ))
      ) : (
        Object.entries(responseData.data).map(([key, value]) => (
          <li key={key}>
            <div>
              <p>{key}: {value}</p>
            </div>
          </li>
        ))
      )}
    </ul>
    {responseData.data.Total && <p>Total: {responseData.data.Total}</p>}
    {responseData.data.Endereço && <p>Endereço: {responseData.data.Endereço}</p>}
  </div>
)}
    </div>
  );
}

export default Inventory;
*/



